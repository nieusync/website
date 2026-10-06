/**
 * The site's own back end, on `website-api.nieusync.com`
 * ([`nieusync/website-api`](https://github.com/nieusync/website-api)).
 *
 * Not `api.nieusync.com`: that is Praxis, the product the firm runs its
 * business on, and a public form has no business writing to the database the
 * clients and invoices live in. This one exists for the two things a static
 * site on GitHub Pages cannot do for itself, sending an email and keeping a
 * row, and it holds nothing else.
 *
 * `VITE_API_URL` points a dev build at a local instance. An empty string means
 * same origin, which only happens behind a dev proxy.
 */
export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://website-api.nieusync.com';

/**
 * POSTs a form and refuses anything but a 200.
 *
 * The API answers a refusal with `{ error }` carrying the sentence to show the
 * visitor, already in Portuguese, so that is what comes back here. Anything
 * else is ours to fix rather than theirs to read, and the caller shows its own
 * copy instead.
 */
export async function post(path: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // `website` is the honeypot the API checks: always empty from a real form.
    body: JSON.stringify({ website: '', ...body }),
  });
  if (res.ok) return;

  const message = await res
    .json()
    .then((data: { error?: unknown }) => (typeof data.error === 'string' ? data.error : undefined))
    .catch(() => undefined);
  throw new Error(message ?? `${path} responded ${res.status}`);
}
