import type { Media } from '../payload-types'

export type SizeKey = 'thumbnail' | 'small' | 'medium' | 'large'
export type ImageSize = SizeKey | 'original'

const FALLBACK: SizeKey[] = ['large', 'medium', 'small', 'thumbnail']

// Pick a sized variant url, falling back to smaller sizes then the original.
export function mediaUrl(
  media: Media | string | null | undefined,
  size: ImageSize = 'medium',
): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  const order: SizeKey[] =
    size === 'original' ? FALLBACK : [size, ...FALLBACK.filter((s) => s !== size)]
  for (const s of order) {
    const url = media.sizes?.[s]?.url
    if (url) return url
  }
  return media.url ?? null
}

export function mediaAlt(media: Media | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'string') return fallback
  return media.alt || fallback
}

export function mediaDims(media: Media | null | undefined, size: ImageSize = 'medium') {
  if (!media || typeof media === 'string') return null
  if (size !== 'original') {
    const variant = media.sizes?.[size]
    if (variant?.width && variant?.height) return { width: variant.width, height: variant.height }
  }
  if (media.width && media.height) return { width: media.width, height: media.height }
  return null
}
