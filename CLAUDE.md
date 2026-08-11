# nieusync-website

Marketing site for Nieusync. React 18 + TypeScript + Vite, deployed to GitHub Pages on push to `main`.

## Commands

```bash
pnpm dev          # local dev server
pnpm typecheck    # tsc --noEmit (CI gate)
pnpm check        # check:i18n (en/pt parity) + check:routes (slug table)
pnpm build        # vite build (CI gate)
pnpm lint
```

Package manager is **pnpm** — never `npm` or `yarn`. CI runs `typecheck && check:i18n && build`; run all of those plus `check:routes` before saying a change is done.

## Layout

```
src/
  App.tsx        two locale subtrees, /pt/* and /en/*, built from routes.ts
  routes.ts      the slug table: every page's URL segment per language
  i18n/          en/ and pt/ dictionaries, one file per page namespace
  pages/         one file per route, lazy-loaded from App.tsx
  components/    Navbar, Footer, LegalPage, GlobalComponents
  hooks/         useArticles (Ghost content API), useScrollReveal
scripts/         check-i18n.ts, check-routes.ts
```

## Rules

**No hardcoded user-facing text.** Every string lives in `src/i18n/en/<ns>.ts` and `src/i18n/pt/<ns>.ts`, read via `useT('<ns>')`. Adding a key to `en` without `pt` is a typecheck error; a differing array length is a `check:i18n` error. Both languages, same PR, always.

**Styling is Tailwind.** Brand tokens live in `tailwind.config.js` — `bg-blue`, `text-purple`, `bg-bg`, `bg-grad-main`, `font-display` (Magistral), `animate-float`. Use those, not raw hex. Repeated patterns (`.card`, `.btn-gradient`, `.badge`, `.container`, `.section-label`) are component classes in `src/index.css` under `@layer components`, so utilities always override them — `className="card p-0"` works.

Inline `style={{}}` is allowed only for values JS computes at runtime (scroll progress width, orbit transforms, a colour from a data map). Mark those with a `ponytail:` comment. Everything static is a class.

Responsive is mobile-first Tailwind (`md:`, `lg:`); use `max-[480px]:` only where an existing desktop-first breakpoint must be preserved. Never add a `<style>` block to a component — keyframes go in `tailwind.config.js`, global rules in `src/index.css`.

Two conflicting utilities of the same type in one `className` (e.g. `text-sm` and `text-[13px]`) resolve by CSS order, not by string order — split shared class constants so each call site sets the size itself.

**Routing is locale-first.** Every page lives under `/pt/…` or `/en/…`, with translated slugs (`/pt/quem-somos`, `/en/who-we-are`). `src/routes.ts` is the only place a slug is written: the router builds both subtrees from it, links resolve through it, and the language switch reverses it. New page: add a key to `ROUTES` in both languages, `lazy()` it in `App.tsx`, add one `<Route>` line inside the map.

**Never write a path literal.** Internal links use `<L to="whoWeAre">` (`src/components/L.tsx`), which resolves against the reader's current language, or `useHref()` where a string is needed. A hardcoded `/pt/...` silently strands English readers.

The language in the URL is the source of truth — `I18nProvider` is fed by the route, not by state. `localStorage` only decides where `/` sends a first-time visitor. If a route moves, add the old path to `LEGACY_ROUTES` in `routes.ts`; the pre-split `/demo/*` URLs are already there. Deep links work on Pages via the `404.html` copy in CI; don't remove that step.

**The blog is two Ghost instances**, `blog.nieusync.com/pt` and `/en` (one theme, in [`nieusync/blog`](https://github.com/nieusync/blog)). They share nothing: separate databases, separate members, separate content API keys. Always link to the one matching the reader's language via `useBlogUrl()` — this matters most in `Forms.tsx`, where posting a subscription to the wrong instance does not fail, it just files an English reader on the Portuguese list. The content keys are read-only and meant to ship in the bundle. No secrets in this repo.

The blog's `locales/*.json` builds the same links from its own header using `path.*` keys. Those must match `ROUTES` exactly, or the blog's nav 404s.

**Icons:** [Phosphor](https://phosphoricons.com/) (`@phosphor-icons/react`) only.

## Style

- Simplest thing that works. No abstraction until there's a second caller.
- `// ponytail:` comments mark deliberate simplifications and their upgrade path — read them before "fixing" the code they sit on.
- Never commit unless explicitly asked. Conventional Commits, one-line subject: `feat(landing): add hero video`. Trailer `Assisted-by: Claude <noreply@anthropic.com>` for agent work. Never `Co-Authored-By`, never "Generated with Claude".
- Common scopes: `landing`, `blog`, `legal`, `i18n`, `site`, `ci`.

## Git workflow

**Never push to `main`.** Push to `main` deploys straight to production (`.github/workflows`). Every change goes through a pull request:

```bash
git checkout -b feat/short-description   # branch off main
# ... commit ...
git push -u origin feat/short-description
gh pr create --fill
```

If you find yourself on `main` with uncommitted work, branch first, then commit. Let CI (`typecheck`, `check:i18n`, `build`) go green before asking for a review or merge — merging is the human's call, not the agent's.
