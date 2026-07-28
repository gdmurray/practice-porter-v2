/**
 * Practice Porter contact form receiver.
 *
 * Deploy this bound to the "Practice Porter Leads" Google Sheet
 * (Extensions -> Apps Script), then Deploy -> New deployment -> Web app
 * (Execute as: Me, Who has access: Anyone). Paste the deployment URL into
 * the site's GOOGLE_APPS_SCRIPT_URL secret.
 *
 * Script properties required (Project Settings -> Script properties):
 *   WEBHOOK_SECRET      Shared secret checked against the `secret` field in
 *                       the request body. Must match the
 *                       CONTACT_FORM_WEBHOOK_SECRET secret set on Cloudflare.
 *   NOTIFICATION_EMAIL  Inbox that receives the new-lead notification.
 *
 * Note: Apps Script web apps cannot read custom HTTP headers in doPost, so
 * the shared secret travels as a `secret` field in the JSON body instead
 * (see src/pages/api/contact.ts, which sets it on the outgoing payload).
 */

const SPREADSHEET_ID = "16uYh1vt5MreZTR6ZhSchRRobGkpHdd1qydPozOnZINo";
const SHEET_NAME = "Leads";

// Matches the "Tue, Jul 28, 2026, 10:18 AM" style applied to the Timestamp
// column. Set here (not just in the sheet UI) so formatting is guaranteed
// for every row this script appends, regardless of manual sheet edits.
const TIMESTAMP_COLUMN = 1;
const TIMESTAMP_FORMAT = "ddd, mmm d, yyyy, h:mm AM/PM";

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (error) {
    return jsonResponse({ ok: false, error: "Invalid JSON body" });
  }

  const properties = PropertiesService.getScriptProperties();
  const webhookSecret = properties.getProperty("WEBHOOK_SECRET");
  const notificationEmail = properties.getProperty("NOTIFICATION_EMAIL");

  if (!webhookSecret || data.secret !== webhookSecret) {
    return jsonResponse({ ok: false, error: "Unauthorized" });
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  appendLeadRow(sheet, [
    new Date(),
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.practiceName || "",
    data.interest || "",
    data.message || "",
    "practiceporter.com",
  ]);

  if (notificationEmail) {
    GmailApp.sendEmail(
      notificationEmail,
      `New lead: ${data.firstName || ""} ${data.lastName || ""}`.trim(),
      [
        `Email: ${data.email || ""}`,
        `Practice: ${data.practiceName || "(not provided)"}`,
        `Interest: ${data.interest || "(not provided)"}`,
        "",
        data.message || "(no message)",
      ].join("\n")
    );
  }

  return jsonResponse({ ok: true });
}

/**
 * Appends a row and immediately (re-)applies TIMESTAMP_FORMAT to its
 * timestamp cell, so the format survives even if it's never applied via
 * the sheet's column formatting, or gets cleared later by a manual edit.
 */
function appendLeadRow(sheet, rowValues) {
  sheet.appendRow(rowValues);
  const newRow = sheet.getLastRow();
  sheet.getRange(newRow, TIMESTAMP_COLUMN).setNumberFormat(TIMESTAMP_FORMAT);
}

function jsonResponse(body) {
  // ContentService has no way to set an HTTP status code — the caller
  // (src/pages/api/contact.ts) checks the `ok` field in the JSON body.
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Run manually from the Apps Script editor (select this function in the
 * toolbar dropdown, then click Run) to authorize Sheets/Gmail permissions
 * and verify both the row append and the Gmail notification work end to
 * end. Also sends a test email via NOTIFICATION_EMAIL, mirroring doPost.
 */
function testAppend() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  appendLeadRow(sheet, [
    new Date(),
    "Test",
    "Lead",
    "test@example.com",
    "Test Practice",
    "growth",
    "This is a test row from testAppend().",
    "manual-test",
  ]);

  const notificationEmail = PropertiesService.getScriptProperties().getProperty(
    "NOTIFICATION_EMAIL"
  );
  if (!notificationEmail) {
    Logger.log(
      "NOTIFICATION_EMAIL script property is not set — skipping test email. " +
        "Set it under Project Settings > Script properties to test Gmail sending."
    );
    return;
  }

  GmailApp.sendEmail(
    notificationEmail,
    "New lead: Test Lead (testAppend)",
    [
      "Email: test@example.com",
      "Practice: Test Practice",
      "Interest: growth",
      "",
      "This is a test row from testAppend().",
    ].join("\n")
  );
}
