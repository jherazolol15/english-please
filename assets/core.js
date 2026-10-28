/* English, please · núcleo compartido.
   Todo lo que se escribe una sola vez y usan todas las unidades:
   configuración, audio, nota 0-5, historial, envío al docente, PDF, modo docente y el motor del examen. */
(function(){
"use strict";

/* ---------- CONFIGURACIÓN ----------
   RESULTS_URL: la URL de la aplicación web de Google Apps Script (termina en /exec).
   Si queda vacía, todo funciona igual, pero los resultados no se envían. */
const CONFIG = {
  SHEET_LINK: "https://docs.google.com/spreadsheets/d/1MYVQY8XVMuyjtjH3xS-CHkXSs8bpB-wO1gsxYJR8X5s/edit",
  RESULTS_URL: "https://script.google.com/macros/s/AKfycbwcSdlYViBO2Ji8KdG-VKU24tVb7HYowFkDNbdasGDuOM4KXVPl4KQGalIHCbi7Lg-YXQ/exec",
  TEACHER_FLAG: "englishplease.teacher",
  APP: "English, please",
  SCHOOL: "I.E. Liceo Guillermo Valencia",
  GROUPS: ["8-1","8-2","Otro"]
};

/* ---------- HELPERS ---------- */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const strip=s=>String(s).replace(/<[^>]+>/g,"");
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function toast(msg){const t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
const g1=x=>Number(x).toFixed(1);
function fmtDate(iso){try{return new Date(iso).toLocaleString("es-CO",{dateStyle:"short",timeStyle:"short"})}catch(e){return iso}}
const store={
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const PLAY_ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>';

/* ---------- AUDIO (Web Speech API) ---------- */
let voices=[];
function loadVoices(){try{voices=speechSynthesis.getVoices().filter(v=>/^en(-|_)/i.test(v.lang))}catch(e){voices=[]}}
try{loadVoices();speechSynthesis.onvoiceschanged=loadVoices}catch(e){}
function pickVoice(i){
  if(!voices.length)return null;
  const us=voices.filter(v=>/en.US/i.test(v.lang));
  const pool=us.length>1?us:voices;
  return pool[i%pool.length];
}
function utter(text,i,rate){
  const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate||.9;
  const v=pickVoice(i||0);if(v)u.voice=v;return u;
}
function speak(text,opts){
  try{speechSynthesis.cancel();speechSynthesis.speak(utter(strip(text),0,opts&&opts.rate))}
  catch(e){toast("Tu navegador no permite reproducir audio.")}
}
/* lines: ["A: Have you…?","B: Yes, I have."] → alterna dos voces si hay disponibles */
function speakLines(lines,opts){
  try{
    speechSynthesis.cancel();
    lines.forEach(l=>{const m=/^([AB]):\s*(.*)$/.exec(l);speechSynthesis.speak(utter(m?m[2]:l,m&&m[1]==="B"?1:0,opts&&opts.rate))});
  }catch(e){toast("Tu navegador no permite reproducir audio.")}
}
function bindSay(root){$$("[data-say]",root).forEach(b=>{if(b._b)return;b._b=1;b.addEventListener("click",()=>speak(b.dataset.say))})}
const sayBtn=t=>`<button class="say" type="button" data-say="${esc(strip(t))}" aria-label="Escuchar: ${esc(strip(t))}">${PLAY_ICON}</button>`;

/* ---------- NOTA (escala 0 a 5) ----------
   Escala de desempeño: cámbiala aquí y se actualiza en todo el sitio y en el PDF. */
function grade(correct,n){return Math.round((correct/n)*50)/10}
function level(g){return g>=4.6?"Superior":g>=4?"Alto":g>=3?"Básico":"Bajo"}
function levelCls(g){return g>=4?"hi":g>=3?"mid":"lo"}
const SCALE_TXT="Escala: Bajo 0.0-2.9 · Básico 3.0-3.9 · Alto 4.0-4.5 · Superior 4.6-5.0";

/* ---------- HISTORIAL Y ENVÍO ---------- */
const histKey=u=>`englishplease.${u.slug}.history.v1`;
const QKEY="englishplease.pending.v1";
function loadHist(u){return store.get(histKey(u),[])}
function saveHist(u,h){store.set(histKey(u),h)}
function payload(r,u){
  const missed=r.answers.map((a,i)=>a.ok?null:`${i+1}. ${a.type==="fix"?a.correct:a.q.replace(/[“”]/g,'"')} → respondió: ${a.chosen}`).filter(Boolean).join("\n");
  return {id:String(r.id),name:r.name,group:r.group,correct:r.correct,n:r.n,grade:r.grade,level:level(r.grade),date:r.date,missed,unit:u.title};
}
function postResult(p){return fetch(CONFIG.RESULTS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(p)})}
async function sendResult(r,u){
  if(!CONFIG.RESULTS_URL)return "off";
  const p=payload(r,u);
  try{await postResult(p);return "sent"}catch(e){const q=store.get(QKEY,[]);q.push(p);store.set(QKEY,q);return "queued"}
}
async function flushPending(){
  if(!CONFIG.RESULTS_URL)return;
  const q=store.get(QKEY,[]);if(!q.length)return;
  const left=[];for(const p of q){try{await postResult(p)}catch(e){left.push(p)}}
  store.set(QKEY,left);
}

/* ---------- PDF ---------- */
function pdfOrNull(){
  if(!window.jspdf){toast("No se pudo cargar el generador de PDF. Revisa tu conexión.");return null}
  return new window.jspdf.jsPDF({unit:"mm",format:"a4"});
}
function pdfHeader(d,title,subtitle){
  const W=210,M=16;
  d.setFillColor(22,56,74);d.rect(0,0,W,34,"F");
  d.setFillColor(233,118,43);d.rect(0,34,W,2.5,"F");
  d.setTextColor(255,255,255);d.setFont("helvetica","bold");d.setFontSize(22);d.text(title,M,17);
  d.setFont("helvetica","normal");d.setFontSize(10);d.text(subtitle,M,25);
}
function pdfFooter(d,u){
  const W=210,M=16,pages=d.getNumberOfPages();
  for(let p=1;p<=pages;p++){d.setPage(p);d.setFontSize(8);d.setTextColor(140,150,160);d.text(`${CONFIG.APP} · ${u.title} · ${CONFIG.SCHOOL}`,M,290);d.text(`${p}/${pages}`,W-M,290,{align:"right"})}
}
function savePDF(d,file){try{d.save(file);toast("PDF descargado")}catch(e){toast("La descarga no está disponible en esta vista.")}}
const fileSafe=s=>String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^\w-]+/g,"_");

function makeReportPDF(r,u){
  if(!r)return;const d=pdfOrNull();if(!d)return;
  const W=210,M=16;let y;
  pdfHeader(d,CONFIG.APP,`Informe del examen final · ${u.title} · Inglés 8.º`);
  y=48;d.setTextColor(20,35,44);d.setFontSize(11);
  [["Estudiante",r.name],["Curso",r.group],["Unidad",u.title],["Aciertos",`${r.correct} de ${r.n}`],["Fecha",fmtDate(r.date)]].forEach(([k,v])=>{d.setFont("helvetica","bold");d.text(k+":",M,y);d.setFont("helvetica","normal");d.text(String(v),M+28,y);y+=7});
  const bx=W-M-58,by=42;
  d.setDrawColor(22,56,74);d.setLineWidth(.6);d.roundedRect(bx,by,58,32,2,2);
  d.setFontSize(8);d.setTextColor(85,101,111);d.text("NOTA (ESCALA 0 A 5)",bx+29,by+7,{align:"center"});
  d.setFont("helvetica","bold");d.setFontSize(26);d.setTextColor(20,35,44);d.text(g1(r.grade),bx+29,by+20,{align:"center"});
  d.setFontSize(10);d.text("Desempeño "+level(r.grade),bx+29,by+27,{align:"center"});
  y=Math.max(y,by+32)+6;
  d.setFont("helvetica","normal");d.setFontSize(8);d.setTextColor(85,101,111);d.text(SCALE_TXT,M,y);y+=5;
  d.setDrawColor(211,221,223);d.setLineWidth(.3);d.line(M,y,W-M,y);y+=8;
  d.setFont("helvetica","bold");d.setFontSize(12);d.setTextColor(20,35,44);d.text("Detalle de respuestas",M,y);y+=8;
  r.answers.forEach((a,i)=>{
    if(y>268){d.addPage();y=20}
    d.setFontSize(10);d.setFont("helvetica","bold");
    if(a.ok)d.setTextColor(31,122,77);else d.setTextColor(194,59,46);
    d.text(a.ok?"OK":"X",M,y);d.setTextColor(20,35,44);
    const q=d.splitTextToSize(`${i+1}. ${a.q.replace(/[“”]/g,'"')}`,W-2*M-10);d.text(q,M+10,y);y+=q.length*5;
    d.setFont("helvetica","normal");d.setTextColor(85,101,111);
    const line=a.ok?`Tu respuesta: ${a.chosen}`:`Tu respuesta: ${a.chosen}   ·   Correcta: ${a.correct}`;
    const l2=d.splitTextToSize(line,W-2*M-10);d.text(l2,M+10,y);y+=l2.length*5+4;
  });
  pdfFooter(d,u);
  savePDF(d,`EnglishPlease_${fileSafe(u.slug)}_${fileSafe(r.name)}_${r.group}.pdf`);
}
/* PDF de un texto escrito por el estudiante (actividad de writing) */
function makeTextPDF(o,u){
  const d=pdfOrNull();if(!d)return;
  const W=210,M=16;let y;
  pdfHeader(d,CONFIG.APP,`Writing · ${o.title} · ${u.title}`);
  y=48;d.setTextColor(20,35,44);d.setFontSize(11);
  [["Estudiante",o.name||"—"],["Curso",o.group||"—"],["Fecha",fmtDate(new Date().toISOString())]].forEach(([k,v])=>{d.setFont("helvetica","bold");d.text(k+":",M,y);d.setFont("helvetica","normal");d.text(String(v),M+28,y);y+=7});
  y+=4;d.setFont("helvetica","bold");d.setFontSize(14);d.text(o.title,M,y);y+=9;
  d.setFont("helvetica","normal");d.setFontSize(12);
  String(o.text).split(/\n+/).forEach(par=>{const ls=d.splitTextToSize(par,W-2*M);ls.forEach(l=>{if(y>275){d.addPage();y=20}d.text(l,M,y);y+=6.5});y+=3});
  if(o.checks&&o.checks.length){
    if(y>250){d.addPage();y=20}
    y+=4;d.setFont("helvetica","bold");d.setFontSize(11);d.text("Lista de chequeo",M,y);y+=7;d.setFont("helvetica","normal");d.setFontSize(10);
    o.checks.forEach(c=>{d.setTextColor(c.on?31:194,c.on?122:59,c.on?77:46);d.text(c.on?"OK":"--",M,y);d.setTextColor(20,35,44);d.text(c.label,M+10,y);y+=6});
  }
  pdfFooter(d,u);
  savePDF(d,`EnglishPlease_Writing_${fileSafe(o.name||"estudiante")}.pdf`);
}

/* ---------- MODO DOCENTE ----------
   Se activa con ?docente=CLAVE (script del <head> de cada página). */
function isTeacher(){return document.documentElement.classList.contains("teacher")}
function teacherBar(){
  if(!isTeacher())return;
  const bar=document.createElement("div");bar.className="tbar";
  bar.innerHTML=`<div class="wrap"><span class="tbadge">Modo docente</span>
    <a href="${CONFIG.SHEET_LINK}" target="_blank" rel="noopener">Abrir hoja de resultados ↗</a>
    <button type="button" class="linkbtn" id="t-exit">Salir del modo docente</button></div>`;
  $("header.top").after(bar);
  $("#t-exit").onclick=()=>{
    try{localStorage.removeItem(CONFIG.TEACHER_FLAG)}catch(e){}
    document.documentElement.classList.remove("teacher");
    document.documentElement.setAttribute("data-theme","dark");
    bar.remove();toast("Modo docente desactivado en este navegador");
  };
}

/* ---------- MOTOR DEL EXAMEN ----------
   Banco de preguntas: {t:tipo, q, tr?, ctx?, o:[opciones], a:índice correcto, why}
   mix: cuántas preguntas de cada tipo recibe cada estudiante. */
const ICON={
  first:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M18 6l-7 6 7 6"/></svg>',
  prev:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  last:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M6 6l7 6-7 6"/></svg>',
  flag:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4M5 4h12l-2.5 4 2.5 4H5"/></svg>'
};
function mountExam(o){
  const u=o.unit, ex=u.exam, stage=o.stage;
  let hist=loadHist(u), G=null;
  const total=Object.values(ex.mix).reduce((a,b)=>a+b,0);

  function renderSetup(){
    const last=hist[0]||{};
    stage.innerHTML=`
      <span class="qtype">Examen final · ${esc(u.title)}</span>
      <h3>¿List@ para demostrar lo que sabes?</h3>
      <p class="note">Escribe tus datos para identificar tu informe en PDF.</p>
      <form class="setup" novalidate>
        <label>Nombre y apellido *<input name="name" autocomplete="name" required value="${esc(last.name||store.get("englishplease.name",""))}" placeholder="Ej.: Valentina Pérez"></label>
        <label>Curso<select name="group">${CONFIG.GROUPS.map(g=>`<option ${(last.group||store.get("englishplease.group",""))===g?"selected":""}>${g}</option>`).join("")}</select></label>
        <p class="note err-msg" role="alert" hidden>Escribe tu nombre para comenzar.</p>
        <button class="btn btn-primary" type="submit">Empezar el examen →</button>
        <p class="note">${CONFIG.RESULTS_URL?"Al terminar, tu nombre, curso y nota se envían a tu docente.":"Tus datos quedan guardados únicamente en este navegador."}</p>
      </form>`;
    $("form",stage).addEventListener("submit",e=>{
      e.preventDefault();
      const name=e.target.name.value.trim(), group=e.target.group.value;
      if(!name){$(".err-msg",stage).hidden=false;e.target.name.focus();return}
      store.set("englishplease.name",name);store.set("englishplease.group",group);
      start(name,group);
    });
  }
  function start(name,group){
    let qs=[];
    Object.entries(ex.mix).forEach(([t,k])=>{qs=qs.concat(shuffle(ex.bank.filter(q=>q.t===t)).slice(0,k))});
    qs=shuffle(qs).map(q=>{const ord=shuffle(q.o.map((_,i)=>i));return Object.assign({},q,{o:ord.map(i=>q.o[i]),a:ord.indexOf(q.a)})});
    G={name,group,qs,i:0,ans:new Array(qs.length).fill(null)};
    renderQ();
  }
  const answered=()=>G.ans.filter(Boolean).length;
  function go(j){if(!G||j<0||j>=G.qs.length||j===G.i)return;G.i=j;renderQ();try{stage.scrollIntoView({block:"nearest"})}catch(e){}}
  function renderQ(){
    const q=G.qs[G.i],n=G.qs.length,a=G.ans[G.i],done=answered();
    const text=esc(q.q).replace("___",'<span class="gap">___</span>');
    const first=G.i===0,last=G.i===n-1;
    stage.innerHTML=`
      <div class="game">
        <div class="hud"><span>PREGUNTA ${G.i+1} / ${n}</span><span>${esc(G.name)}</span><span>${done}/${n} RESPONDIDAS</span></div>
        <div class="progress" aria-hidden="true"><i style="width:${(done/n)*100}%"></i></div>
        <span class="qtype">${esc(ex.types[q.t]||"")}</span>
        <div><p class="qtext" id="qtext">${text}</p>${q.tr?`<p class="qtr">(${esc(q.tr)})</p>`:""}</div>
        ${q.ctx?`<p class="note">${esc(q.ctx)}</p>`:""}
        <div class="opts" role="group" aria-labelledby="qtext">${q.o.map((op,k)=>{const sel=a&&op===a.chosen;
          return `<button class="opt${sel?" sel":""}" type="button" data-k="${k}" aria-pressed="${!!sel}"><kbd>${k+1}</kbd><span>${esc(op)}</span></button>`}).join("")}</div>
        <p class="note" aria-live="polite">${a?"Respuesta guardada. Puedes cambiarla antes de finalizar.":"Elige una opción. Verás si acertaste al finalizar."}</p>
        <nav class="qnav" aria-label="Moverse entre preguntas">
          <div class="qnav-arrows">
            <button class="nav-q" type="button" data-go="first" aria-label="Primera pregunta" ${first?"disabled":""}>${ICON.first}</button>
            <button class="nav-q wide" type="button" data-go="prev" aria-label="Pregunta anterior" ${first?"disabled":""}>${ICON.prev}<span>Anterior</span></button>
            <button class="nav-q wide" type="button" data-go="next" aria-label="Pregunta siguiente" ${last?"disabled":""}><span>Siguiente</span>${ICON.next}</button>
            <button class="nav-q" type="button" data-go="last" aria-label="Última pregunta" ${last?"disabled":""}>${ICON.last}</button>
          </div>
          <div class="dots">${G.qs.map((_,j)=>`<button class="dot-q${G.ans[j]?" ans":""}${j===G.i?" cur":""}" type="button" data-j="${j}" aria-label="Pregunta ${j+1}${G.ans[j]?", respondida":", sin responder"}" ${j===G.i?'aria-current="step"':""}>${j+1}</button>`).join("")}</div>
          <div class="qlegend"><span><i class="lg ans"></i>Respondida</span><span><i class="lg"></i>Sin responder</span></div>
          <button class="btn ${done===n?"btn-primary":"btn-dark"} finish-btn" type="button" data-finish>${ICON.flag}${done===n?"Entregar y ver mi nota":"Finalizar examen"}</button>
          <div class="confirm-end" hidden></div>
        </nav>
      </div>`;
    $$(".opt",stage).forEach(b=>b.onclick=()=>answer(+b.dataset.k));
    const tgt={first:0,prev:G.i-1,next:G.i+1,last:n-1};
    $$(".nav-q",stage).forEach(b=>b.onclick=()=>go(tgt[b.dataset.go]));
    $$(".dot-q",stage).forEach(b=>b.onclick=()=>go(+b.dataset.j));
    $("[data-finish]",stage).onclick=askFinish;
  }
  function answer(k){
    const q=G.qs[G.i];
    G.ans[G.i]={q:q.q,type:q.t,chosen:q.o[k],correct:q.o[q.a],ok:k===q.a,why:q.why};
    renderQ();
    const nb=$('[data-go="next"]',stage);
    (answered()===G.qs.length||!nb||nb.disabled?$("[data-finish]",stage):nb).focus({preventScroll:true});
  }
  function askFinish(){
    const left=G.qs.length-answered();
    if(!left){finish();return}
    const c=$(".confirm-end",stage);c.hidden=false;
    c.innerHTML=`<p>Te ${left===1?"falta 1 pregunta":"faltan "+left+" preguntas"} por responder. Si finalizas ahora, cuentan como incorrectas.</p>
      <div class="cta"><button class="btn btn-primary" type="button" data-no>Seguir respondiendo</button><button class="btn btn-ghost" type="button" data-yes>Finalizar de todas formas</button></div>`;
    $("[data-yes]",c).onclick=finish;
    $("[data-no]",c).onclick=()=>{c.hidden=true;const j=G.ans.findIndex(x=>!x);if(j===G.i)$(".opt",stage).focus();else go(j)};
    $("[data-no]",c).focus({preventScroll:true});
  }
  function finish(){
    const n=G.qs.length;
    const answers=G.qs.map((q,j)=>G.ans[j]||{q:q.q,type:q.t,chosen:"(sin responder)",correct:q.o[q.a],ok:false,why:q.why});
    const correct=answers.filter(x=>x.ok).length,gr=grade(correct,n);
    const rec={id:Date.now(),name:G.name,group:G.group,correct,n,grade:gr,date:new Date().toISOString(),answers};
    hist.unshift(rec);saveHist(u,hist);if(o.onSaved)o.onSaved();
    const msg=gr>=4.6?ex.msg[0]:gr>=3?ex.msg[1]:ex.msg[2];
    stage.innerHTML=`
      <div class="end">
        <span class="qtype">Examen terminado</span>
        <div class="big">${g1(gr)}<small> / 5.0</small></div>
        <p><span class="pill ${levelCls(gr)}">Desempeño ${level(gr)}</span> &nbsp;${correct} de ${n} aciertos</p>
        <p>${esc(msg)}</p>
        <p class="send" hidden></p>
        <div class="cta" style="margin-top:4px">
          <button class="btn btn-primary" type="button" data-pdf>Descargar informe PDF</button>
          <button class="btn btn-ghost" type="button" data-again>Presentar otra vez</button>
        </div>
        <section class="review" aria-label="Revisión de respuestas">
          <h3>Revisa tus respuestas</h3>
          <ol>${answers.map((x,j)=>`<li class="${x.ok?"r-ok":"r-no"}">
            <span class="r-n">${j+1} · ${x.ok?"Correcta":"Incorrecta"}</span>
            <p class="r-q">${esc(x.q.replace(/[“”]/g,'"'))}</p>
            <p>Tu respuesta: <b>${esc(x.chosen)}</b></p>
            ${x.ok?"":`<p>Respuesta correcta: <b>${esc(x.correct)}</b></p>`}
            <p class="note">${esc(x.why||"")}</p></li>`).join("")}</ol>
        </section>
      </div>`;
    $("[data-pdf]",stage).onclick=()=>makeReportPDF(rec,u);
    $("[data-again]",stage).onclick=renderSetup;
    G=null;
    if(CONFIG.RESULTS_URL){
      const st=$(".send",stage);st.hidden=false;st.textContent="Enviando tu resultado a tu docente…";
      sendResult(rec,u).then(s=>{st.textContent=s==="sent"?"✓ Tu resultado se envió a tu docente.":"Sin conexión. Tu resultado se enviará solo cuando vuelvas a abrir la página con internet. Por si acaso, descarga tu PDF."});
    }
    try{stage.scrollIntoView({block:"start"})}catch(e){}
  }
  document.addEventListener("keydown",e=>{
    if(!G||!$(".game",stage)||e.target.matches("input,select,textarea"))return;
    const k=parseInt(e.key,10);
    if(k>=1&&k<=4){const b=$$(".opt",stage)[k-1];if(b)b.click();return}
    if(!(e.target===document.body||stage.contains(e.target)))return;
    const map={ArrowLeft:G.i-1,ArrowRight:G.i+1,Home:0,End:G.qs.length-1};
    if(e.key in map){e.preventDefault();go(map[e.key])}
  });
  renderSetup();
  return {total,reload(){hist=loadHist(u)}};
}

/* ---------- HISTORIAL EN PANTALLA ---------- */
function mountHistory(o){
  const u=o.unit;
  function render(){
    const h=loadHist(u),tb=o.tbody;
    o.count.textContent=h.length?`${h.length} examen${h.length>1?"es":""} guardado${h.length>1?"s":""} en este dispositivo`:"";
    o.clear.hidden=!h.length;
    if(!h.length){tb.innerHTML=`<tr><td colspan="6" class="empty">Todavía no hay exámenes. Cuando termines el examen final aparecerá aquí.</td></tr>`;return}
    tb.innerHTML=h.map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.group)}</td><td class="num">${r.correct}/${r.n}</td><td class="num"><span class="pill ${levelCls(r.grade)}">${g1(r.grade)} · ${level(r.grade)}</span></td><td class="num">${fmtDate(r.date)}</td><td><button class="linkbtn" type="button" data-id="${r.id}">PDF</button></td></tr>`).join("");
    $$("button[data-id]",tb).forEach(b=>b.onclick=()=>makeReportPDF(h.find(r=>String(r.id)===b.dataset.id),u));
  }
  function bindClear(){
    o.clear.innerHTML=`<button class="linkbtn" type="button">Borrar historial</button>`;
    $("button",o.clear).onclick=()=>{
      o.clear.innerHTML=`<span>¿Borrar todos los exámenes guardados? <button class="linkbtn" type="button" data-y style="color:var(--bad)">Sí, borrar</button> · <button class="linkbtn" type="button" data-n>Cancelar</button></span>`;
      $("[data-y]",o.clear).onclick=()=>{saveHist(u,[]);bindClear();render();toast("Historial borrado")};
      $("[data-n]",o.clear).onclick=bindClear;
    };
  }
  bindClear();render();
  return {render};
}

window.EP={CONFIG,$,$$,esc,strip,shuffle,toast,g1,fmtDate,store,speak,speakLines,bindSay,sayBtn,PLAY_ICON,
  grade,level,levelCls,SCALE_TXT,sendResult,flushPending,makeReportPDF,makeTextPDF,isTeacher,teacherBar,mountExam,mountHistory};

document.addEventListener("DOMContentLoaded",()=>{teacherBar();flushPending();window.addEventListener("online",flushPending)});
})();
