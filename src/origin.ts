/**
 * Where a visitor came from, sent with a tool submission so the notice that
 * reaches us names the campaign and the ad version behind each lead.
 *
 * No cookie and no storage: the campaign tags are in the URL the visitor
 * clicked and the referrer is a header the browser already sends. Both are read
 * once, when the site loads, and kept in this module's memory while the visitor
 * moves around the single page app. A reload of the landing page keeps its URL,
 * so it reads the same tags again; a new visit starts clean.
 *
 * Read in main.tsx before React renders, because the router may redirect the
 * landing URL (a legacy path, the bare `/`) and drop its query on the way.
 *
 * ponytail: the visit that sends the tool is the one that is credited. A
 * visitor who clicks an ad, leaves and comes back typing the address arrives
 * untagged. Carrying the first touch across visits would need storage on their
 * device, and with it the consent this module exists to do without.
 */

/** The fields website-api accepts, in its words. */
export type Origin = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  referrer?: string;
};

/** website-api refuses a longer field, so a longer one is left out rather than cut. */
const MAX_FIELD = 100;

const TAGS = [
  ['utm_source', 'source'],
  ['utm_medium', 'medium'],
  ['utm_campaign', 'campaign'],
  ['utm_content', 'content'],
] as const;

/**
 * The origin in a landing URL's query and referrer, or undefined when there is
 * none. Pure, so scripts/check-analytics.ts can call it without a browser.
 *
 * Google Ads tags its clicks with `gclid` rather than utm tags, so a `gclid`
 * with no `utm_source` is recorded as Google paid search. The referrer is kept
 * as its host only, and only when it is another host: a page of this site says
 * nothing about where a lead came from, and a full referring URL can carry
 * someone's search or session. The blog is another host, so a lead it sends
 * is credited to it.
 */
export function readOrigin(search: string, referrer: string, ownHost: string): Origin | undefined {
  const query = new URLSearchParams(search);
  const origin: Origin = {};

  for (const [param, field] of TAGS) {
    const value = query.get(param)?.trim();
    if (value && value.length <= MAX_FIELD) origin[field] = value;
  }
  if (!origin.source && query.has('gclid')) {
    origin.source = 'google';
    origin.medium ??= 'cpc';
  }

  try {
    const host = referrer ? new URL(referrer).hostname : '';
    if (host && host !== ownHost && host.length <= MAX_FIELD) origin.referrer = host;
  } catch {
    // A referrer that is not a URL says nothing worth keeping.
  }

  return Object.keys(origin).length > 0 ? origin : undefined;
}

let landing: Origin | undefined;

/** Reads the landing URL once. Called from main.tsx, before the router can rewrite it. */
export function captureOrigin() {
  landing = readOrigin(window.location.search, document.referrer, window.location.hostname);
}

/** What captureOrigin found, for the submission. Undefined is sent as no field at all. */
export const landingOrigin = () => landing;
