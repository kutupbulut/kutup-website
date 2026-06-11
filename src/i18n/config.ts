// Locale registry and routing helpers. To add a language: append it to
// LOCALES, add labels below, and create src/i18n/<locale>.ts — every page
// picks it up automatically via getStaticLocalePaths().

export const LOCALES = ['en', 'tr'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

/** Native-language names, used in the language switcher's aria labels. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
}

/** BCP 47 / Open Graph locale tags. */
export const LOCALE_TAGS: Record<Locale, { html: string; og: string }> = {
  en: { html: 'en', og: 'en_US' },
  tr: { html: 'tr', og: 'tr_TR' },
}

/**
 * getStaticPaths() entries for the [...locale] pages: the default locale
 * lives at the site root, every other locale under /<locale>/.
 */
export function getStaticLocalePaths() {
  return LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
  }))
}

export function localeFromParam(param: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(param ?? '')
    ? (param as Locale)
    : DEFAULT_LOCALE
}

/** Prefix an internal path for a locale: '/features' → '/tr/features'. */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}/` : `/${locale}${path}`
}

/** The same page in another locale — for the switcher and hreflang links. */
export function switchLocalePath(pathname: string, to: Locale): string {
  let base = pathname
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (base === `/${locale}` || base === `/${locale}/`) {
      base = '/'
      break
    }
    if (base.startsWith(`/${locale}/`)) {
      base = base.slice(locale.length + 1)
      break
    }
  }
  return localePath(to, base)
}

/** Interpolate {name} placeholders in a dictionary string. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''))
}
