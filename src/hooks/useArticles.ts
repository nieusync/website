import { useEffect, useState } from 'react'

// The blog lives on Ghost at blog.nieusync.com; this site only previews it.
export const BLOG_URL = 'https://blog.nieusync.com'

// Ghost content keys are read-only and meant to ship in client bundles — this
// same key is already public in the blog's own HTML.
const CONTENT_KEY = 'd4368c66622175e9eeef35d000'

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

  useEffect(() => {
    // No `fields=` filter: it strips Ghost's computed reading_time/primary_tag.
    const url = `${BLOG_URL}/ghost/api/content/posts/?key=${CONTENT_KEY}&limit=${limit}&include=tags`
    fetch(url)
      .then((r) => r.json())
      .then((data) => setArticles((data.posts ?? []).map(toArticle)))
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [limit])

  return { articles, loading }
}
