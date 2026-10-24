import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { preferredLocale, localizedPath, stripLocale } from '../lib/i18n/routing.ts';
import { translate, messageKey } from '../lib/i18n/translate.ts';
import { FAQS, FACTS, PLAN_FEATURES, PLANS, PROBLEM_AREAS, DIVISION, MILESTONES, HOW_IT_WORKS, WHAT_YOU_GET } from '../lib/content.ts';

test('browser languages respect regions, quality values, exclusions and explicit preference', () => {
  assert.equal(preferredLocale('de-CH,de;q=0.8,en;q=0.7'), 'de');
  assert.equal(preferredLocale('fr-CH'), 'fr');
  assert.equal(preferredLocale('it-IT'), 'it');
  assert.equal(preferredLocale('en-US'), 'en');
  assert.equal(preferredLocale('en;q=0.4,fr;q=0.9'), 'fr');
  assert.equal(preferredLocale('de;q=0,it;q=0.3'), 'it');
  assert.equal(preferredLocale('de;q=invalid,en;q=0.1'), 'en');
  assert.equal(preferredLocale('es-ES'), 'en');
  assert.equal(preferredLocale(null), 'en');
  assert.equal(preferredLocale('de', 'it'), 'it');
  assert.equal(preferredLocale('de', 'unsupported'), 'de');
});
test('links change locale without losing a subpage or query/hash', () => {
  assert.equal(localizedPath('/de/pricing?source=ad#plans', 'fr'), '/fr/pricing?source=ad#plans');
  assert.equal(localizedPath('/waitlist', 'it'), '/it/waitlist');
  assert.equal(localizedPath('/', 'de'), '/de');
  assert.equal(localizedPath('/fr', 'de'), '/de');
  assert.equal(localizedPath('/fr?src=ad#top', 'de'), '/de?src=ad#top');
  assert.equal(localizedPath('#waitlist', 'de'), '#waitlist');
  assert.equal(localizedPath('/api/waitlist', 'de'), '/api/waitlist');
  assert.equal(localizedPath('mailto:hello@biab.ch', 'fr'), 'mailto:hello@biab.ch');
  assert.equal(stripLocale('/fr/privacy'), '/privacy');
});
for (const locale of ['de', 'fr', 'it']) {
  const messages = JSON.parse(readFileSync(new URL(`../lib/i18n/messages/${locale}.json`, import.meta.url)));
  test(`${locale}: all FAQ and product copy has a translation`, () => {
    const texts = [FAQS, FACTS, PLAN_FEATURES, PLANS, PROBLEM_AREAS, DIVISION, MILESTONES, HOW_IT_WORKS, WHAT_YOU_GET];
    function check(value, key = '') {
      if (typeof value === 'string' && !['step','price','name','cta'].includes(key)) {
        if (value.length > 8 && !/^[0-9]/.test(value)) assert.ok(messages[messageKey(value)], `${locale}: ${value}`);
      } else if (Array.isArray(value)) value.forEach(v => check(v, key));
      else if (value && typeof value === 'object') Object.entries(value).forEach(([k,v]) => check(v,k));
    }
    texts.forEach(v => check(v));
  });
  test(`${locale}: dates and names in dynamic messages translate without changing the name`, () => {
    assert.notEqual(translate(messages, "You're on the list, Alex."), "You're on the list, Alex.");
    assert.ok(translate(messages, "You're on the list, Alex.").includes('Alex'));
    assert.ok(!translate(messages, 'Launching 7 January 2027').includes('January'));
    assert.notEqual(translate(messages, '  Join\n the waitlist '), '  Join\n the waitlist ');
    assert.equal(translate(messages, 'hello@biab.ch'), 'hello@biab.ch');
  });
}
