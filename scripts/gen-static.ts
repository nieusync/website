// Post-build. Writes a real index.html at every route path, plus the sitemap.
//
// GitHub Pages cannot set a status code, so an SPA route that only exists in
// the client router is served as 404.html — the reader sees the right page, but
// the response says 404 and search engines drop it. That was survivable when
// "/" was the only indexed URL; it is not now that every page is in the
// sitemap. A file on disk at /pt/quem-somos/index.html answers 200.
//
// 404.html stays as the fallback for genuinely unknown URLs, which is what
// makes LEGACY_ROUTES work.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES, LANGS, href, type RouteKey } from '../src/routes';
import en from '../src/i18n/en';
import pt from '../src/i18n/pt';

// cwd, not import.meta.url: esbuild bundles this into node_modules/.tmp, so the
// module's own path is not where the project is. pnpm runs scripts from the
// package root.
const dist = join(process.cwd(), 'dist');
const ORIGIN = 'https://nieusync.com';

// Params come from the dictionaries rather than a second hardcoded list, so a
// new pillar or legal document appears here the moment it is written.
const dicts = { pt, en };
const params: Partial<Record<RouteKey, (lang: 'pt' | 'en') => string[]>> = {
  pillars: (l) => dicts[l].site.pillars.items.map((p) => p.slug),
  legal: (l) => dicts[l].legal.docs.map((d) => d.slug),
};

// `pillars` only exists with a slug — there is no /pt/pilares index page, and
// emitting one would answer 200 and then redirect, which reads as a soft 404.
// `legal` does have an index (LegalIndex), so it is not in here.
const PARAM_ONLY: RouteKey[] = ['pillars'];

// The <title> each page sets for itself at runtime, resolved statically. Every
// value is read from the dictionaries the pages read, so the crawler and the
// reader are never told two different things. Anything not listed (clientArea,
// which only redirects) falls back to the site title.
const titles: Partial<Record<RouteKey, (lang: 'pt' | 'en', slug?: string) => string | undefined>> = {
  home: (l) => dicts[l].site.documentTitle,
  whoWeAre: (l) => dicts[l].site.whoPage.documentTitle,
  whatWeDo: (l) => dicts[l].site.whatPage.documentTitle,
  contact: (l) => dicts[l].site.contact.documentTitle,
  legal: (l, slug) =>
    slug
      ? `${dicts[l].legal.docs.find((d) => d.slug === slug)?.title} | Nieusync`
      : dicts[l].legal.indexDocumentTitle,
  pillars: (l, slug) =>
    `${dicts[l].site.pillars.items.find((p) => p.slug === slug)?.name} | Nieusync`,
};

const titleFor = (lang: 'pt' | 'en', key: RouteKey, slug?: string) =>
  titles[key]?.(lang, slug) ?? dicts[lang].site.documentTitle;

type Page = Record<'pt' | 'en', { path: string; title: string }>;

/** Every real URL on the site, grouped so a page and its translation stay paired. */
function allPaths(): Page[] {
  const out: Page[] = [];
  const page = (key: RouteKey, ptSlug?: string, enSlug?: string): Page => ({
    pt: { path: href('pt', key, ptSlug), title: titleFor('pt', key, ptSlug) },
    en: { path: href('en', key, enSlug), title: titleFor('en', key, enSlug) },
  });
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (!PARAM_ONLY.includes(key)) out.push(page(key));
    const slugs = params[key];
    if (!slugs) continue;
    // Slugs are identical across dictionaries by design (see routes.ts), so
    // pairing by index is safe, and check:i18n already fails if the two
    // dictionaries ever disagree on length.
    slugs('pt').forEach((slug, i) => out.push(page(key, slug, slugs('en')[i])));
  }
  return out;
}

const paths = allPaths();
const shell = readFileSync(join(dist, 'index.html'), 'utf8');

// Pages serves these as directories, so it 301s /pt/quem-somos to
// /pt/quem-somos/ and the app's canonical tag reads the trailing-slash form off
// location.pathname. Emit the same thing here or the sitemap advertises a URL
// that redirects to one whose canonical disagrees with it.
const slash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Everything between the markers in index.html is per page. Without this every
// URL on the site shipped the same title and a Portuguese description, English
// pages included, because they are all copies of one shell.
const META = /<!-- meta:start[\s\S]*?meta:end -->/;

function head(lang: 'pt' | 'en', path: string, title: string): string {
  const description = dicts[lang].site.metaDescription;
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${ORIGIN}${slash(path)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:locale" content="${lang === 'pt' ? 'pt_PT' : 'en_GB'}" />`,
  ].join('\n\t\t');
}

function pageHtml(lang: 'pt' | 'en', path: string, title: string): string {
  if (!META.test(shell)) throw new Error('index.html has no meta:start/meta:end block');
  return shell
    .replace(META, head(lang, path, title))
    .replace('<html lang="pt-PT">', `<html lang="${lang === 'pt' ? 'pt-PT' : 'en'}">`);
}

for (const pair of paths) {
  for (const lang of LANGS) {
    const { path, title } = pair[lang];
    const dir = path === `/${lang}` ? join(dist, lang) : join(dist, path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), pageHtml(lang, path, title));
  }
}

// The root index.html is the Portuguese home page: `/` redirects to `/pt` in
// the client, and an unfurler that never runs the redirect should still read
// the right thing.
writeFileSync(join(dist, 'index.html'), pageHtml('pt', href('pt', 'home'), titleFor('pt', 'home')));

const priority = (path: string) =>
  /^\/(pt|en)$/.test(path) ? '1.0' : path.includes('/legal/') ? '0.3' : path.includes('/pilares/') || path.includes('/pillars/') ? '0.7' : '0.8';

const urls = paths
  .flatMap((pair) =>
    LANGS.map((lang) => {
      const alts = [
        `<xhtml:link rel="alternate" hreflang="pt-PT" href="${ORIGIN}${slash(pair.pt.path)}"/>`,
        `<xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${slash(pair.en.path)}"/>`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${slash(pair.pt.path)}"/>`,
      ];
      return `  <url>
    <loc>${ORIGIN}${slash(pair[lang].path)}</loc>
    <priority>${priority(pair[lang].path)}</priority>
    ${alts.join('\n    ')}
  </url>`;
    }),
  )
  .join('\n');

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/gen-static.ts from routes.ts and the i18n dictionaries.
     Do not edit: it is rewritten on every build. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);

console.log(`✓ ${paths.length * LANGS.length} static paths + sitemap`);
