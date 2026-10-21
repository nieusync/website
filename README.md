# nieusync-website

Public marketing site for Nieusync. React, TypeScript, Vite and Tailwind.

## Commands

```sh
pnpm dev
pnpm lint && pnpm typecheck && pnpm check && pnpm build
```

Use pnpm only. Pushes to `main` deploy to GitHub Pages.

## Environment

`VITE_APP_URL` optionally overrides the client-area URL. Its default is `https://portal.nieusync.com`.

`VITE_API_URL` optionally overrides the public forms API URL. Its default is `https://website-api.nieusync.com`.
