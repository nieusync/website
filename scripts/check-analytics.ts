import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import { readOrigin } from '../src/origin'

const [html, analytics, toolFlow] = await Promise.all([
	readFile('index.html', 'utf8'),
	readFile('src/analytics.ts', 'utf8'),
	readFile('src/components/ToolFlow.tsx', 'utf8'),
])
const measurementId = 'G-7MRR3GZPDS'
const defaultConsent = html.indexOf("gtag('consent', 'default'")
const config = html.indexOf("gtag('config', 'G-7MRR3GZPDS'")

assert.ok(defaultConsent >= 0, 'Consent Mode defaults are required')
assert.ok(config > defaultConsent, 'Consent Mode defaults must precede gtag config')
for (const key of ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization']) {
	assert.match(html, new RegExp(`${key}: 'denied'`), `${key} must default to denied`)
}
assert.match(html, /wait_for_update: 500/, 'Consent Mode must wait for the choice')
assert.match(html, new RegExp(`gtag/js\\?id=${measurementId}`), 'Google tag must be present')
assert.match(html, /send_page_view: false/, 'React owns page views')

assert.match(analytics, /if \(!consented\) return/, 'Tool events must require analytics consent')
for (const [event, method, name] of [
	['tool_start', 'trackCustom', 'ToolStart'],
	['tool_complete', 'track', 'Lead'],
	['newsletter_signup', 'track', 'CompleteRegistration'],
]) {
	assert.match(analytics, new RegExp(`${event}: \\['${method}', '${name}'\\]`), `${event} Meta mapping must remain stable`)
}
const autoConfig = analytics.indexOf("fbq('set', 'autoConfig', false, META_PIXEL_ID)")
const metaInit = analytics.indexOf("fbq('init', META_PIXEL_ID)")
assert.ok(autoConfig >= 0 && autoConfig < metaInit, 'Meta autoConfig must be disabled before pixel init')

assert.match(toolFlow, /const completionTracked = useRef\(false\)/, 'Tool completion must track once per flow')
assert.match(toolFlow, /const newsletterTracked = useRef\(false\)/, 'Newsletter intent must track once per flow')
assert.match(
	toolFlow,
	/if \(!completionTracked\.current\) \{\s+completionTracked\.current = true;\s+trackTool\('tool_complete', form\);\s+\}/,
	'Tool completion must be guarded before dispatch',
)
assert.match(
	toolFlow,
	/if \(details\.marketing && !newsletterTracked\.current\) \{\s+newsletterTracked\.current = true;\s+trackTool\('newsletter_signup', form\);\s+\}/,
	'Newsletter intent must be guarded before dispatch',
)

console.log('analytics check OK')

// Where a lead came from: read from the landing URL, never from storage.
const site = 'nieusync.com'
assert.deepEqual(
	readOrigin('?utm_source=meta&utm_medium=paid_social&utm_campaign=rgpc&utm_content=A&fbclid=x', 'https://l.facebook.com/', site),
	{ source: 'meta', medium: 'paid_social', campaign: 'rgpc', content: 'A', referrer: 'l.facebook.com' },
	'utm tags and the referring host are both kept',
)
assert.deepEqual(readOrigin('?gclid=abc', '', site), { source: 'google', medium: 'cpc' }, 'Google Ads clicks carry gclid, not utm')
assert.deepEqual(readOrigin('?utm_source=newsletter&gclid=abc', '', site), { source: 'newsletter' }, 'explicit tags win over gclid')
assert.equal(readOrigin('', 'https://nieusync.com/pt/quem-somos', site), undefined, 'our own pages are not an origin')
assert.deepEqual(readOrigin('', 'https://blog.nieusync.com/pt/artigo/', site), { referrer: 'blog.nieusync.com' }, 'the blog is credited')
assert.equal(readOrigin('', '', site), undefined, 'a typed address has no origin')
assert.equal(readOrigin(`?utm_campaign=${'a'.repeat(101)}`, '', site), undefined, 'a field the API would refuse is left out, not cut')
assert.equal(readOrigin('', 'not a url', site), undefined)
assert.match(toolFlow, /origin: landingOrigin\(\)/, 'Tool submissions must carry their origin')
assert.doesNotMatch(await readFile('src/origin.ts', 'utf8'), /localStorage|sessionStorage|document\.cookie/, 'Origin must not touch device storage')
