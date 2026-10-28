/* English, please · arma una página de unidad a partir de window.UNIT (archivo data.js de cada carpeta).
   Secciones: portada de la unidad · ruta · aprender · verbos y palabras · practicar (4 habilidades) ·
   examen final · resultados · ficha del docente. */
(function(){
"use strict";
const U=window.UNIT, EP=window.EP;
const {$,$$,esc,strip,shuffle,toast,sayBtn,bindSay,speak,speakLines,store}=EP;
const main=$("#main");
const exLine=(e)=>`<p class="ex">${sayBtn(e[0])}<span>${e[0]}${e[1]?`<span class="tr">${esc(e[1])}</span>`:""}</span></p>`;

/* ---------- HERO + RUTA ---------- */
function hero(){
  return `<section class="hero" id="inicio"><div class="wrap">
    <div>
      <span class="tag">${esc(U.tag)}</span>
      <h1>${U.heading}</h1>
      <p class="lead">${esc(U.lead)}</p>
      <div class="cta"><a class="btn btn-primary" href="#aprender">Empezar →</a><a class="btn btn-ghost" href="#examen">Ir al examen final</a></div>
      <div class="facts">${U.facts.map(f=>`<span>✓ ${esc(f)}</span>`).join("")}</div>
    </div>
    <div class="stamps" aria-hidden="true">${U.stamps.map(s=>`<div class="stamp ${s[3]}">${esc(s[0])}<b>${esc(s[1])}</b>${esc(s[2])}</div>`).join("")}</div>
  </div></section>
  <section class="block" aria-labelledby="ruta-t"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Unidad ${U.number} · ${esc(U.theme)}</span><h2 id="ruta-t">${esc(U.question)}</h2><p>${esc(U.routeIntro)}</p></div>
    <nav class="route" aria-label="Ruta de la unidad">
      <a href="#aprender"><i>1</i><b>Aprende</b><span>Explicación con ejemplos y audio.</span></a>
      <a href="#verbos"><i>2</i><b>Verbos y palabras</b><span>Lista para consultar y repasar.</span></a>
      <a href="#practicar"><i>3</i><b>Practica</b><span>Reading, listening, writing y speaking.</span></a>
      <a href="#examen"><i>4</i><b>Demuestra</b><span>Examen final con nota de 0 a 5 y PDF.</span></a>
    </nav>
  </div></section>`;
}

/* ---------- APRENDER ---------- */
function timelineSVG(t){
  const qs=[150,280,410,540].map(x=>`<text class="tl-q" x="${x}" y="70" text-anchor="middle">?</text>`).join("");
  return `<svg class="timeline" viewBox="0 0 760 140" role="img" aria-label="${esc(t.caption)}">
    <text class="tl-cap" x="380" y="24" text-anchor="middle">${esc(t.caption)}</text>
    <line class="tl-line" x1="40" y1="92" x2="700" y2="92"/>
    <path d="M700 84 L716 92 L700 100 Z" fill="currentColor" style="fill:var(--fg)"/>
    ${qs}
    <circle class="tl-dot" cx="680" cy="92" r="12"/>
    <text class="tl-lbl" x="40" y="124">${esc(t.left)}</text>
    <text class="tl-now" x="680" y="124" text-anchor="middle">${esc(t.right)}</text>
  </svg>`;
}
const BLOCK={
  uses:b=>`${timelineSVG(b.timeline)}<div class="uses">${b.items.map(it=>`<div class="use"><h4>${esc(it.h)}</h4><p>${esc(it.p)}</p>${it.ex.map(exLine).join("")}</div>`).join("")}</div>`,
  formulas:b=>`<div class="formulas">${b.items.map(f=>`<div class="formula"><span class="eyebrow">${esc(f.eyebrow)}</span><h4>${esc(f.h)}</h4>
      <div class="eq">${f.eq.map(t=>t==="+"?`<span class="op">+</span>`:`<span class="${t[0]==="*"?"k":""}">${esc(t.replace(/^\*/,""))}</span>`).join("")}</div>
      <div class="exs">${f.ex.map(exLine).join("")}</div>${f.note?`<p class="tr">${esc(f.note)}</p>`:""}</div>`).join("")}</div>
    ${b.subjects?`<div class="subjects">${b.subjects.map(s=>`<div class="subj ${s.cls}"><small>${esc(s.small)}</small><b>${esc(s.big)}</b><span>${esc(s.ex)}</span></div>`).join("")}</div>`:""}`,
  words:b=>`<div class="words">${b.items.map(w=>`<div class="word"><h4>${esc(w.w)} <small>${esc(w.es)}</small></h4><p class="where">${w.where}</p>${w.ex.map(exLine).join("")}</div>`).join("")}</div>`,
  contrast:b=>`<div class="versus">${b.cols.map(c=>`<div class="vcol ${c.cls}"><h4>${esc(c.h)}</h4><p class="clue">${esc(c.clue)}</p>${c.ex.map(exLine).join("")}</div>`).join("")}</div>
    ${b.dialogue?`<div class="dialogue"><span class="eyebrow" style="color:var(--sun)">Así se combinan en una conversación</span>${b.dialogue.map(l=>{const m=/^([AB]):\s*(.*)$/.exec(l);return `<p>${sayBtn(m[2])}<span class="who">${m[1]}</span><span>${m[2]}</span></p>`}).join("")}</div>`:""}`,
  errors:b=>`<div class="errors">${b.items.map(e=>`<div class="err"><div class="no">${esc(e[0])}</div><div class="yes">${esc(e[1])}</div><div class="why">${esc(e[2])}</div></div>`).join("")}</div>`
};
function learn(){
  return `<section class="block alt" id="aprender" aria-labelledby="ap-t"><div class="wrap">
    <div class="sec-head"><span class="step-label"><i>1</i>Learn</span><h2 id="ap-t">${esc(U.learnTitle)}</h2><p>Toca ▶ para escuchar cada ejemplo en inglés. Debajo está la traducción.</p></div>
    ${U.grammar.map(b=>`<h3 class="sub">${esc(b.title)}</h3>${b.intro?`<p class="muted" style="margin:-6px 0 16px;max-width:70ch">${b.intro}</p>`:""}${BLOCK[b.type](b)}`).join("")}
  </div></section>`;
}

/* ---------- VERBOS Y PALABRAS ---------- */
function vocab(){
  const v=U.vocab;
  return `<section class="block" id="verbos" aria-labelledby="vb-t"><div class="wrap">
    <div class="sec-head"><span class="step-label"><i>2</i>Words</span><h2 id="vb-t">${esc(v.title)}</h2><p>${esc(v.intro)}</p></div>
    <div class="vtools">
      <div role="group" aria-label="Filtrar verbos" id="vfilter">
        <button class="chip" type="button" data-f="all" aria-pressed="true">Todos (${v.verbs.length})</button>
        <button class="chip" type="button" data-f="irr" aria-pressed="false">Irregulares</button>
        <button class="chip" type="button" data-f="reg" aria-pressed="false">Regulares</button>
      </div>
      <input type="search" id="vsearch" placeholder="Buscar: see, comer…" aria-label="Buscar verbo">
      <label class="switch"><input type="checkbox" id="vquiz"> Modo repaso: ocultar el participio</label>
    </div>
    <div class="table-wrap"><table class="vt"><thead><tr><th scope="col">Verbo base</th><th scope="col">Pasado simple</th><th scope="col">Participio</th><th scope="col">Significado</th><th scope="col"><span class="eyebrow" style="font-size:11px">Audio</span></th></tr></thead><tbody id="vbody"></tbody></table></div>
    <p class="note" id="vcount" style="margin-top:8px"></p>
    <h3 class="sub">${esc(v.keywords.title)}</h3>
    <div class="kw">${v.keywords.items.map(k=>`<div>${sayBtn(k.ex)}<span><b>${esc(k.w)}</b> <span class="muted">· ${esc(k.es)}</span><span class="tr">${esc(k.ex)}</span></span></div>`).join("")}</div>
    <h3 class="sub">${esc(v.phrases.title)}</h3>
    <div class="kw">${v.phrases.items.map(p=>`<div>${sayBtn(p[0])}<span><b style="font-size:17px">${esc(p[0])}</b><span class="tr">${esc(p[1])}</span></span></div>`).join("")}</div>
  </div></section>`;
}
function bindVocab(){
  let f="all",q="",quiz=false;
  const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  function render(){
    const list=U.vocab.verbs.filter(x=>(f==="all"||(f==="reg")===!!x.reg)&&(!q||norm([x.b,x.p,x.pp,x.es].join(" ")).includes(q)));
    $("#vbody").innerHTML=list.length?list.map(x=>`<tr><td><b>${esc(x.b)}</b></td><td>${esc(x.p)}</td><td class="pp">${quiz?`<button class="reveal" type="button" data-pp="${esc(x.pp)}">¿…?</button>`:esc(x.pp)}</td><td class="es">${esc(x.es)}</td><td>${sayBtn(`${x.b}, ${x.p.replace(" / "," or ")}, ${x.pp.replace(" / "," or ")}`)}</td></tr>`).join("")
      :`<tr><td colspan="5" class="empty">No encontramos ese verbo. Prueba con otra palabra.</td></tr>`;
    $("#vcount").textContent=`${list.length} verbo${list.length===1?"":"s"}${quiz?" · toca ¿…? para ver el participio":""}`;
    bindSay($("#vbody"));
    $$(".reveal").forEach(b=>b.onclick=()=>{b.replaceWith(document.createTextNode(b.dataset.pp))});
  }
  $$("#vfilter .chip").forEach(b=>b.onclick=()=>{f=b.dataset.f;$$("#vfilter .chip").forEach(c=>c.setAttribute("aria-pressed",c===b));render()});
  $("#vsearch").addEventListener("input",e=>{q=norm(e.target.value.trim());render()});
  $("#vquiz").addEventListener("change",e=>{quiz=e.target.checked;render()});
  render();
}

/* ---------- PRACTICAR ---------- */
const TABS=[["reading","Reading","Leer"],["listening","Listening","Escuchar"],["writing","Writing","Escribir"],["speaking","Speaking","Hablar"]];
function practice(){
  return `<section class="block alt" id="practicar" aria-labelledby="pr-t"><div class="wrap">
    <div class="sec-head"><span class="step-label"><i>3</i>Practice</span><h2 id="pr-t">Practica con las cuatro habilidades</h2><p>Aquí no hay nota: puedes equivocarte, ver la respuesta y volver a intentarlo.</p></div>
    <div class="tabs" role="tablist" aria-label="Habilidades">${TABS.map((t,i)=>`<button class="tab" role="tab" type="button" id="tab-${t[0]}" aria-controls="pn-${t[0]}" aria-selected="${i===0}">${t[1]} <small>${t[2]}</small></button>`).join("")}</div>
    ${TABS.map((t,i)=>`<div role="tabpanel" id="pn-${t[0]}" aria-labelledby="tab-${t[0]}" ${i?"hidden":""}></div>`).join("")}
  </div></section>`;
}
function bindTabs(){
  $$(".tab").forEach(b=>b.onclick=()=>{
    $$(".tab").forEach(x=>x.setAttribute("aria-selected",x===b));
    TABS.forEach(t=>$("#pn-"+t[0]).hidden=("tab-"+t[0])!==b.id);
    try{speechSynthesis.cancel()}catch(e){}
  });
}
/* preguntas de opción múltiple con retroalimentación inmediata */
function mcItems(container,items,opts){
  let right=0,done=0;
  const sb=$(".scorebar",container.parentElement)||null;
  container.innerHTML=items.map((it,i)=>{
    const ord=shuffle(it.o.map((_,k)=>k));
    return `<div class="item" data-i="${i}" data-a="${ord.indexOf(it.a)}">
      ${opts&&opts.head?opts.head(it,i):""}
      <p class="q">${i+1}. ${esc(it.q)}</p>
      <div class="choices">${ord.map((k,j)=>`<button class="choice" type="button" data-j="${j}">${esc(it.o[k])}</button>`).join("")}</div>
      <p class="fb" hidden></p>${opts&&opts.after?opts.after(it,i):""}</div>`}).join("");
  const upd=()=>{if(sb)sb.querySelector("[data-score]").textContent=`${right} de ${done} correctas · ${items.length-done} por responder`};
  upd();
  $$(".item",container).forEach(el=>{
    const it=items[+el.dataset.i],a=+el.dataset.a;
    $$(".choice",el).forEach(b=>b.onclick=()=>{
      const ok=+b.dataset.j===a;done++;if(ok)right++;
      $$(".choice",el).forEach((c,j)=>{c.disabled=true;if(j===a)c.classList.add("right");else if(c===b)c.classList.add("wrong")});
      const fb=$(".fb",el);fb.hidden=false;fb.className="fb "+(ok?"good":"bad");fb.innerHTML=`<b>${ok?"¡Correcto!":"No es esa."}</b> ${esc(it.why||"")}`;
      const tr=$(".transcript",el);if(tr)tr.hidden=false;
      upd();
    });
  });
  return {reset(){mcItems(container,items,opts)}};
}
function readingPanel(){
  const r=U.practice.reading,p=$("#pn-reading");
  p.innerHTML=`<div class="pgrid">
    <article class="panel"><span class="eyebrow">Lee el texto</span><h3>${esc(r.title)}</h3>
      <div class="cta" style="margin:8px 0 14px"><button class="btn btn-ghost btn-sm" type="button" id="read-aloud">${EP.PLAY_ICON.replace('<svg','<svg width="16" height="16" fill="currentColor"')} Escuchar el texto</button><label class="switch"><input type="checkbox" id="mark-pp"> Resaltar el Present Perfect</label></div>
      <div class="reading" id="reading-text">${r.text.map(t=>`<p>${t}</p>`).join("")}</div>
      <p class="note" style="margin-top:12px">${esc(r.glossary)}</p></article>
    <div class="panel"><div class="scorebar"><span>Responde según el texto</span><span data-score></span></div><div class="items" id="read-q"></div>
      <button class="btn btn-ghost btn-sm" type="button" id="read-reset" style="margin-top:14px">Intentar de nuevo</button></div>
  </div>`;
  const setMark=on=>$$("#reading-text mark").forEach(m=>m.style.borderBottomColor=on?"":"transparent");
  setMark(false);
  $("#mark-pp").onchange=e=>setMark(e.target.checked);
  $("#read-aloud").onclick=()=>speak(r.text.map(strip).join(" "),{rate:.85});
  const ctl=mcItems($("#read-q"),r.questions);
  $("#read-reset").onclick=()=>ctl.reset();
}
function listeningPanel(){
  const L=U.practice.listening,p=$("#pn-listening");
  p.innerHTML=`<div class="panel"><div class="scorebar"><span>Escucha y responde · puedes repetir el audio</span><span data-score></span></div>
    <p class="note" style="margin-bottom:14px">${esc(L.intro)}</p>
    <div class="items" id="lis-q"></div>
    <button class="btn btn-ghost btn-sm" type="button" id="lis-reset" style="margin-top:14px">Intentar de nuevo</button></div>`;
  const ctl=mcItems($("#lis-q"),L.items,{
    head:(it,i)=>`<div class="cta" style="margin:0"><button class="btn btn-dark btn-sm listen-btn" type="button" data-play="${i}">${EP.PLAY_ICON.replace('<svg','<svg width="16" height="16" fill="currentColor"')} Escuchar audio ${i+1}</button><button class="btn btn-ghost btn-sm" type="button" data-slow="${i}">Más despacio</button></div>`,
    after:it=>`<p class="transcript" hidden>${it.lines.map(esc).join("<br>")}</p>`
  });
  const bindPlay=()=>{
    $$("[data-play]",p).forEach(b=>b.onclick=()=>speakLines(L.items[+b.dataset.play].lines));
    $$("[data-slow]",p).forEach(b=>b.onclick=()=>speakLines(L.items[+b.dataset.slow].lines,{rate:.7}));
  };
  bindPlay();
  $("#lis-reset").onclick=()=>{ctl.reset();bindPlay()};
}
function writingPanel(){
  const W=U.practice.writing,O=U.practice.order,p=$("#pn-writing");
  p.innerHTML=`<div class="pgrid">
    <div class="panel"><span class="eyebrow">Parte 1 · Ordena las palabras</span><h3>Sentence builder</h3>
      <p class="note">Toca las palabras en orden para armar la oración. Toca una palabra de la oración para devolverla.</p>
      <div class="builder" style="margin-top:14px">
        <div class="scorebar" style="margin:0"><span id="ord-n"></span><span id="ord-score"></span></div>
        <div class="slot" id="ord-slot" aria-live="polite"></div>
        <div class="bank" id="ord-bank"></div>
        <p class="fb" id="ord-fb" hidden></p>
        <div class="cta" style="margin-top:4px">
          <button class="btn btn-primary btn-sm" type="button" id="ord-check">Comprobar</button>
          <button class="btn btn-ghost btn-sm" type="button" id="ord-clear">Reiniciar</button>
          <button class="btn btn-ghost btn-sm" type="button" id="ord-next">Siguiente →</button>
        </div>
      </div>
    </div>
    <div class="panel"><span class="eyebrow">Parte 2 · Escribe tu texto</span><h3>${esc(W.title)}</h3>
      <p class="note">${esc(W.prompt)}</p>
      <div class="frames" style="margin:12px 0">${W.frames.map(f=>`<code>${esc(f)}</code>`).join("")}</div>
      <textarea id="wr-text" aria-label="Tu texto" placeholder="${esc(W.placeholder)}"></textarea>
      <p class="note" id="wr-count" style="margin:6px 0 12px"></p>
      <ul class="checklist" id="wr-checks"></ul>
      <div class="cta">
        <button class="btn btn-primary btn-sm" type="button" id="wr-pdf">Descargar mi texto en PDF</button>
        <button class="btn btn-ghost btn-sm" type="button" id="wr-copy">Copiar texto</button>
      </div>
      <p class="note" style="margin-top:10px">Tu texto se guarda solo en este dispositivo mientras escribes.</p>
    </div>
  </div>`;
  /* parte 1 */
  let i=0,ok=0,tried=new Set(),built=[],pool=[];
  function load(){
    const words=O.items[i].split(" ");
    built=[];pool=shuffle(words.map((w,k)=>({w,k})));
    if(pool.map(x=>x.w).join(" ")===O.items[i]&&words.length>2)pool.reverse();
    $("#ord-fb").hidden=true;$("#ord-slot").className="slot";draw();
    $("#ord-n").textContent=`Oración ${i+1} de ${O.items.length}`;
  }
  function draw(){
    $("#ord-slot").innerHTML=built.length?built.map((x,j)=>`<button class="wchip" type="button" data-b="${j}">${esc(x.w)}</button>`).join(""):`<span class="note">Tu oración aparece aquí…</span>`;
    $("#ord-bank").innerHTML=pool.map((x,j)=>`<button class="wchip" type="button" data-p="${j}">${esc(x.w)}</button>`).join("");
    $$("#ord-bank .wchip").forEach(b=>b.onclick=()=>{built.push(pool.splice(+b.dataset.p,1)[0]);$("#ord-slot").className="slot";draw()});
    $$("#ord-slot .wchip").forEach(b=>b.onclick=()=>{pool.push(built.splice(+b.dataset.b,1)[0]);$("#ord-slot").className="slot";draw()});
    $("#ord-score").textContent=`${ok} correctas`;
  }
  $("#ord-check").onclick=()=>{
    const fb=$("#ord-fb");fb.hidden=false;
    if(pool.length){fb.className="fb bad";fb.textContent="Todavía te faltan palabras por usar.";return}
    const good=built.map(x=>x.w).join(" ")===O.items[i];
    $("#ord-slot").className="slot "+(good?"ok":"no");
    if(good&&!tried.has(i)){ok++;tried.add(i)}
    fb.className="fb "+(good?"good":"bad");
    fb.innerHTML=good?`<b>¡Perfecto!</b> ${esc(O.items[i])}`:`<b>Revisa el orden.</b> Pista: sujeto + have/has + participio. Inténtalo otra vez.`;
    if(good)speak(O.items[i]);
    draw();if(good)$("#ord-slot").className="slot ok";
  };
  $("#ord-clear").onclick=load;
  $("#ord-next").onclick=()=>{i=(i+1)%O.items.length;load()};
  load();
  /* parte 2 */
  const KEY=`englishplease.${U.slug}.writing`;
  const ta=$("#wr-text");ta.value=store.get(KEY,"");
  function evalText(){
    const t=ta.value.trim();
    const sents=t?t.split(/(?<=[.!?])\s+|\n+/).map(s=>s.trim()).filter(s=>/[a-z]/i.test(s)):[];
    $("#wr-count").textContent=`${sents.length} oración${sents.length===1?"":"es"} · ${t?t.split(/\s+/).length:0} palabras`;
    const res=W.checks.map(c=>({label:c.label,on:c.test(t,sents)}));
    $("#wr-checks").innerHTML=res.map(r=>`<li class="${r.on?"on":""}"><span class="ck">${r.on?"✓":""}</span><span>${esc(r.label)}</span></li>`).join("");
    return res;
  }
  ta.addEventListener("input",()=>{store.set(KEY,ta.value);evalText()});
  evalText();
  $("#wr-copy").onclick=async()=>{try{await navigator.clipboard.writeText(ta.value);toast("Texto copiado")}catch(e){ta.select();toast("Selecciona y copia el texto")}};
  $("#wr-pdf").onclick=()=>{
    if(ta.value.trim().split(/\s+/).length<8){toast("Escribe un poco más antes de descargar.");return}
    EP.makeTextPDF({title:W.title,text:ta.value.trim(),name:store.get("englishplease.name",""),group:store.get("englishplease.group",""),checks:evalText()},U);
  };
}
function speakingPanel(){
  const S=U.practice.speaking,p=$("#pn-speaking");
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  let i=0,rec=null;
  p.innerHTML=`<div class="pgrid">
    <div class="panel speak-card">
      <div class="scorebar" style="margin:0"><span id="sp-n"></span><span id="sp-kind"></span></div>
      <p class="target" id="sp-target"></p>
      <p class="note" id="sp-hint"></p>
      <div class="cta" style="margin:0;align-items:center">
        <button class="mic" type="button" id="sp-mic" aria-label="Hablar"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
        <button class="btn btn-ghost btn-sm" type="button" id="sp-model">Escuchar modelo</button>
        <button class="btn btn-ghost btn-sm" type="button" id="sp-next">Siguiente →</button>
      </div>
      <p class="heard" id="sp-heard" aria-live="polite"></p>
    </div>
    <aside class="panel"><h3>¿Cómo funciona?</h3>
      <ol class="how" style="margin:8px 0 0;padding-left:20px;display:grid;gap:6px;font-size:15px">
        <li>Escucha el modelo y repítelo en voz alta.</li>
        <li>Toca el micrófono y habla. El navegador escribe lo que entendió.</li>
        <li>En las preguntas, responde con tu propia experiencia: <b>Yes, I have.</b> o <b>No, I haven't.</b></li>
        <li>Después, haz las mismas preguntas a un compañero.</li>
      </ol>
      <p class="note" style="margin-top:12px">${SR?"El micrófono funciona mejor en Chrome. La primera vez el navegador te pedirá permiso.":"Este navegador no reconoce la voz. Practica en voz alta con el modelo o abre la página en Chrome."}</p>
    </aside>
  </div>`;
  const words=s=>s.toLowerCase().replace(/[^a-z' ]/g," ").split(/\s+/).filter(Boolean);
  function load(){
    const it=S.items[i];
    $("#sp-n").textContent=`Reto ${i+1} de ${S.items.length}`;
    $("#sp-kind").textContent=it.mode==="answer"?"RESPONDE":"REPITE";
    $("#sp-target").textContent=it.mode==="answer"?it.q:it.text;
    $("#sp-hint").textContent=it.mode==="answer"?`Ejemplo de respuesta: ${it.model}`:(it.es||"");
    $("#sp-heard").textContent="";
    $("#sp-mic").disabled=!SR;
  }
  $("#sp-model").onclick=()=>{const it=S.items[i];speak(it.mode==="answer"?it.q+" ... "+it.model:it.text)};
  $("#sp-next").onclick=()=>{i=(i+1)%S.items.length;load()};
  $("#sp-mic").onclick=()=>{
    if(!SR)return;
    if(rec){rec.stop();return}
    rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=3;
    const mic=$("#sp-mic");mic.classList.add("live");$("#sp-heard").textContent="Te escucho…";
    rec.onresult=e=>{
      const alts=Array.from(e.results[0]).map(a=>a.transcript);
      const it=S.items[i];let ok,said=alts[0];
      if(it.mode==="answer"){ok=alts.some(a=>it.accept.some(r=>new RegExp(r,"i").test(a)));said=alts.find(a=>it.accept.some(r=>new RegExp(r,"i").test(a)))||said}
      else{const tw=words(it.text);const best=Math.max(...alts.map(a=>{const sw=new Set(words(a));return tw.filter(w=>sw.has(w)).length/tw.length}));ok=best>=.75}
      $("#sp-heard").innerHTML=`Entendí: <b>“${esc(said)}”</b><br>${ok?"✓ ¡Muy bien! Se entendió perfectamente.":"Casi. Escucha el modelo y vuelve a intentarlo, despacio y claro."}`;
    };
    rec.onerror=e=>{$("#sp-heard").textContent=e.error==="not-allowed"?"Permite el uso del micrófono para practicar.":"No te escuché bien. Intenta de nuevo."};
    rec.onend=()=>{mic.classList.remove("live");rec=null};
    try{rec.start()}catch(e){mic.classList.remove("live");rec=null}
  };
  load();
}

/* ---------- EXAMEN, RESULTADOS, DOCENTE ---------- */
function exam(){
  const m=U.exam.mix,total=Object.values(m).reduce((a,b)=>a+b,0);
  return `<section class="block" id="examen" aria-labelledby="ex-t"><div class="wrap">
    <div class="sec-head"><span class="step-label"><i>4</i>Final test</span><h2 id="ex-t">Examen final: ${esc(U.title)}</h2><p>Son ${total} preguntas y tu nota va de 0 a 5. No hay límite de tiempo: lee con calma.</p></div>
    <div class="play-grid">
      <div class="panel" id="stage"></div>
      <aside class="panel how"><h3>Instrucciones</h3>
        <ol>
          <li>Escribe tu nombre y tu curso.</li>
          <li>Lee cada pregunta y elige una opción (también puedes usar las teclas 1-4).</li>
          <li>Muévete con las flechas o toca un número para saltar a esa pregunta.</li>
          <li>Puedes cambiar tus respuestas antes de finalizar.</li>
          <li>Al finalizar verás tu nota y la explicación de cada pregunta.</li>
          <li>Descarga tu informe en PDF.</li>
        </ol>
        <p class="note" style="margin-top:10px">Cada estudiante recibe preguntas distintas, en otro orden y con las opciones mezcladas.</p>
        <div class="score"><div><b>${total}</b><span>preguntas</span></div><div><b>0-5</b><span>nota final</span></div><div><b>${Object.keys(m).length}</b><span>tipos</span></div></div>
      </aside>
    </div>
  </div></section>
  <section class="block alt" id="resultados" aria-labelledby="rs-t"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Resultados</span><h2 id="rs-t">Tus exámenes</h2><p>Guardados en este dispositivo. Puedes volver a descargar cada informe.</p></div>
    <div class="res-tools"><span class="note" id="res-count"></span><span id="clear-zone"></span></div>
    <div class="table-wrap"><table class="htable"><thead><tr><th>Estudiante</th><th>Curso</th><th>Aciertos</th><th>Nota</th><th>Fecha</th><th>Informe</th></tr></thead><tbody id="history"></tbody></table></div>
    <p class="teacher-note"><b>Para el docente:</b> cada examen terminado se envía a la hoja de cálculo del docente con nombre, curso, unidad, aciertos, nota y preguntas falladas. Este historial y el PDF quedan como respaldo en el dispositivo del estudiante.</p>
  </div></section>`;
}
function teacher(){
  const T=U.teacher;
  return `<section class="block" id="docente" aria-labelledby="dc-t"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Ficha técnica de la unidad</span><h2 id="dc-t">Para el docente</h2></div>
    <div class="sheet">
      <div class="panel"><h3>Identificación</h3><dl>${T.id.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl></div>
      <div class="panel"><h3>Objetivo de aprendizaje</h3><p style="margin-top:10px;font-size:15px">${esc(T.objective)}</p><ul>${T.outcomes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="panel"><h3>Secuencia didáctica</h3><ul>${T.sequence.map(x=>`<li><b>${esc(x[0])}:</b> ${esc(x[1])}</li>`).join("")}</ul></div>
      <div class="panel"><h3>Referentes</h3><ul>${T.refs.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>
  </div></section>`;
}

/* ---------- MONTAJE ---------- */
document.title=`${U.title} · English, please`;
main.innerHTML=hero()+learn()+vocab()+practice()+exam()+teacher();
bindSay(main);bindVocab();bindTabs();
readingPanel();listeningPanel();writingPanel();speakingPanel();
bindSay(main);
const H=EP.mountHistory({unit:U,tbody:$("#history"),count:$("#res-count"),clear:$("#clear-zone")});
EP.mountExam({unit:U,stage:$("#stage"),onSaved:H.render});
})();
