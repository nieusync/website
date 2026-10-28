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

/** One step of a tool, only with consent. `tool` is the form key: 'pme', 'rgpc' or 'funding'. */
export function trackTool(event: ToolEvent, tool: string) {
	if (!consented) return
	gtag('event', event, { tool })
	const [method, name] = META_EVENT[event]
	loadMetaPixel()(method, name, { tool })
}
