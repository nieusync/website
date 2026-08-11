// Run: pnpm check:routes (part of `pnpm check`)
//
// swapLang is the one piece of routing logic with a wrong answer that looks
// right: it silently sends readers to the homepage whenever it fails to match,
// so a broken slug table reads as "the language button is a bit odd" rather
// than as an error. These asserts are what notice.
import assert from 'node:assert/strict';
import { ROUTES, href, swapLang, langFromPath, legacyTarget, LANGS } from '../src/routes';

// --- href -------------------------------------------------------------------
assert.equal(href('pt', 'home'), '/pt');
assert.equal(href('en', 'home'), '/en');
assert.equal(href('pt', 'whoWeAre'), '/pt/quem-somos');
assert.equal(href('en', 'whoWeAre'), '/en/who-we-are');
assert.equal(href('pt', 'legal', 'privacy-policy'), '/pt/legal/privacy-policy');
assert.equal(href('en', 'pillars', 'digital'), '/en/pillars/digital');

// --- swapLang ---------------------------------------------------------------
assert.equal(swapLang('/pt', 'en'), '/en');
assert.equal(swapLang('/pt/quem-somos', 'en'), '/en/who-we-are');
assert.equal(swapLang('/en/who-we-are', 'pt'), '/pt/quem-somos');
assert.equal(swapLang('/pt/o-que-fazemos', 'en'), '/en/what-we-do');
assert.equal(swapLang('/pt/area-de-cliente', 'en'), '/en/client-area');

// Params ride along untranslated, which is the whole reason the slugs in
// site.ts and legal.ts are identical across dictionaries.
assert.equal(swapLang('/pt/legal/privacy-policy', 'en'), '/en/legal/privacy-policy');
assert.equal(swapLang('/pt/pilares/digital', 'en'), '/en/pillars/digital');
assert.equal(swapLang('/en/pillars/financial', 'pt'), '/pt/pilares/financial');

// Unknown paths fall back to home rather than producing a broken URL.
assert.equal(swapLang('/pt/nao-existe', 'en'), '/en');
assert.equal(swapLang('/', 'en'), '/en');

// Round-tripping any real route must be identity.
for (const key of Object.keys(ROUTES) as (keyof typeof ROUTES)[]) {
  for (const lang of LANGS) {
    const other = lang === 'pt' ? 'en' : 'pt';
    const path = href(lang, key);
    assert.equal(swapLang(swapLang(path, other), lang), path, `round trip ${lang}/${key}`);
  }
}

// --- langFromPath -----------------------------------------------------------
assert.equal(langFromPath('/pt/quem-somos'), 'pt');
assert.equal(langFromPath('/en'), 'en');
assert.equal(langFromPath('/demo/who-we-are'), null);
assert.equal(langFromPath('/'), null);

// --- legacyTarget -----------------------------------------------------------
assert.equal(legacyTarget('/demo', 'pt'), '/pt');
assert.equal(legacyTarget('/demo/who-we-are', 'pt'), '/pt/quem-somos');
assert.equal(legacyTarget('/demo/who-we-are', 'en'), '/en/who-we-are');
assert.equal(legacyTarget('/demo/what-we-do/', 'pt'), '/pt/o-que-fazemos');
assert.equal(legacyTarget('/demo/legal/cookie-policy', 'pt'), '/pt/legal/cookie-policy');
assert.equal(legacyTarget('/demo/pillars/strategy', 'pt'), '/pt/pilares/strategy');
assert.equal(legacyTarget('/something-else', 'pt'), null);

// --- the slug table itself --------------------------------------------------
for (const [key, byLang] of Object.entries(ROUTES)) {
  for (const lang of LANGS) {
    const slug = byLang[lang];
    assert.ok(/^[a-z0-9-]*$/.test(slug), `${key}.${lang} is not a bare URL segment: "${slug}"`);
  }
}

// Two pages sharing a slug in one language would make the router ambiguous.
for (const lang of LANGS) {
  const slugs = Object.values(ROUTES).map((r) => r[lang]);
  assert.equal(new Set(slugs).size, slugs.length, `duplicate slug in ${lang}`);
}

console.log(`✓ routes: ${Object.keys(ROUTES).length} pages × ${LANGS.length} languages`);
