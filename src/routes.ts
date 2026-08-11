import type { Lang } from './i18n';

export const LANGS: Lang[] = ['pt', 'en'];

// Every page's URL segment, per language. The router builds its routes from
// this, links resolve through it, and the language switch reverses it, so a
// slug is written here once and nowhere else.
//
// These must stay in step with `locales/*.json` in nieusync/blog, whose
// `path.*` keys build the same links from the blog's header. Change a slug in
// one repo and the other repo's links 404.
export const ROUTES = {
  home: { pt: '', en: '' },
  whoWeAre: { pt: 'quem-somos', en: 'who-we-are' },
  whatWeDo: { pt: 'o-que-fazemos', en: 'what-we-do' },
  clientArea: { pt: 'area-de-cliente', en: 'client-area' },
  contact: { pt: 'contacto', en: 'contact' },
  legal: { pt: 'legal', en: 'legal' },
  pillars: { pt: 'pilares', en: 'pillars' },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** `/pt/quem-somos`, or `/pt/legal/privacy-policy` with a param. */
export function href(lang: Lang, key: RouteKey, param?: string): string {
  // `home` has an empty segment, so filter before joining — but keep the
  // leading slash out of the filter or the path stops being absolute.
  return '/' + [lang, ROUTES[key][lang], param].filter(Boolean).join('/');
}

// Pillar and legal document slugs are deliberately identical in both
// dictionaries (`digital`, `privacy-policy`, …), so only the first segment is
// ever translated and any param survives a language swap untouched.
const BY_SEGMENT = new Map<string, RouteKey>(
  LANGS.flatMap((l) =>
    (Object.keys(ROUTES) as RouteKey[]).map((k) => [`${l}/${ROUTES[k][l]}`, k] as const),
  ),
);

/**
 * The same page in the other language. Used by the language switch, which is
 * the only control allowed to change language: a reader who is three levels
 * deep stays three levels deep.
 *
 * An unrecognised path falls back to that language's home rather than 404ing,
 * because the switch should never be the thing that breaks.
 */
export function swapLang(pathname: string, to: Lang): string {
  const [, , segment = '', ...rest] = pathname.split('/');
  const key = BY_SEGMENT.get(`${pathname.split('/')[1]}/${segment}`);
  if (!key) return href(to, 'home');
  return [href(to, key), ...rest].join('/');
}

/** The reader's language from the URL, or null when the path carries none. */
export function langFromPath(pathname: string): Lang | null {
  const first = pathname.split('/')[1];
  return LANGS.includes(first as Lang) ? (first as Lang) : null;
}

// Pre-split URLs. The site lived under /demo with English slugs and no locale,
// and those links are out in the world, so they land on the Portuguese
// equivalent rather than being swallowed by the catch-all.
export const LEGACY_ROUTES: Record<string, RouteKey> = {
  '/demo': 'home',
  '/demo/who-we-are': 'whoWeAre',
  '/demo/what-we-do': 'whatWeDo',
  '/demo/client-area': 'clientArea',
  '/demo/contact': 'contact',
  '/demo/legal': 'legal',
};

/** Where a pre-split URL should land, or null if it was never one of ours. */
export function legacyTarget(pathname: string, lang: Lang): string | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const direct = LEGACY_ROUTES[clean];
  if (direct) return href(lang, direct);

  // /demo/legal/:slug and /demo/pillars/:slug keep their slug.
  const nested = clean.match(/^\/demo\/(legal|pillars)\/([\w-]+)$/);
  if (nested) return href(lang, nested[1] === 'legal' ? 'legal' : 'pillars', nested[2]);

  return null;
}
