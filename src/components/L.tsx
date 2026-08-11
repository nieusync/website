import { Link, type LinkProps } from 'react-router-dom';
import { useLang } from '../i18n';
import { href, type RouteKey } from '../routes';

type Props = Omit<LinkProps, 'to'> & { to: RouteKey; param?: string };

/**
 * A `<Link>` that names a page rather than a path, so it resolves to the
 * reader's current language. Following a link must never change language —
 * only the switch in the header does that — and routing every internal link
 * through here is what guarantees it.
 */
export default function L({ to, param, ...rest }: Props) {
  return <Link to={href(useLang(), to, param)} {...rest} />;
}

/** The same resolution for the handful of places that need a bare string. */
export function useHref() {
  const lang = useLang();
  return (to: RouteKey, param?: string) => href(lang, to, param);
}
