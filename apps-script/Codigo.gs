/**
 * English, please + Modal Road · Recepción de resultados
 * Una sola hoja para todas las unidades. Pega este código en tu hoja de cálculo
 * (Extensiones → Apps Script) reemplazando el anterior, y publícalo como NUEVA VERSIÓN
 * de la misma implementación (Implementar → Gestionar implementaciones → editar ✏️ → Nueva versión)
 * para que la URL /exec no cambie.
 *
 * Cambio frente a la versión de Modal Road: nueva columna "Unidad" al final (columna J).
 * Las filas que envíe Modal Road (que no manda unidad) quedan como "Modal Verbs".
 */
const HOJA = 'Resultados';
const ENVIAR_CORREO = true; // Cambia a false si no quieres un correo por cada estudiante.
const UNIDAD_POR_DEFECTO = 'Modal Verbs';

const ENCABEZADOS = ['Fecha y hora', 'Estudiante', 'Curso', 'Aciertos', 'Preguntas',
                     'Nota (0-5)', 'Desempeño', 'Preguntas falladas', 'ID', 'Unidad'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || typeof d.grade !== 'number' || d.grade < 0 || d.grade > 5) return respuesta(false);

    const hoja = obtenerHoja();
    const filas = Math.max(hoja.getLastRow() - 1, 1);
    const ids = hoja.getRange(2, 9, filas, 1).getValues().flat().map(String);
    if (ids.indexOf(String(d.id)) !== -1) return respuesta(true); // ya estaba registrado

    const unidad = String(d.unit || UNIDAD_POR_DEFECTO).slice(0, 60);
    hoja.appendRow([new Date(), String(d.name).slice(0, 80), String(d.group).slice(0, 20),
                    d.correct, d.n, d.grade, d.level, String(d.missed || '').slice(0, 2000), String(d.id), unidad]);

    if (ENVIAR_CORREO) {
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        unidad + ' · ' + d.name + ' (' + d.group + '): ' + d.grade.toFixed(1),
        'Unidad: ' + unidad +
        '\nEstudiante: ' + d.name + '\nCurso: ' + d.group +
        '\nAciertos: ' + d.correct + ' de ' + d.n +
        '\nNota: ' + d.grade.toFixed(1) + ' / 5.0 (' + d.level + ')' +
        '\n\nPreguntas falladas:\n' + (d.missed || 'Ninguna') +
        '\n\nHoja de resultados: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      );
    }
    return respuesta(true);
  } finally {
    lock.releaseLock();
  }
}

function obtenerHoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const h = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
  if (h.getLastRow() === 0) {
    h.appendRow(ENCABEZADOS);
    h.setFrozenRows(1);
    h.getRange('F:F').setNumberFormat('0.0');
  } else if (h.getRange(1, 10).getValue() !== 'Unidad') {
    // Hoja creada por la versión anterior: agrega el encabezado y marca las filas viejas.
    h.getRange(1, 10).setValue('Unidad');
    if (h.getLastRow() > 1) {
      const r = h.getRange(2, 10, h.getLastRow() - 1, 1);
      r.setValues(r.getValues().map(v => [v[0] || UNIDAD_POR_DEFECTO]));
    }
  }
  h.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold');
  return h;
}

function respuesta(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Ejecuta esta función una vez después de pegar el código: agrega la columna y una fila de prueba. Luego borra esa fila. */
function probar() {
  doPost({ postData: { contents: JSON.stringify({
    id: 'prueba-' + Date.now(), name: 'Estudiante de prueba', group: '8-1', unit: 'Present Perfect',
    correct: 12, n: 15, grade: 4.0, level: 'Alto', missed: '3. I have never ___ snow. → respondió: saw'
  }) } });
}
