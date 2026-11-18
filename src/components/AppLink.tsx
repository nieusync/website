import { useEffect } from 'react';
import { useLang } from '../i18n';

/** The client area, which is a separate app on its own domain.
 *
 *  It used to be a mock page on this site. Now it is `portal.nieusync.com`, and
 *  the site no longer links to it anywhere: the nav button and the footer link
 *  are gone. Only the redirect below remains, for old links.
 *
 *  It answered on `app.nieusync.com` until 2026-08-31, when the portal moved to
 *  Praxis. That name still resolves and is the one in the wild, so keep this in
 *  step with whatever Traefik actually routes.
 */
const APP_URL = import.meta.env.VITE_APP_URL || 'https://portal.nieusync.com';

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
