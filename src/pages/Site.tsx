import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { useT } from "../i18n";
import { useParallax } from "../hooks/useParallax";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
	Nav,
	Footer,
	PILLAR_ICONS,
} from "../components/SiteChrome";
import { ClientAreaShot } from "../components/ClientAreaShot";
import { NewsletterForm } from "../components/Forms";

function Orbit() {
	const t = useT("site");

	return (
		<div
			aria-hidden="true"
			className="relative hidden h-[360px] w-[360px] shrink-0 lg:block"
		>
			<div className="absolute inset-0 rounded-full border border-white/[0.06]" />
			<div className="absolute inset-10 rounded-full border border-white/[0.09]" />
			<div className="absolute inset-20 rounded-full border border-purple/20" />

			{/* Symbol only: the wordmark would not read at this size inside the rings.
          Centring lives on the wrapper: animate-pulse-soft sets `transform`, which
          would otherwise replace the -translate-x/y that centres the image. */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<img
					src="/assets/logo_s_w_nbg.png"
					alt=""
					className="w-40 animate-pulse-soft"
				/>
			</div>

			{/* The layer spins; each node counter-spins so its icon stays upright */}
			<div className="absolute inset-0 animate-spin-slow [animation-duration:60s]">
				{t.pillars.items.map((p, i) => {
					const Icon = PILLAR_ICONS[i];
					const angle = ((i * 72 - 90) * Math.PI) / 180;
					return (
						<div
							key={p.slug}
							className="absolute left-1/2 top-1/2"
							// ponytail: node position is computed from the pillar angle, so it stays inline
							style={{
								transform: `translate(calc(-50% + ${(Math.cos(angle) * 180).toFixed(1)}px), calc(-50% + ${(Math.sin(angle) * 230).toFixed(1)}px))`,
							}}
						>
							<div className="flex h-12 w-12 animate-spin-slow items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_0_24px_rgba(159,142,194,0.2)] backdrop-blur-sm [animation-direction:reverse] [animation-duration:60s]">
								<Icon size={22} weight="duotone" className="text-purple" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function Marquee() {
	const t = useT("site");
	const row = Array(3).fill(t.pillars.items).flat() as { name: string }[];

	return (
		<div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
			<div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
				{[0, 1].map((half) => (
					<div key={half} className="flex shrink-0 items-center">
						{row.map((p, i) => (
							<span
								key={`${half}-${i}`}
								className="flex items-center gap-8 pr-8 font-display text-xl uppercase tracking-[0.25em] text-white/20"
							>
								{p.name}
								<span className="text-sm text-purple/60">✦</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default function Site() {
	const t = useT("site");
	const { hash } = useLocation();
	useParallax();
	useScrollReveal();

	useEffect(() => {
		document.title = t.documentTitle;
	}, [t.documentTitle]);

	useEffect(() => {
		if (hash) {
			document
				.getElementById(hash.slice(1))
				?.scrollIntoView({ behavior: "smooth" });
		} else {
			window.scrollTo({ top: 0, behavior: "instant" });
		}
	}, [hash]);

	return (
		<div className="min-h-screen bg-ink text-white">
			<Nav />

			{/* ── HERO ── */}
			<section className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
				<div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
				<div
					data-parallax="0.15"
					className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue/70 blur-[150px]"
				/>
				<div
					data-parallax="0.25"
					className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-purple/30 blur-[140px]"
				/>

				<div className="container relative flex items-center justify-between gap-12">
					<div className="max-w-[760px]">
						<h1 className="animate-fade-up mb-8 text-[clamp(44px,7.5vw,96px)] leading-[1.02] [animation-delay:100ms]">
							{t.hero.titleTop}
							<br />
							<span className="animate-gradient bg-gradient-to-r from-purple via-white to-purple bg-[length:200%_auto] bg-clip-text text-transparent">
								{t.hero.titleSync}
							</span>
						</h1>

						<p className="animate-fade-up mb-10 max-w-[560px] text-[17px] leading-[1.7] text-white/85 [animation-delay:200ms]">
							{t.hero.subtitle}
						</p>

						<div className="animate-fade-up flex flex-wrap items-center gap-4 [animation-delay:300ms]">
							<Link
								to="/demo/what-we-do"
								className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-blue transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
							>
								{t.hero.ctaPillars}
								<ArrowRight size={16} weight="bold" />
							</Link>
							<Link
								to="/demo/contact"
								className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-purple hover:text-purple"
							>
								{t.hero.ctaContact}
							</Link>
						</div>
					</div>

					<Orbit />
				</div>

				{/* Scroll cue */}
				<div
					aria-hidden="true"
					className="animate-fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 [animation-delay:800ms] md:block"
				>
					<div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/25 p-1.5">
						<span className="h-2 w-[3px] animate-float rounded-full bg-white/60 [animation-duration:2s]" />
					</div>
				</div>
			</section>

			{/* ── MARQUEE ── */}
			<Marquee />

			{/* ── PILLARS ── */}
			<section id="pillars" className="relative overflow-hidden py-32">
				<div
					data-parallax="0.12"
					className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-purple/20 blur-[140px]"
				/>

				<div className="container relative">
					<div className="animate-on-scroll mb-16 max-w-[640px]">
						<span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
							{t.pillars.label}
						</span>
						<h2 className="font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
							{t.pillars.title}
						</h2>
					</div>

					<div className="animate-on-scroll border-t border-white/10">
						{t.pillars.items.map((p, i) => {
							const Icon = PILLAR_ICONS[i];
							return (
								<Link
									key={p.slug}
									to={`/demo/pillars/${p.slug}`}
									className="stagger-child group grid grid-cols-[48px_1fr] items-center gap-x-5 gap-y-3 border-b border-white/10 px-2 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[72px_64px_1fr_1.1fr_48px] md:gap-8 md:px-6 md:py-10"
								>
									<span className="hidden font-display text-sm tracking-[0.1em] text-purple/70 md:block">
										0{i + 1}
									</span>
									<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-purple/50 md:h-14 md:w-14">
										<Icon size={26} weight="duotone" className="text-purple" />
									</div>
									<h3 className="font-display text-[clamp(26px,3.5vw,44px)] leading-none text-white transition-transform duration-300 group-hover:translate-x-2">
										{p.name}
									</h3>
									<p className="col-span-2 text-[15px] leading-[1.7] text-white/80 md:col-span-1">
										{p.desc}
									</p>
									<ArrowUpRight
										size={28}
										weight="bold"
										className="hidden -translate-x-2 text-purple opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
									/>
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── NEWSLETTER / LEAD MAGNET ── */}
			<section className="pb-16">
				<div className="container">
					<div className="animate-on-scroll">
						<NewsletterForm />
					</div>
				</div>
			</section>

			{/* ── CLIENT AREA ── */}
			<section className="relative overflow-hidden py-32">
				<div
					data-parallax="0.12"
					className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-blue/60 blur-[150px]"
				/>

				<div className="container relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
					<div className="animate-on-scroll">
						<span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
							{t.portal.label}
						</span>
						<h2 className="mb-10 font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
							{t.portal.title}
						</h2>
						<Link
							to="/demo/contact"
							className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-white px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-blue transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
						>
							{t.portal.cta}
							<ArrowRight
								size={17}
								weight="bold"
								className="transition-transform duration-200 group-hover:translate-x-1"
							/>
						</Link>
					</div>

					<div className="animate-on-scroll">
						<ClientAreaShot />
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
