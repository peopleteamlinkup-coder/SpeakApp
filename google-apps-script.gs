/**
 * SpeakApp Google Apps Script backend
 *
 * Setup:
 * 1. Open your Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Replace the default code with this file.
 * 4. Change SHEET_NAME below if needed.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me.
 * 7. Who has access: Anyone.
 * 8. Copy the Web App URL into script.js.
 */

const SHEET_NAME = "Feedback";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const type = sanitize_(payload.type, 50);
    const message = sanitize_(payload.message, 2000);

    if (!message) {
      return jsonResponse_({ ok: false, error: "Message is required." });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Type", "Feedback"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      type || "Unspecified",
      message
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "SpeakApp" });
}

function sanitize_(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
