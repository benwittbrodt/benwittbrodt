import type { Post, Category, Tag, Media } from '../payload-types'
import { mediaUrl, mediaAlt, type ImageSize } from './media'

export type CardPost = {
  id: number | string
  slug: string
  title: string
  date: string | null
  summary: string
  category: { title: string; slug: string } | null
  tags: Array<{ title: string; slug: string }>
  featuredImage: { url: string; alt: string } | null
}

function pickSummary(post: Post): string {
  if (post.previewText) return post.previewText
  // Walk Lexical root for the first paragraph's text
  const root: any = (post.content as any)?.root
  if (!root?.children) return ''
  for (const block of root.children) {
    if (block?.type !== 'paragraph') continue
    const text = (block.children ?? [])
      .filter((c: any) => c?.type === 'text')
      .map((c: any) => c.text ?? '')
      .join('')
      .trim()
    if (text) return text.length > 200 ? text.slice(0, 200) + '…' : text
  }
  return ''
}

export function toCardPost(post: Post, imageSize: ImageSize = 'medium'): CardPost {
  const cat = post.category as Category | number | null | undefined
  const category =
    cat && typeof cat === 'object' ? { title: cat.title, slug: cat.slug } : null

  const tagList = (post.tags ?? []) as Array<Tag | number>
  const tags = tagList
    .filter((t): t is Tag => typeof t === 'object' && t !== null)
    .map((t) => ({ title: t.title, slug: t.slug }))

  const fi = post.featuredImage as Media | number | null | undefined
  const featuredImage =
    fi && typeof fi === 'object'
      ? { url: mediaUrl(fi, imageSize) ?? '', alt: mediaAlt(fi, post.title) }
      : null

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.publishedAt ?? post.createdAt ?? null,
    summary: pickSummary(post),
    category,
    tags,
    featuredImage: featuredImage && featuredImage.url ? featuredImage : null,
  }
}
