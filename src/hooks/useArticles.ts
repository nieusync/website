import { useEffect, useState } from 'react'
import { useLang, type Lang } from '../i18n'

// The blog is two Ghost instances, one per language, behind one hostname. They
// share nothing: separate databases, separate members, separate content keys.
// A reader is only ever sent to the one matching the language they are reading,
// which is why every consumer of these takes a `lang` rather than a constant.
export const BLOG_URL: Record<Lang, string> = {
  pt: 'https://blog.nieusync.com/pt',
  en: 'https://blog.nieusync.com/en',
}

// Ghost content keys are read-only and meant to ship in client bundles, so both
// of these are already public in the blogs' own HTML.
const CONTENT_KEY: Record<Lang, string> = {
  pt: 'd4368c66622175e9eeef35d000',
  en: 'b6105ecad266c0e5ef9298f5e1',
}

/** The blog in the language the reader is currently in. */
export function useBlogUrl(): string {
  return BLOG_URL[useLang()]
}

export interface Article {
  id: string
  title: string
  url: string
  excerpt: string
  category: string
  readTime: number
  publishedAt: string
  image?: string
}

interface GhostPost {
  id: string
  title: string
  url: string
  excerpt: string | null
  custom_excerpt: string | null
  feature_image: string | null
  reading_time: number
  published_at: string
  primary_tag: { name: string } | null
  tags?: { name: string }[]
}

const toArticle = (p: GhostPost): Article => ({
  id: p.id,
  title: p.title,
  url: p.url,
  excerpt: p.custom_excerpt ?? p.excerpt ?? '',
  category: p.primary_tag?.name ?? p.tags?.[0]?.name ?? '',
  // Ghost reports 0 (or nothing at all) for anything under ~30s of reading
  readTime: Math.max(1, p.reading_time || 1),
  publishedAt: p.published_at,
  image: p.feature_image ?? undefined,
})

export function useArticles(limit = 3) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const lang = useLang()

  useEffect(() => {
    // No `fields=` filter: it strips Ghost's computed reading_time/primary_tag.
    const url = `${BLOG_URL[lang]}/ghost/api/content/posts/?key=${CONTENT_KEY[lang]}&limit=${limit}&include=tags`
    fetch(url)
      .then((r) => r.json())
      .then((data) => setArticles((data.posts ?? []).map(toArticle)))
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [limit, lang])

  return { articles, loading }
}
