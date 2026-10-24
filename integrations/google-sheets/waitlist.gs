/**
 * BIAB Waitlist → Google Sheet
 *
 * Receives sign-ups from https://biab.ch/api/waitlist and appends one row
 * per registration to the "Waitlist" tab. Duo contacts share one row.
 * Setup: see README.md in this folder.
 *
 * Script property required:  SECRET  (same value as WAITLIST_SECRET on the website)
 */

const SHEET_NAME = 'Waitlist';

const COLUMNS = [
  ['submittedAt', 'Submitted at (UTC)'],
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['country', 'Country'],
  ['countryCode', 'Country code'],
  ['start', 'Start as'],
  ['source', 'Heard about us'],
  ['consent', 'Consent'],
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmContent', 'utm_content'],
  ['utmTerm', 'utm_term'],
  ['referrer', 'Referrer'],
  ['landingPage', 'Landing page'],
  ['language', 'Browser language'],
  ['partnerFirstName', 'Partner first name'],
  ['partnerLastName', 'Partner last name'],
  ['partnerEmail', 'Partner email'],
  ['partnerPhone', 'Partner phone'],
  ['partnerCountry', 'Partner country'],
  ['partnerCountryCode', 'Partner country code'],
  ['partnerConsent', 'Partner consent'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');

    if (!secret || body.secret !== secret) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const record = body.record || {};
    if (!record.email) return json({ ok: false, error: 'missing email' });
    if (record.start === 'duo' && (!record.partnerFirstName || !record.partnerLastName ||
        !record.partnerEmail || !record.partnerCountryCode || record.partnerConsent !== 'yes' ||
        normalizeEmail(record.partnerEmail) === normalizeEmail(record.email))) {
      return json({ ok: false, error: 'invalid duo' });
    }

    lock.waitLock(10000);
    const sheet = getSheet();

    // Search both email columns, including submissions with the Duo roles swapped.
    const email = normalizeEmail(record.email);
    const partnerEmail = record.start === 'duo' ? normalizeEmail(record.partnerEmail) : '';
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const rows = sheet.getRange(2, 1, lastRow - 1, COLUMNS.length).getValues();
      const matches = [];
      for (var i = 0; i < rows.length; i++) {
        const existing = rowRecord(rows[i]);
        const addresses = [normalizeEmail(existing.email), normalizeEmail(existing.partnerEmail)].filter(Boolean);
        if (addresses.indexOf(email) !== -1 || (partnerEmail && addresses.indexOf(partnerEmail) !== -1)) {
          matches.push({ number: i + 2, record: existing });
        }
      }
      if (matches.length > 1) return json({ ok: false, error: 'email_conflict' });
      if (matches.length === 1) {
        const match = matches[0];
        const samePrimary = normalizeEmail(match.record.email) === email;
        const samePartner = normalizeEmail(match.record.partnerEmail) === partnerEmail;
        const swapped = partnerEmail && normalizeEmail(match.record.partnerEmail) === email && normalizeEmail(match.record.email) === partnerEmail;
        if ((samePrimary && !partnerEmail) || (samePrimary && samePartner) || swapped) {
          return json({ ok: true, duplicate: true, duoSaved: record.start === 'duo' });
        }
        if (samePrimary && partnerEmail && match.record.start !== 'duo' && !match.record.partnerEmail) {
          // Upgrade a Solo reservation without losing its original date or attribution.
          COLUMNS.forEach(function (column, index) {
            if (column[0] === 'start' || column[0].indexOf('partner') === 0) {
              sheet.getRange(match.number, index + 1).setNumberFormat('@').setValue(safeValue(record, column[0]));
            }
          });
          return json({ ok: true, duplicate: false, duoSaved: true });
        }
        return json({ ok: false, error: 'email_conflict' });
      }
    }

    // Prefix values that a spreadsheet would treat as formulas.
    const row = COLUMNS.map(function (c) {
      return safeValue(record, c[0]);
    });
    sheet.appendRow(row);
    // Keep phone numbers like +41791234567 as text.
    ['phone', 'partnerPhone'].forEach(function (key) {
      sheet.getRange(sheet.getLastRow(), COLUMNS.findIndex(function (c) { return c[0] === key; }) + 1)
        .setNumberFormat('@').setValue(record[key] || '');
    });

    return json({ ok: true, duplicate: false, duoSaved: record.start === 'duo' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function rowRecord(row) {
  const record = {};
  COLUMNS.forEach(function (column, index) { record[column[0]] = row[index]; });
  return record;
}

function safeValue(record, key) {
  const value = record[key] == null ? '' : String(record[key]);
  return /^[=+\-@]/.test(value) && key !== 'phone' && key !== 'partnerPhone' ? "'" + value : value;
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  } else if (sheet.getLastColumn() < COLUMNS.length) {
    // New fields are appended after the original columns; existing rows stay intact.
    const firstNew = sheet.getLastColumn();
    if (sheet.getMaxColumns() < COLUMNS.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), COLUMNS.length - sheet.getMaxColumns());
    sheet.getRange(1, firstNew + 1, 1, COLUMNS.length - firstNew)
      .setValues([COLUMNS.slice(firstNew).map(function (c) { return c[1]; })]).setFontWeight('bold');
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to create the header row and test access. */
function setup() {
  getSheet();
}
