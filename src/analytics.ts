const MEASUREMENT_ID = 'G-7MRR3GZPDS'

let enabled = false
let configured = false
let loading: Promise<void> | undefined
let lastPath: string | undefined
let pendingPath: string | undefined

type Gtag = (...args: unknown[]) => void

type AnalyticsWindow = Window & {
	dataLayer?: unknown[]
	gtag?: Gtag
}

function gtag(...args: unknown[]) {
	const analyticsWindow = window as AnalyticsWindow
	analyticsWindow.dataLayer ??= []
	analyticsWindow.gtag ??= (...values: unknown[]) => analyticsWindow.dataLayer?.push(values)
	analyticsWindow.gtag(...args)
}

function sendPageView(pathname: string) {
	if (!enabled || !configured || lastPath === pathname) return
	lastPath = pathname
	gtag('event', 'page_view', {
		page_location: `${window.location.origin}${pathname}`,
		page_path: pathname,
	})
}

function load() {
	if (loading) return loading

	loading = new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.async = true
		script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
		script.dataset.analytics = 'google'
		script.onload = () => {
			if (!enabled) return resolve()
			configured = true
			gtag('js', new Date())
			gtag('config', MEASUREMENT_ID, { send_page_view: false })
			if (pendingPath) sendPageView(pendingPath)
			resolve()
		}
		script.onerror = () => {
			loading = undefined
			reject(new Error('Google Analytics failed to load'))
		}
		document.head.appendChild(script)
	})

	return loading
}

export function enableAnalytics(pathname: string) {
	enabled = true
	pendingPath = pathname
	if (configured) {
		sendPageView(pathname)
		return
	}
	void load().catch(() => undefined)
}

export function disableAnalytics() {
	enabled = false
	configured = false
	loading = undefined
	lastPath = undefined
	pendingPath = undefined
	document.querySelectorAll('script[data-analytics="google"]').forEach((script) => script.remove())
	const analyticsWindow = window as AnalyticsWindow
	delete analyticsWindow.gtag
	delete analyticsWindow.dataLayer
	document.cookie.split(';').forEach((entry) => {
		const name = entry.trim().split('=', 1)[0]
		if (name === '_ga' || name.startsWith('_ga_')) {
			document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
		}
	})
}
