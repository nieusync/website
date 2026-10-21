import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const html = await readFile('index.html', 'utf8')
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

console.log('analytics check OK')
