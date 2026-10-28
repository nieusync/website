import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

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
	/if \(!completionTracked\.current\) \{\s+completionTracked\.current = true;\s+sent\.push\(trackTool\('tool_complete', form\)\);\s+\}/,
	'Tool completion must be guarded before dispatch',
)
assert.match(
	toolFlow,
	/if \(details\.marketing && !newsletterTracked\.current\) \{\s+newsletterTracked\.current = true;\s+sent\.push\(trackTool\('newsletter_signup', form\)\);\s+\}/,
	'Newsletter intent must be guarded before dispatch',
)

// The Conversions API copy is only deduplicated if the Pixel and the server
// send the same id, and only lawful if it rides on the same consent.
assert.match(analytics, /\{ eventID: id \}/, 'Pixel events must carry the id the server copy reuses')
assert.match(analytics, /if \(!consented \|\| sent\.length === 0\) return undefined/, 'No Conversions API context without consent')
assert.match(toolFlow, /store\(form, details, payload\(\), metaContext\(sent\)\)/, 'The submission must carry the Pixel ids')

console.log('analytics check OK')
