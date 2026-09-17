function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheets()[0];

    if (aba.getLastRow() === 0) {
      aba.appendRow(["Nome", "Vai levar presente?", "Data/Hora"]);
    }

    aba.appendRow([
      dados.nome || "",
      dados.presente ? "SIM" : "NÃO",
      new Date()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, erro: String(erro)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
