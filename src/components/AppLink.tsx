import { useEffect, type AnchorHTMLAttributes } from 'react';
import { useLang } from '../i18n';

/** The client area, which is a separate app on its own domain.
 *
 *  It used to be a mock page on this site. Now it is `app.nieusync.com`, so
 *  this is an `<a>` and not an `<L>`: react-router cannot route out of the
 *  bundle, and a `<Link>` here would push a path this site has no route for.
 */
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.nieusync.com';

/** Carries the reader's language across the domain boundary.
 *
 *  The portal names its language in the URL (`/pt`, `/en`), so somebody reading
 *  the site in English lands on the English portal instead of on Portuguese and
 *  a second language switch. It is only the first hop: once they sign in, their
 *  own account preference takes over.
 */
export default function AppLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={`${APP_URL}/${useLang()}`} {...props} />;
}

/** The old on-site client area, which is now a redirect out.
 *
 *  The route is kept rather than deleted: `/pt/area-de-cliente` is indexed and
 *  `/demo/client-area` is still in the wild through `LEGACY_ROUTES`, and both
 *  should reach the real portal rather than the catch-all. `replace` so the
 *  back button returns to the site instead of bouncing straight out again.
 */
export function ClientAreaRedirect() {
  const lang = useLang();
  useEffect(() => {
    window.location.replace(`${APP_URL}/${lang}`);
  }, [lang]);
  return null;
}
