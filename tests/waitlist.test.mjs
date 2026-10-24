import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Run the production modules with local substitutes for the external webhook.
function loadTs(relative, overrides = {}, globals = {}) {
  const url = new URL(relative, import.meta.url);
  const nativeRequire = createRequire(url);
  const { outputText } = ts.transpileModule(fs.readFileSync(url, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module, exports: module.exports,
    require: (id) => overrides[id] ?? nativeRequire(id),
    console, Request, Response, AbortSignal, ...globals,
  }, { filename: url.pathname });
  return module.exports;
}
const waitlist = loadTs('../lib/waitlist.ts');
const primary = {
  firstName: 'Alex', lastName: 'Meier', email: 'alex@example.test', country: 'CH', phone: '',
  start: 'solo', source: '', consent: true, elapsedMs: 5000,
};
const duo = {
  ...primary, start: 'duo', partnerFirstName: 'Sam', partnerLastName: 'Rossi',
  partnerEmail: 'sam@example.test', partnerCountry: 'IT', partnerPhone: '', partnerConsent: true,
};
const plain = (value) => JSON.parse(JSON.stringify(value));

test('Solo and undecided do not require partner details; Duo requires every mandatory partner field', () => {
  assert.deepEqual(plain(waitlist.validateWaitlist(primary)), {});
  assert.deepEqual(plain(waitlist.validateWaitlist({ ...primary, start: 'unsure' })), {});
  const errors = waitlist.validateWaitlist({ ...primary, start: 'duo' });
  assert.deepEqual(Object.keys(errors).sort(), ['partnerConsent', 'partnerCountry', 'partnerEmail', 'partnerFirstName', 'partnerLastName']);
  assert.deepEqual(plain(waitlist.validateWaitlist(duo)), {});
});
test('Duo validates independent email, names, phone country, and agreement', () => {
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerEmail: ' ALEX@EXAMPLE.TEST ' }).partnerEmail);
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerEmail: 'broken' }).partnerEmail);
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerFirstName: 'x'.repeat(81) }).partnerFirstName);
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerPhone: '123' }).partnerPhone);
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerCountry: 'XX' }).partnerCountry);
  assert.ok(waitlist.validateWaitlist({ ...duo, partnerConsent: false }).partnerConsent);
  assert.deepEqual(plain(waitlist.validateWaitlist({ ...duo, partnerCountry: 'DE', partnerPhone: '0151 23456789' })), {});
});
function apiHarness(sheetResponse = { ok: true, duoSaved: true }) {
  const sent = [];
  const route = loadTs('../app/api/waitlist/route.ts', { '@/lib/waitlist': waitlist }, {
    process: { env: { NODE_ENV: 'production', WAITLIST_WEBHOOK_URL: 'https://sheet.example.test', WAITLIST_SECRET: 'local-test-only' } },
    console: { info() {}, error() {} },
    fetch: async (_url, options) => { sent.push(JSON.parse(options.body).record); return Response.json(sheetResponse); },
  });
  return { sent, post: (body) => route.POST(new Request('http://localhost/api/waitlist', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  })) };
}
test('API rejects incomplete Duo without forwarding and stores both validated contacts in one record', async () => {
  const api = apiHarness();
  assert.equal((await api.post({ ...primary, start: 'duo' })).status, 422);
  assert.equal(api.sent.length, 0);
  const result = await api.post({ ...duo, partnerEmail: ' SAM@EXAMPLE.TEST ', partnerCountry: 'ch', partnerPhone: '079 123 45 67' });
  assert.equal(result.status, 200);
  assert.equal(api.sent.length, 1);
  assert.equal(api.sent[0].email, primary.email);
  assert.equal(api.sent[0].partnerEmail, duo.partnerEmail);
  assert.equal(api.sent[0].partnerPhone, '+41791234567');
  assert.equal(api.sent[0].partnerCountryCode, 'CH');
  assert.equal(api.sent[0].partnerConsent, 'yes');
});
test('API discards hidden partner data for Solo and surfaces conflicting registrations', async () => {
  const api = apiHarness();
  assert.equal((await api.post({ ...duo, start: 'solo' })).status, 200);
  assert.equal(api.sent[0].partnerEmail, '');
  assert.equal(api.sent[0].partnerConsent, '');
  const conflicting = apiHarness({ ok: false, error: 'email_conflict' });
  assert.equal((await conflicting.post(duo)).status, 409);
});
test('API does not claim a successful Duo reservation when an old sheet script ignores the partner', async () => {
  const oldScript = apiHarness({ ok: true });
  assert.equal((await oldScript.post(duo)).status, 502);
});

