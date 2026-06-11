import en from './en'
import tr from './tr'
import type { Locale } from './config'

/** The dictionary shape — English is the source of truth. */
export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, tr }

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en
}
