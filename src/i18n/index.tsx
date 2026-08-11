import { createContext, useContext, type ReactNode } from 'react';
import en from './en';
import pt from './pt';

const dicts = { en, pt };
export type Lang = keyof typeof dicts;

const STORAGE_KEY = 'nieusync_lang';

/**
 * Which language to send someone to when the URL doesn't say — only `/` and the
 * pre-split `/demo/*` links, since every real page now carries its language in
 * the path. The saved value is a convenience for return visits, not the source
 * of truth: once you are on a page the URL decides, so a shared link always
 * reads in the language it was shared in.
 */
export function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    // Safari in private mode throws on localStorage; the default is fine.
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function remember(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // As above: not worth breaking navigation over.
  }
}

const I18nContext = createContext<Lang>('pt');

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
}

export function useLang(): Lang {
  return useContext(I18nContext);
}

// Returns a namespace of the active dictionary. Typed off the English dictionary,
// so a key missing from pt/ is a compile error rather than a runtime blank.
export function useT<K extends keyof typeof en>(ns: K): (typeof en)[K] {
  return dicts[useContext(I18nContext)][ns];
}
