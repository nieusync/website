let lastPath: string | undefined

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

function clearAnalyticsCookies() {
	document.cookie.split(';').forEach((entry) => {
		const name = entry.trim().split('=', 1)[0]
		if (name === '_ga' || name.startsWith('_ga_')) {
			document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
		}
	})
}

export function enableAnalytics(pathname: string) {
	gtag('consent', 'update', { analytics_storage: 'granted' })
	if (lastPath === pathname) return
	lastPath = pathname
	gtag('event', 'page_view', {
		page_location: `${window.location.origin}${pathname}`,
		page_path: pathname,
	})
}

export function disableAnalytics() {
	lastPath = undefined
	gtag('consent', 'update', {
		ad_storage: 'denied',
		analytics_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
	})
	clearAnalyticsCookies()
}
