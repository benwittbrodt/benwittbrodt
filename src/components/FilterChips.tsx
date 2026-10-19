import Link from 'next/link'
import type { FilterOption } from '../lib/filters'

const MAX_TAGS = 12

const chip = 'inline-flex items-center rounded-full px-3 py-1 transition-colors'
const active = 'bg-blue-700 text-white'
const idle = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

// Category and tag filters as plain links to the existing category/tag pages (works without JavaScript).
export default function FilterChips({
  categories,
  tags,
  activeCategory,
  activeTag,
}: {
  categories: FilterOption[]
  tags: FilterOption[]
  activeCategory?: string
  activeTag?: string
}) {
  if (categories.length === 0 && tags.length === 0) return null

  // Keep the active tag visible even when it isn't one of the most used.
  const shownTags = tags.slice(0, MAX_TAGS)
  const current = tags.find((t) => t.slug === activeTag)
  if (current && !shownTags.includes(current)) shownTags.push(current)

  return (
    <nav aria-label="Filter posts" className="mb-8 space-y-3">
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <Link
            href="/posts"
            aria-current={!activeCategory && !activeTag ? 'page' : undefined}
            className={`${chip} ${!activeCategory && !activeTag ? active : idle}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              aria-current={activeCategory === c.slug ? 'page' : undefined}
              className={`${chip} ${activeCategory === c.slug ? active : idle}`}
            >
              {c.title} <span className="ml-1.5 opacity-60 font-normal">{c.count}</span>
            </Link>
          ))}
        </div>
      )}
      {shownTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="text-gray-400 uppercase tracking-wide mr-1">Tags</span>
          {shownTags.map((t) => (
            <Link
              key={t.slug}
              href={`/tags/${t.slug}`}
              aria-current={activeTag === t.slug ? 'page' : undefined}
              className={`${chip} ${activeTag === t.slug ? active : idle}`}
            >
              {t.title}
            </Link>
          ))}
          {tags.length > shownTags.length && (
            <Link href="/tags" className="text-gray-500 hover:text-gray-800 underline ml-1">
              All tags
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
