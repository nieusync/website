import { useLang, type Lang } from '../i18n'

// The blog is two Ghost instances, one per language, behind one hostname. They
// share nothing, including member lists, so readers must stay on their current
// language's instance.
export const BLOG_URL: Record<Lang, string> = {
  pt: 'https://blog.nieusync.com/pt',
  en: 'https://blog.nieusync.com/en',
}

/** The blog in the language the reader is currently in. */
export function useBlogUrl(): string {
  return BLOG_URL[useLang()]
}
