import { getPayload } from './payload'
import { publishedFilter } from './posts'
import type { Category, Tag } from '../payload-types'

export type FilterOption = { title: string; slug: string; count: number }

// Categories and tags that have at least one published post, most used first, for the list-page filter chips.
export async function getFilterOptions(): Promise<{ categories: FilterOption[]; tags: FilterOption[] }> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    limit: 1000,
    depth: 1,
    select: { category: true, tags: true },
  })

  const cats = new Map<string, FilterOption>()
  const tags = new Map<string, FilterOption>()
  const bump = (map: Map<string, FilterOption>, item: Category | Tag | number | null | undefined) => {
    if (!item || typeof item !== 'object') return
    const entry = map.get(item.slug) ?? { title: item.title, slug: item.slug, count: 0 }
    entry.count += 1
    map.set(item.slug, entry)
  }
  for (const post of docs) {
    bump(cats, post.category as Category | number | null | undefined)
    for (const t of (post.tags ?? []) as Array<Tag | number>) bump(tags, t)
  }

  const byUse = (a: FilterOption, b: FilterOption) => b.count - a.count || a.title.localeCompare(b.title)
  return { categories: [...cats.values()].sort(byUse), tags: [...tags.values()].sort(byUse) }
}
