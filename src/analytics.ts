let lastPath: string | undefined
let consented = false

const META_PIXEL_ID = '1513647920815889'

type Gtag = (...args: unknown[]) => void
type Fbq = ((...args: unknown[]) => void) & { callMethod?: Fbq; queue: unknown[][] }

type AnalyticsWindow = Window & {
	dataLayer?: unknown[]
	gtag?: Gtag
	fbq?: Fbq
	_fbq?: Fbq
}

function gtag(...args: unknown[]) {
	const analyticsWindow = window as AnalyticsWindow
	analyticsWindow.dataLayer ??= []
	analyticsWindow.gtag ??= (...values: unknown[]) => analyticsWindow.dataLayer?.push(values)
	analyticsWindow.gtag(...args)
}

function clearAnalyticsCookies() {
	document.cookie.split(';').forEach((entry) => {
		const name = entry.trim().split('=', 1)[0]
		if (name !== '_ga' && !name.startsWith('_ga_') && name !== '_fbp' && name !== 'fr') return
		for (const domain of ['', '; Domain=.nieusync.com']) {
			document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain}`
		}
	})
}

function loadMetaPixel() {
	const analyticsWindow = window as AnalyticsWindow
	if (analyticsWindow.fbq) return analyticsWindow.fbq

	const fbq = ((...args: unknown[]) => {
		if (fbq.callMethod) fbq.callMethod(...args)
		else fbq.queue.push(args)
	}) as Fbq
	fbq.queue = []
	analyticsWindow.fbq = fbq
	analyticsWindow._fbq = fbq

	const script = document.createElement('script')
	script.async = true
	script.src = 'https://connect.facebook.net/en_US/fbevents.js'
	document.head.append(script)
	// No automatic button-click events (SubscribedButtonClick): only what we send.
	fbq('set', 'autoConfig', false, META_PIXEL_ID)
	fbq('init', META_PIXEL_ID)
	return fbq
}

export function enableAnalytics(pathname: string) {
	consented = true
	gtag('consent', 'update', { analytics_storage: 'granted' })
	if (lastPath === pathname) return
	lastPath = pathname
	gtag('event', 'page_view', {
		page_location: `${window.location.origin}${pathname}`,
		page_path: pathname,
	})
	loadMetaPixel()('track', 'PageView')
}

export function disableAnalytics() {
	consented = false
	lastPath = undefined
	gtag('consent', 'update', {
		ad_storage: 'denied',
		analytics_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
	})
	clearAnalyticsCookies()
}

type ToolEvent = 'tool_start' | 'tool_complete' | 'newsletter_signup'

// GA4 keeps these names; Meta gets its standard events where one fits.
const META_EVENT: Record<ToolEvent, [method: 'track' | 'trackCustom', name: string]> = {
	tool_start: ['trackCustom', 'ToolStart'],
	tool_complete: ['track', 'Lead'],
	newsletter_signup: ['track', 'CompleteRegistration'],
}

/**
 * One step of a tool, only with consent. `tool` is the form key: 'pme', 'rgpc'
 * or 'funding'.
 *
 * Returns the id the Pixel event was sent with, or nothing without consent.
 * The submission hands that id to website-api, which sends the same event to
 * the Conversions API; Meta counts a name and id pair once, so the server copy
 * only adds the events an ad blocker stopped here.
 */
export function trackTool(event: ToolEvent, tool: string): MetaEvent | undefined {
	if (!consented) return undefined
	gtag('event', event, { tool })
	const [method, name] = META_EVENT[event]
	const id = crypto.randomUUID()
	loadMetaPixel()(method, name, { tool }, { eventID: id })
	return { name, id }
}

export interface MetaEvent {
	name: string
	id: string
}

/** The value of one first-party cookie, if set. */
function cookie(name: string): string | undefined {
	const entry = document.cookie.split('; ').find((part) => part.startsWith(`${name}=`))
	return entry?.slice(name.length + 1)
}

/**
 * What website-api needs to send `events` to the Conversions API: the ids, the
 * page and the two cookies the Pixel set to recognise this browser. No name,
 * email or answer. Undefined when there is nothing to send, which is always the
 * case without consent, because trackTool returned no ids.
 */
export function metaContext(events: (MetaEvent | undefined)[]) {
	const sent = events.filter((event): event is MetaEvent => event !== undefined)
	if (!consented || sent.length === 0) return undefined
	return {
		events: sent,
		url: `${window.location.origin}${window.location.pathname}`,
		fbp: cookie('_fbp'),
		fbc: cookie('_fbc'),
	}
}