// In-memory Apps Script services: no actual Google Sheet or external account is used.
function sheetHarness() {
  const rows = [];
  let maxColumns = 26;
  const sheet = {
    getLastRow: () => rows.length,
    getLastColumn: () => Math.max(0, ...rows.map(row => row.length)),
    getMaxColumns: () => maxColumns,
    insertColumnsAfter: (_after, count) => { maxColumns += count; },
    appendRow: row => rows.push([...row]),
    setFrozenRows() {},
    getRange(row, column, height = 1, width = 1) {
      const range = {
        getValues: () => Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => rows[row - 1 + y]?.[column - 1 + x] ?? '')),
        setValue(value) { rows[row - 1] ??= []; rows[row - 1][column - 1] = value; return range; },
        setValues(values) { values.forEach((line, y) => line.forEach((value, x) => { rows[row - 1 + y] ??= []; rows[row - 1 + y][column - 1 + x] = value; })); return range; },
        setNumberFormat: () => range, setFontWeight: () => range,
      };
      return range;
    },
  };
  const context = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet, insertSheet: () => sheet }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'local-test-only' }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
  });
  vm.runInContext(fs.readFileSync(new URL('../integrations/google-sheets/waitlist.gs', import.meta.url), 'utf8'), context);
  const columns = plain(vm.runInContext('COLUMNS', context));
  return {
    rows, columns,
    value: (row, key) => rows[row][columns.findIndex(column => column[0] === key)],
    legacy(record) {
      rows.push(columns.slice(0, 18).map(column => column[1]));
      rows.push(columns.slice(0, 18).map(column => record[column[0]] ?? ''));
    },
    post: record => context.doPost({ postData: { contents: JSON.stringify({ secret: 'local-test-only', record }) } }),
  };
}
const sheetDuo = { ...duo, consent: 'yes', partnerConsent: 'yes', partnerCountryCode: 'IT', partnerCountry: 'Italy', partnerPhone: '+393331234567' };
test('Sheet saves both contacts and prevents duplicates even when the two roles are reversed', () => {
  const sheet = sheetHarness();
  assert.equal(sheet.post(sheetDuo).ok, true);
  assert.equal(sheet.rows.length, 2);
  assert.equal(sheet.value(1, 'partnerEmail'), duo.partnerEmail);
  assert.equal(sheet.value(1, 'partnerPhone'), sheetDuo.partnerPhone);
  assert.equal(sheet.post(sheetDuo).duplicate, true);
  assert.equal(sheet.post({ ...sheetDuo, email: duo.partnerEmail, partnerEmail: primary.email }).duplicate, true);
  assert.equal(sheet.rows.length, 2);
});
test('Sheet migrates old headers and upgrades Solo to Duo without losing the reservation date', () => {
  const sheet = sheetHarness();
  sheet.legacy({ ...primary, submittedAt: '2026-10-01', utmSource: 'original-campaign' });
  assert.equal(sheet.post(sheetDuo).ok, true);
  assert.equal(sheet.rows.length, 2);
  assert.equal(sheet.rows[0].length, 25);
  assert.equal(sheet.value(1, 'submittedAt'), '2026-10-01');
  assert.equal(sheet.value(1, 'utmSource'), 'original-campaign');
  assert.equal(sheet.value(1, 'start'), 'duo');
  assert.equal(sheet.value(1, 'partnerEmail'), duo.partnerEmail);
});
test('Sheet rejects conflicting partners and an incomplete Duo without silently overwriting or inserting', () => {
  const sheet = sheetHarness();
  sheet.post(sheetDuo);
  assert.equal(sheet.post({ ...sheetDuo, partnerEmail: 'other@example.test' }).error, 'email_conflict');
  assert.equal(sheet.post({ ...sheetDuo, email: 'other@example.test' }).error, 'email_conflict');
  assert.equal(sheet.post({ ...sheetDuo, partnerEmail: '' }).ok, false);
  assert.equal(sheet.value(1, 'partnerEmail'), duo.partnerEmail);
  assert.equal(sheet.rows.length, 2);
});
test('Each language covers the Duo instructions, validation errors, and both-name success messages', () => {
  for (const locale of ['de', 'fr', 'it']) {
    const messages = JSON.parse(fs.readFileSync(new URL(`../lib/i18n/messages/${locale}.json`, import.meta.url)));
    for (const key of ["Second person's contact details", "Please use a different email address for each person.", "Please confirm the second person's agreement to receive BIAB updates.", "You're both founding members, {value}.", "Your Duo is already registered, {value}."])
      assert.ok(messages[key], `${locale}: ${key}`);
  }
});
