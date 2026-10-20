import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { disableAnalytics, enableAnalytics } from '../analytics'
import { useT } from '../i18n'
import L from './L'

type Consent = 'accepted' | 'refused'

const STORAGE_KEY = 'nieusync_analytics_consent_v1'

function readConsent(): Consent | undefined {
	try {
		const value = localStorage.getItem(STORAGE_KEY)
		return value === 'accepted' || value === 'refused' ? value : undefined
	} catch {
		return undefined
	}
}

function writeConsent(value: Consent) {
	try {
		localStorage.setItem(STORAGE_KEY, value)
	} catch {
		// Safari private mode must not prevent an explicit choice for this visit.
	}
}

export default function CookieConsent() {
	const t = useT('site').cookieConsent
	const { pathname } = useLocation()
	const [consent, setConsent] = useState<Consent | undefined>(readConsent)
	const [open, setOpen] = useState(() => readConsent() === undefined)

	useEffect(() => {
		if (consent === 'accepted') enableAnalytics(pathname)
		else disableAnalytics()
	}, [consent, pathname])

	const choose = (value: Consent) => {
		writeConsent(value)
		setConsent(value)
		setOpen(false)
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="fixed bottom-4 left-4 z-40 min-h-[44px] rounded-full border border-white/15 bg-ink/95 px-4 text-xs font-bold text-white shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white/[0.1]"
			>
				{t.settings}
			</button>

			{open && (
				<div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-white/15 bg-ink/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
					<h2 id="cookie-consent-title" className="font-display text-2xl text-white">
						{t.title}
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-white/75">
						{t.description} <L to="legal" param="cookie-policy" className="text-white underline underline-offset-4">{t.policy}</L>
					</p>
					<div className="mt-6 grid gap-3 sm:grid-cols-2">
						<button type="button" onClick={() => choose('refused')} className="min-h-[48px] rounded-full border border-white/25 bg-transparent px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.08]">
							{t.refuse}
						</button>
						<button type="button" onClick={() => choose('accepted')} className="min-h-[48px] rounded-full bg-purple px-5 text-sm font-bold text-white transition-colors hover:bg-purple/85">
							{t.accept}
						</button>
					</div>
				</div>
			)}
		</>
	)
}
