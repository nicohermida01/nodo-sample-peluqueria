/** Absolute http(s) links open in a new tab (WhatsApp, booking system, Maps, Instagram). */
export const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

export function externalAttrs(href: string): { target?: '_blank'; rel?: string } {
  return isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

/** Active state for nav items, ignoring hash links to sections of the home page. */
export function isCurrent(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  const clean = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  const target = clean(href);
  const current = clean(pathname);
  return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`);
}
