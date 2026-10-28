/* English, please · Unidad 3 · Present Perfect (Life Experiences)
   Este archivo contiene TODO el contenido de la unidad. Para crear otra unidad:
   copia la carpeta, cambia este archivo y agrega la unidad en assets/units.js. */
window.UNIT = {
  slug: "present-perfect",
  number: 3,
  title: "Present Perfect",
  theme: "Life Experiences",
  tag: "UNIDAD 3 · INGLÉS 8.º · NIVEL A2",
  heading: "What <em>have</em> you done?",
  lead: "El Present Perfect sirve para contar las experiencias de tu vida y lo que ya hiciste (o todavía no). Aprende la forma, escucha ejemplos, practica y presenta el examen final.",
  facts: ["have / has + participio", "ever · never · already · yet", "Examen final con nota 0-5"],
  stamps: [
    ["I HAVE","BEEN","TO CALI","c1",""], ["SHE HAS","SEEN","THE SEA","c2 sq",""], ["WE HAVE","EATEN","MOTE","c3",""],
    ["HE HAS","FLOWN","IN A PLANE","c4 sq",""], ["WE HAVE","WON","A CUP","c5",""], ["I HAVE","NEVER","SEEN SNOW","c6 sq",""]
  ],
  question: "What have you done in your life?",
  routeIntro: "Cuatro paradas: aprende la estructura, consulta los verbos, practica las cuatro habilidades y demuestra lo que sabes.",
  learnTitle: "Cómo funciona el Present Perfect",

  /* ---------- GRAMÁTICA ---------- */
  grammar: [
    { type: "uses", title: "¿Para qué sirve?",
      intro: "Usamos el Present Perfect para hablar de algo que pasó en algún momento de nuestra vida, <b>sin decir cuándo</b>. Lo importante es la experiencia, no la fecha.",
      timeline: { caption: "Pasó en algún momento de mi vida. CUÁNDO no importa.", left: "PAST", right: "NOW" },
      items: [
        { h: "Experiencias de vida", p: "Lo que has hecho (o no) alguna vez.", ex: [["I <mark>have visited</mark> Cartagena.", "He visitado Cartagena."]] },
        { h: "Acciones terminadas o no, hasta ahora", p: "Lo que ya hiciste o todavía no.", ex: [["We <mark>have already finished</mark> our exams.", "Ya terminamos los exámenes."]] },
        { h: "Lo que nunca has hecho", p: "Con never: nunca en la vida.", ex: [["I <mark>have never seen</mark> snow.", "Nunca he visto nieve."]] }
      ] },
    { type: "formulas", title: "La forma: have / has + participio",
      intro: "El auxiliar cambia según el sujeto (<b>have</b> o <b>has</b>). El participio nunca cambia.",
      items: [
        { eyebrow: "Afirmativa", h: "Sujeto + have / has + participio", eq: ["Sujeto", "+", "*have / has", "+", "Participio"],
          ex: [["I <mark>have played</mark> football.", "He jugado fútbol."], ["She <mark>has visited</mark> Bogotá.", "Ella ha visitado Bogotá."], ["We<mark>'ve seen</mark> the sea.", "Hemos visto el mar."]],
          note: "Contracciones: I've · you've · we've · they've · he's · she's · it's" },
        { eyebrow: "Negativa", h: "Sujeto + haven't / hasn't + participio", eq: ["Sujeto", "+", "*haven't / hasn't", "+", "Participio"],
          ex: [["I <mark>haven't seen</mark> snow.", "No he visto nieve."], ["He <mark>hasn't finished</mark> his homework.", "Él no ha terminado su tarea."], ["They <mark>haven't been</mark> to Medellín.", "Ellos no han ido a Medellín."]] },
        { eyebrow: "Pregunta", h: "Have / Has + sujeto + participio?", eq: ["*Have / Has", "+", "Sujeto", "+", "Participio?"],
          ex: [["<mark>Have</mark> you ever <mark>flown</mark> in a plane? — Yes, I have.", "¿Alguna vez has volado en avión? — Sí."], ["<mark>Has</mark> she <mark>eaten</mark> sushi? — No, she hasn't.", "¿Ella ha comido sushi? — No."]],
          note: "En la respuesta corta no se repite el participio: Yes, I have. / No, I haven't." }
      ],
      subjects: [
        { cls: "a", small: "I · YOU · WE · THEY", big: "have + participio", ex: "They have won two trophies." },
        { cls: "b", small: "HE · SHE · IT", big: "has + participio", ex: "My dog has broken a vase." }
      ] },
    { type: "words", title: "Palabras que acompañan al Present Perfect",
      intro: "Estas cuatro palabras aparecen mucho con el Present Perfect. Fíjate en <b>dónde</b> van en la oración.",
      items: [
        { w: "ever", es: "alguna vez", where: "En <b>preguntas</b>, antes del participio: Have you <b>ever</b> + participio?",
          ex: [["Have you <mark>ever</mark> swum in a river?", "¿Alguna vez has nadado en un río?"], ["Has she <mark>ever</mark> ridden a horse?", "¿Ella alguna vez ha montado a caballo?"]] },
        { w: "never", es: "nunca", where: "Con <b>have / has afirmativo</b>. ¡No uses doble negación! (haven't never ✗)",
          ex: [["I have <mark>never</mark> eaten sushi.", "Nunca he comido sushi."], ["He has <mark>never</mark> been to Bogotá.", "Él nunca ha ido a Bogotá."]] },
        { w: "already", es: "ya", where: "En <b>afirmativas</b>, entre have / has y el participio.",
          ex: [["I have <mark>already</mark> done my homework.", "Ya hice mi tarea."], ["The bus has <mark>already</mark> left.", "El bus ya se fue."]] },
        { w: "yet", es: "todavía / ya", where: "En <b>negativas y preguntas</b>, al <b>final</b> de la oración.",
          ex: [["I haven't finished the project <mark>yet</mark>.", "Todavía no he terminado el proyecto."], ["Have you finished <mark>yet</mark>?", "¿Ya terminaste?"]] }
      ] },
    { type: "contrast", title: "Present Perfect o Simple Past",
      intro: "Si dices <b>cuándo</b> pasó (yesterday, last year, in 2024, two days ago), usa el <b>Simple Past</b>.",
      cols: [
        { cls: "pp", h: "Present Perfect", clue: "Experiencia · sin fecha", ex: [["I <mark>have been</mark> to Cartagena.", "He ido a Cartagena."], ["He <mark>has won</mark> a medal.", "Él ha ganado una medalla."]] },
        { cls: "sp", h: "Simple Past", clue: "Con fecha: yesterday · last year · in 2024 · ago", ex: [["I <mark>went</mark> to Cartagena last year.", "Fui a Cartagena el año pasado."], ["He <mark>won</mark> a medal in 2025.", "Ganó una medalla en 2025."]] }
      ],
      dialogue: ["A: Have you ever been to Bogotá?", "B: Yes, I have. I went there last December.", "A: Did you like it?", "B: Yes! But I haven't visited Monserrate yet."] },
    { type: "errors", title: "Errores frecuentes",
      items: [
        ["She have visited Bogotá.", "She has visited Bogotá.", "Con he / she / it se usa has."],
        ["I have visit Cartagena.", "I have visited Cartagena.", "Después de have / has va el participio, no el verbo base."],
        ["Have you ever ate sushi?", "Have you ever eaten sushi?", "Ate es pasado simple; el participio es eaten."],
        ["I haven't never seen snow.", "I have never seen snow.", "Never ya es negativo: no se usa con haven't."],
        ["I have gone to Medellín last year.", "I went to Medellín last year.", "Con una fecha (last year) se usa el Simple Past."],
        ["We haven't finished already.", "We haven't finished yet.", "En negativas se usa yet, al final."]
      ] }
  ],

  /* ---------- VERBOS Y PALABRAS ---------- */
  vocab: {
    title: "Verbos y palabras clave",
    intro: "Los verbos regulares forman el participio con -ed. Los irregulares hay que aprenderlos. Busca un verbo, escúchalo o activa el modo repaso para ponerte a prueba.",
    verbs: [
      { b: "be", p: "was / were", pp: "been", es: "ser / estar / ir (a un lugar)" },
      { b: "begin", p: "began", pp: "begun", es: "empezar" },
      { b: "break", p: "broke", pp: "broken", es: "romper" },
      { b: "bring", p: "brought", pp: "brought", es: "traer" },
      { b: "buy", p: "bought", pp: "bought", es: "comprar" },
      { b: "come", p: "came", pp: "come", es: "venir" },
      { b: "do", p: "did", pp: "done", es: "hacer" },
      { b: "drink", p: "drank", pp: "drunk", es: "beber" },
      { b: "drive", p: "drove", pp: "driven", es: "conducir" },
      { b: "eat", p: "ate", pp: "eaten", es: "comer" },
      { b: "find", p: "found", pp: "found", es: "encontrar" },
      { b: "fly", p: "flew", pp: "flown", es: "volar" },
      { b: "forget", p: "forgot", pp: "forgotten", es: "olvidar" },
      { b: "get", p: "got", pp: "got / gotten", es: "obtener / conseguir" },
      { b: "give", p: "gave", pp: "given", es: "dar" },
      { b: "go", p: "went", pp: "gone / been", es: "ir" },
      { b: "have", p: "had", pp: "had", es: "tener" },
      { b: "know", p: "knew", pp: "known", es: "saber / conocer" },
      { b: "lose", p: "lost", pp: "lost", es: "perder" },
      { b: "make", p: "made", pp: "made", es: "hacer / fabricar" },
      { b: "meet", p: "met", pp: "met", es: "conocer (a alguien)" },
      { b: "read", p: "read", pp: "read", es: "leer" },
      { b: "ride", p: "rode", pp: "ridden", es: "montar (bici, caballo)" },
      { b: "run", p: "ran", pp: "run", es: "correr" },
      { b: "see", p: "saw", pp: "seen", es: "ver" },
      { b: "sing", p: "sang", pp: "sung", es: "cantar" },
      { b: "sleep", p: "slept", pp: "slept", es: "dormir" },
      { b: "speak", p: "spoke", pp: "spoken", es: "hablar" },
      { b: "swim", p: "swam", pp: "swum", es: "nadar" },
      { b: "take", p: "took", pp: "taken", es: "tomar / llevar" },
      { b: "win", p: "won", pp: "won", es: "ganar" },
      { b: "write", p: "wrote", pp: "written", es: "escribir" },
      { b: "clean", p: "cleaned", pp: "cleaned", es: "limpiar", reg: true },
      { b: "cook", p: "cooked", pp: "cooked", es: "cocinar", reg: true },
      { b: "dance", p: "danced", pp: "danced", es: "bailar", reg: true },
      { b: "finish", p: "finished", pp: "finished", es: "terminar", reg: true },
      { b: "help", p: "helped", pp: "helped", es: "ayudar", reg: true },
      { b: "live", p: "lived", pp: "lived", es: "vivir", reg: true },
      { b: "play", p: "played", pp: "played", es: "jugar / tocar", reg: true },
      { b: "start", p: "started", pp: "started", es: "empezar", reg: true },
      { b: "study", p: "studied", pp: "studied", es: "estudiar", reg: true },
      { b: "travel", p: "traveled", pp: "traveled", es: "viajar", reg: true },
      { b: "try", p: "tried", pp: "tried", es: "probar / intentar", reg: true },
      { b: "visit", p: "visited", pp: "visited", es: "visitar", reg: true },
      { b: "watch", p: "watched", pp: "watched", es: "mirar / ver (TV)", reg: true },
      { b: "work", p: "worked", pp: "worked", es: "trabajar", reg: true }
    ],
    keywords: { title: "Palabras clave", items: [
      { w: "ever", es: "alguna vez", ex: "Have you ever seen a whale?" },
      { w: "never", es: "nunca", ex: "I have never flown in a plane." },
      { w: "already", es: "ya", ex: "She has already eaten." },
      { w: "yet", es: "todavía / ya", ex: "We haven't finished yet." },
      { w: "once", es: "una vez", ex: "I have been to Medellín once." },
      { w: "twice", es: "dos veces", ex: "He has visited Cartagena twice." },
      { w: "three times", es: "tres veces", ex: "We have won three times." },
      { w: "last year / ago / in 2024", es: "con fecha → Simple Past", ex: "I went to Bogotá two years ago." }
    ] },
    phrases: { title: "Experiencias para hablar de ti", items: [
      ["been to the beach", "ido a la playa"], ["flown in a plane", "volado en avión"], ["ridden a horse", "montado a caballo"],
      ["swum in a river", "nadado en un río"], ["seen a concert", "visto un concierto"], ["met a famous person", "conocido a un famoso"],
      ["eaten sushi", "comido sushi"], ["won a medal", "ganado una medalla"], ["broken a bone", "fracturado un hueso"],
      ["lost my phone", "perdido mi celular"], ["cooked for my family", "cocinado para mi familia"], ["played in a tournament", "jugado en un torneo"]
    ] }
  },

  /* ---------- PRÁCTICA ---------- */
  practice: {
    reading: {
      title: "My Life So Far",
      text: [
        "Hi! My name is Mateo. I'm 14 years old and I live in Montería. I love sports, and I play football every weekend. My team <mark>has won</mark> two tournaments!",
        "I <mark>have traveled</mark> to many places in Colombia. I <mark>have been</mark> to Cartagena twice and I <mark>have visited</mark> Medellín once. I went to Medellín last year with my family, and we rode the Metrocable. But I <mark>have never been</mark> to San Andrés, and I <mark>have never flown</mark> in a plane. I'm a little nervous about flying!",
        "I <mark>have eaten</mark> many typical dishes, like mote de queso and bocachico, but I <mark>have never tried</mark> sushi.",
        "This year I <mark>have already finished</mark> my English project, but I <mark>haven't studied</mark> for my math exam yet. I have to start tonight!"
      ],
      glossary: "Glosario: twice = dos veces · once = una vez · rode = montamos (ride) · nervous = nervioso · tried = probado",
      questions: [
        { q: "How many times has Mateo been to Cartagena?", o: ["Twice", "Once", "Never", "Three times"], a: 0, why: "El texto dice: I have been to Cartagena twice (dos veces)." },
        { q: "When did Mateo go to Medellín?", o: ["Last year", "This year", "Yesterday", "He has never gone"], a: 0, why: "I went to Medellín last year. Con fecha se usa el pasado simple." },
        { q: "Has Mateo ever flown in a plane?", o: ["No, he hasn't.", "Yes, he has.", "Yes, last year.", "The text doesn't say."], a: 0, why: "I have never flown in a plane." },
        { q: "Which food has Mateo never tried?", o: ["Sushi", "Mote de queso", "Bocachico"], a: 0, why: "I have never tried sushi." },
        { q: "What has Mateo already finished?", o: ["His English project", "His math exam", "A tournament", "His trip to San Andrés"], a: 0, why: "I have already finished my English project." },
        { q: "\"Mateo's team has won two tournaments.\" Is it true or false?", o: ["True", "False"], a: 0, why: "My team has won two tournaments!" },
        { q: "Why does Mateo say \"I went to Medellín last year\" and not \"I have gone\"?", o: ["Porque dice cuándo (last year)", "Porque Medellín es una ciudad", "Porque es una pregunta", "Porque es una oración negativa"], a: 0, why: "Cuando decimos la fecha usamos el Simple Past." }
      ]
    },
    listening: {
      intro: "Escucha cada audio (puedes repetirlo) y elige la respuesta. Después de responder verás la transcripción.",
      items: [
        { lines: ["A: Have you ever been to Bogotá?", "B: Yes, I have. I went there last December."], q: "When did the person go to Bogotá?", o: ["Last December", "Last year", "Never", "Yesterday"], a: 0, why: "B dice: I went there last December." },
        { lines: ["A: Has your sister finished her homework?", "B: No, she hasn't. She's still working on it."], q: "¿La hermana terminó la tarea?", o: ["No, todavía no", "Sí, ya terminó", "No tiene tarea", "Terminó ayer"], a: 0, why: "No, she hasn't. She's still working." },
        { lines: ["A: I have never eaten sushi, but I have eaten ceviche many times."], q: "What has the speaker never eaten?", o: ["Sushi", "Ceviche", "Both", "Neither"], a: 0, why: "I have never eaten sushi." },
        { lines: ["A: We have already bought the tickets for the concert."], q: "¿Qué ya hicieron?", o: ["Comprar las boletas", "Ir al concierto", "Vender las boletas", "Nada todavía"], a: 0, why: "We have already bought the tickets." },
        { lines: ["A: Have you ever ridden a horse?", "B: No, I haven't. But my brother has ridden one twice."], q: "Who has ridden a horse?", o: ["The brother", "The person who answers", "Both", "Nobody"], a: 0, why: "My brother has ridden one twice." },
        { lines: ["A: My grandma has visited us three times this year."], q: "How many times has the grandma visited?", o: ["Three times", "Two times", "Once", "Never"], a: 0, why: "Three times this year." },
        { lines: ["A: The game hasn't started yet. We can buy some food."], q: "¿Qué pasa con el partido?", o: ["Todavía no ha empezado", "Ya empezó", "Ya terminó", "Lo cancelaron"], a: 0, why: "The game hasn't started yet." },
        { lines: ["A: I lost my phone yesterday, and I haven't found it yet."], q: "¿Encontró el celular?", o: ["No, todavía no", "Sí, ayer", "Sí, hoy", "Nunca lo perdió"], a: 0, why: "I haven't found it yet." }
      ]
    },
    order: { items: [
      "I have never seen snow.",
      "Have you ever eaten sushi?",
      "She has visited Cartagena twice.",
      "We haven't finished the project yet.",
      "My brother has already done his homework.",
      "Has he ever ridden a horse?",
      "They have been to Medellín.",
      "I have lost my keys again."
    ] },
    writing: {
      title: "My Life Experiences",
      prompt: "Escribe un texto corto (mínimo 6 oraciones) sobre tus experiencias. Usa los modelos y revisa la lista de chequeo mientras escribes.",
      placeholder: "Hi! My name is… I have… I have never… I have already… but I haven't… yet. I went to… last…",
      frames: ["I have ____, but I have never ____.", "I have already ____, but I haven't ____ yet.", "I have been to ____ (once / twice).", "I went to ____ last ____. (Simple Past)"],
      checks: [
        { label: "Al menos 6 oraciones", test: (t, s) => s.length >= 6 },
        { label: "Usas have / has + participio al menos 3 veces", test: t => (t.match(/\b(have|has|haven't|hasn't|'ve)\s+(never\s+|already\s+|ever\s+|not\s+|just\s+)?(been|begun|broken|brought|bought|come|done|drunk|driven|eaten|found|flown|forgotten|got|gotten|given|gone|had|known|lost|made|met|read|ridden|run|seen|sung|slept|spoken|swum|taken|won|written|[a-z]+ed)\b/gi) || []).length >= 3 },
        { label: "Usas never", test: t => /\bnever\b/i.test(t) },
        { label: "Usas already o yet", test: t => /\b(already|yet)\b/i.test(t) },
        { label: "Agregas un detalle en Simple Past con fecha (yesterday, last…, ago, in 2024)", test: t => /\b(yesterday|last\s+\w+|ago|in\s+(19|20)\d\d)\b/i.test(t) },
        { label: "Cada oración empieza con mayúscula y termina con punto", test: (t, s) => s.length > 0 && s.every(x => /^[A-Z¡¿"]/.test(x) && /[.!?]["”]?$/.test(x)) }
      ]
    },
    speaking: { items: [
      { mode: "repeat", text: "I have been to Cartagena.", es: "He ido a Cartagena." },
      { mode: "repeat", text: "She has never flown in a plane.", es: "Ella nunca ha volado en avión." },
      { mode: "repeat", text: "We have already finished our homework.", es: "Ya terminamos la tarea." },
      { mode: "repeat", text: "Have you ever eaten sushi?", es: "¿Alguna vez has comido sushi?" },
      { mode: "answer", q: "Have you ever been to the beach?", model: "Yes, I have. / No, I haven't.", accept: ["\\b(yes|yeah)\\b.*\\b(i\\s+have|i've)\\b", "\\bno\\b.*\\b(haven't|have not|i\\s+have\\s+not)\\b", "\\bi\\s+(have|'ve)\\s+(never\\s+)?been\\b"] },
      { mode: "answer", q: "Have you ever ridden a horse?", model: "Yes, I have. / No, I haven't.", accept: ["\\b(yes|yeah)\\b.*\\b(i\\s+have|i've)\\b", "\\bno\\b.*\\b(haven't|have not)\\b", "\\bi\\s+(have|'ve)\\s+(never\\s+)?ridden\\b"] },
      { mode: "answer", q: "Have you finished your homework yet?", model: "Yes, I have. / No, I haven't finished it yet.", accept: ["\\b(yes|yeah)\\b.*\\b(i\\s+have|i've)\\b", "\\bno\\b.*\\b(haven't|have not)\\b", "\\bi\\s+(have|'ve)\\s+(already\\s+)?finished\\b"] },
      { mode: "answer", q: "What is something you have never done?", model: "I have never seen snow.", accept: ["\\bi\\s+(have|'ve)\\s+never\\s+\\w+"] }
    ] }
  },

  /* ---------- EXAMEN FINAL ----------
     t: gap (completar) · choose (palabra / tiempo verbal) · fix (oración correcta)
     a: índice de la opción correcta antes de mezclar (se mezclan solas). */
  exam: {
    mix: { gap: 7, choose: 4, fix: 4 },
    types: { gap: "Completa la oración", choose: "Elige la mejor opción", fix: "Elige la oración correcta" },
    msg: ["¡Excelente! Dominas el Present Perfect.", "¡Bien hecho! Repasa las preguntas que fallaste.", "Vuelve a la sección Aprender y practica un poco más. ¡Tú puedes!"],
    bank: [
      { t: "gap", q: "She ___ visited Cartagena three times.", o: ["has", "have", "is", "did"], a: 0, why: "Con she se usa has." },
      { t: "gap", q: "I have never ___ snow.", tr: "Nunca he visto nieve.", o: ["seen", "saw", "see", "seeing"], a: 0, why: "Después de have va el participio: seen." },
      { t: "gap", q: "___ you ever eaten sushi?", o: ["Have", "Has", "Did", "Are"], a: 0, why: "Pregunta con you: Have you ever…?" },
      { t: "gap", q: "My parents ___ been to Bogotá.", o: ["have", "has", "are", "was"], a: 0, why: "My parents = they → have." },
      { t: "gap", q: "We have ___ our homework. Now we can play.", tr: "Ya podemos jugar.", o: ["done", "did", "do", "doing"], a: 0, why: "El participio de do es done." },
      { t: "gap", q: "Has he ever ___ a horse?", tr: "¿Alguna vez ha montado a caballo?", o: ["ridden", "rode", "ride", "rided"], a: 0, why: "El participio de ride es ridden." },
      { t: "gap", q: "They ___ finished the project yet.", o: ["haven't", "hasn't", "didn't", "aren't"], a: 0, why: "Negativa con they: haven't." },
      { t: "gap", q: "I have ___ my keys! I can't open the door.", tr: "¡No puedo abrir la puerta!", o: ["lost", "lose", "losed", "losing"], a: 0, why: "El participio de lose es lost." },
      { t: "gap", q: "Our team has ___ two trophies this year.", o: ["won", "win", "winned", "wins"], a: 0, why: "El participio de win es won." },
      { t: "gap", q: "Have you ___ the new movie?", o: ["seen", "saw", "see", "sees"], a: 0, why: "Have + participio: seen." },
      { t: "gap", q: "Juan ___ never flown in a plane.", o: ["has", "have", "is", "does"], a: 0, why: "Juan = he → has." },
      { t: "gap", q: "I have ___ a letter to my grandma.", tr: "Le he escrito una carta a mi abuela.", o: ["written", "wrote", "write", "writed"], a: 0, why: "El participio de write es written." },
      { t: "gap", q: "She has ___ in the river many times.", tr: "Ha nadado en el río muchas veces.", o: ["swum", "swam", "swim", "swimmed"], a: 0, why: "El participio de swim es swum." },
      { t: "gap", q: "Have you ever met a famous person? — No, I ___.", o: ["haven't", "didn't", "hasn't", "don't"], a: 0, why: "Respuesta corta: No, I haven't." },
      { t: "gap", q: "Has your brother finished school? — Yes, he ___.", o: ["has", "have", "did", "is"], a: 0, why: "Respuesta corta con he: Yes, he has." },
      { t: "gap", q: "We have ___ English for three years.", o: ["studied", "study", "studyed", "studying"], a: 0, why: "Study es regular: studied (y → ied)." },
      { t: "gap", q: "Have you ever ___ arepa de huevo?", o: ["eaten", "ate", "eat", "eated"], a: 0, why: "El participio de eat es eaten." },
      { t: "gap", q: "My cat has ___ my sandwich!", tr: "¡Mi gato se comió mi sándwich!", o: ["eaten", "eat", "ate", "eating"], a: 0, why: "Has + participio: eaten." },
      { t: "gap", q: "I ___ my room. It's clean now.", tr: "Ya está limpio.", o: ["have cleaned", "has cleaned", "have clean", "has clean"], a: 0, why: "I + have + participio (cleaned)." },
      { t: "gap", q: "The bus ___ already left.", tr: "El bus ya se fue.", o: ["has", "have", "is", "did"], a: 0, why: "The bus = it → has." },
      { t: "gap", q: "I have ___ a new friend at school.", tr: "He hecho un nuevo amigo.", o: ["made", "make", "maked", "making"], a: 0, why: "El participio de make es made." },
      { t: "gap", q: "She has ___ a lot of books this year.", o: ["read", "readed", "reading", "reads"], a: 0, why: "Read se escribe igual en participio (se pronuncia /red/)." },
      { t: "gap", q: "He has ___ his arm playing football.", tr: "Se fracturó el brazo jugando fútbol.", o: ["broken", "broke", "break", "breaked"], a: 0, why: "El participio de break es broken." },
      { t: "gap", q: "I have ___ my homework, but I haven't checked it yet.", o: ["finished", "finish", "finishing", "finishes"], a: 0, why: "Finish es regular: finished." },

      { t: "choose", q: "Have you ___ been to Medellín?", tr: "¿Alguna vez has ido a Medellín?", o: ["ever", "never", "yet", "already"], a: 0, why: "En preguntas de experiencia usamos ever." },
      { t: "choose", q: "I have ___ eaten sushi. I don't like fish.", o: ["never", "ever", "yet", "already"], a: 0, why: "Never = nunca, con have afirmativo." },
      { t: "choose", q: "She hasn't finished her homework ___.", o: ["yet", "already", "never", "ever"], a: 0, why: "En negativas, yet va al final." },
      { t: "choose", q: "We have ___ watched this movie. Let's watch another one.", tr: "Veamos otra.", o: ["already", "yet", "ever", "never"], a: 0, why: "Ya la vimos: already, en afirmativa." },
      { t: "choose", q: "Has the class started ___? I'm late!", o: ["yet", "never", "ago", "last"], a: 0, why: "En preguntas, yet al final = ¿ya…?" },
      { t: "choose", q: "I ___ to Cartagena last year.", o: ["went", "have gone", "have been", "has gone"], a: 0, why: "Con last year (fecha) se usa el Simple Past: went." },
      { t: "choose", q: "I visited Bogotá ___.", o: ["in 2024", "ever", "never", "yet"], a: 0, why: "Visited (pasado simple) va con una fecha: in 2024." },
      { t: "choose", q: "She ___ her grandma yesterday.", o: ["visited", "has visited", "have visited", "visit"], a: 0, why: "Yesterday indica fecha: Simple Past." },
      { t: "choose", q: "My brother has ___ flown in a plane. He's afraid!", tr: "¡Le da miedo!", o: ["never", "ever", "yet", "already"], a: 0, why: "Nunca ha volado: never." },
      { t: "choose", q: "I haven't called my mom ___.", o: ["yet", "already", "ever", "never"], a: 0, why: "Negativa + yet al final." },
      { t: "choose", q: "Have you ever been to the beach? — Yes, I have. I ___ to Coveñas last December.", o: ["went", "have gone", "go", "have been"], a: 0, why: "El detalle con fecha (last December) va en Simple Past." },
      { t: "choose", q: "We have ___ finished the test. We can go now.", o: ["already", "yet", "ever", "never"], a: 0, why: "Ya terminamos: already, entre have y el participio." },
      { t: "choose", q: "¿Cuál oración habla de una experiencia SIN decir cuándo pasó?", o: ["I have visited Cartagena.", "I visited Cartagena in 2024.", "I visit Cartagena every year.", "I am visiting Cartagena now."], a: 0, why: "El Present Perfect habla de la experiencia sin fecha." },

      { t: "fix", q: "Elige la oración correcta.", tr: "Ella ha visitado Bogotá.", o: ["She has visited Bogotá.", "She have visited Bogotá.", "She has visit Bogotá.", "She is visited Bogotá."], a: 0, why: "She + has + participio (visited)." },
      { t: "fix", q: "Elige la oración correcta.", tr: "Nunca he visto nieve.", o: ["I have never seen snow.", "I haven't never seen snow.", "I have never saw snow.", "I has never seen snow."], a: 0, why: "Never con have afirmativo + participio seen." },
      { t: "fix", q: "Elige la pregunta correcta.", o: ["Have you ever eaten sushi?", "Did you ever eaten sushi?", "Have you ever ate sushi?", "Has you ever eaten sushi?"], a: 0, why: "Have + you + ever + participio (eaten)." },
      { t: "fix", q: "Elige la oración correcta.", o: ["They haven't finished yet.", "They haven't finished already.", "They hasn't finished yet.", "They don't have finished yet."], a: 0, why: "Negativa con they: haven't + participio + yet." },
      { t: "fix", q: "Elige la oración correcta.", tr: "Él ya se fue a casa.", o: ["He has already gone home.", "He has already went home.", "He have already gone home.", "He has already go home."], a: 0, why: "Went es pasado simple; el participio es gone." },
      { t: "fix", q: "Elige la oración correcta.", o: ["We have been to Medellín.", "We have went to Medellín.", "We has been to Medellín.", "We have be to Medellín."], a: 0, why: "We + have + been." },
      { t: "fix", q: "Elige la oración correcta.", o: ["I went to the beach last year.", "I have gone to the beach last year.", "I have been to the beach last year.", "I has gone to the beach last year."], a: 0, why: "Last year es una fecha: Simple Past (went)." },
      { t: "fix", q: "Elige la pregunta correcta.", o: ["Has she finished her homework?", "Have she finished her homework?", "Has she finish her homework?", "Did she has finished her homework?"], a: 0, why: "Has + she + participio (finished)." },
      { t: "fix", q: "Elige la oración correcta.", tr: "Mi papá nunca ha montado a caballo.", o: ["My dad has never ridden a horse.", "My dad has never rode a horse.", "My dad have never ridden a horse.", "My dad hasn't never ridden a horse."], a: 0, why: "Has + never + ridden." },
      { t: "fix", q: "Elige la pregunta correcta.", tr: "¿Has conocido a mi primo?", o: ["Have you met my cousin?", "Have you meet my cousin?", "Has you met my cousin?", "Do you have met my cousin?"], a: 0, why: "Have + you + participio (met)." },
      { t: "fix", q: "Elige la oración correcta.", tr: "La película ya empezó.", o: ["The movie has already started.", "The movie has already start.", "The movie have already started.", "The movie has started yet."], a: 0, why: "Has + already + participio (started)." },
      { t: "fix", q: "Elige la oración correcta.", o: ["I have written two stories.", "I have wrote two stories.", "I has written two stories.", "I have writed two stories."], a: 0, why: "El participio de write es written." },
      { t: "fix", q: "Have you ever played tennis? Elige la respuesta corta correcta.", o: ["Yes, I have.", "Yes, I has.", "Yes, I do.", "Yes, I am."], a: 0, why: "Respuesta corta: Yes, I have." }
    ]
  },

  /* ---------- FICHA DEL DOCENTE ---------- */
  teacher: {
    id: [
      ["Área", "Humanidades: Lengua extranjera (Inglés)"],
      ["Grado", "Octavo (8-1 y 8-2)"],
      ["Nivel", "A2 (MCER)"],
      ["Unidad", "3 · Life Experiences: Present Perfect"],
      ["Duración", "2 a 3 bloques de 2 horas"],
      ["Evaluación", "Banco de 50 preguntas. Cada estudiante recibe 15 al azar (7 de completar, 4 de elegir la mejor opción y 4 de oración correcta), en orden distinto y con las opciones mezcladas. Nota de 0.0 a 5.0."],
      ["Autor", "Juan Pablo Herazo Sibaja · Docente en formación, Universidad de Córdoba"]
    ],
    objective: "Usar el Present Perfect para hablar de experiencias de vida y de acciones terminadas o pendientes, en oraciones afirmativas, negativas e interrogativas, diferenciándolo del Simple Past.",
    outcomes: [
      "Forma oraciones con have / has + participio pasado (regular e irregular).",
      "Pregunta y responde con Have you ever…? y respuestas cortas.",
      "Usa ever, never, already y yet en la posición correcta.",
      "Distingue cuándo usar Present Perfect (sin fecha) y Simple Past (con fecha).",
      "Escribe un texto corto sobre sus experiencias personales."
    ],
    sequence: [
      ["Exploración", "Have you ever…? con experiencias cercanas y el texto de Mateo."],
      ["Estructuración", "Línea de tiempo, forma, palabras clave, contraste con el Simple Past y errores frecuentes."],
      ["Práctica", "Reading, listening, sentence builder, writing guiado y speaking con reconocimiento de voz."],
      ["Evaluación", "Examen final de 15 preguntas con nota de 0 a 5 y desempeño (Bajo 0.0-2.9 · Básico 3.0-3.9 · Alto 4.0-4.5 · Superior 4.6-5.0)."]
    ],
    refs: [
      "Ministerio de Educación Nacional. Derechos Básicos de Aprendizaje de Inglés, grados 6.º a 11.º.",
      "I.E. Liceo Guillermo Valencia. Plan de área de Inglés 2026, grado 8.º: expresa experiencias personales y acciones recientes usando el presente perfecto.",
      "Consejo de Europa. Marco Común Europeo de Referencia para las Lenguas (nivel A2).",
      "Licencia del recurso: uso educativo libre (CC BY-NC 4.0)."
    ]
  }
};
