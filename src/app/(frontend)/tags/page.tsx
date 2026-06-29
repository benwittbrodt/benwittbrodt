import Link from 'next/link'
import { getPayload } from '../../../lib/payload'
import { publishedFilter } from '../../../lib/posts'

export const metadata = { title: 'Tags' }

export default async function TagsPage() {
  const payload = await getPayload()

  // Pull all posts (small site) and roll up tag counts. Cheaper than N count
  // queries while the site is small.
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    limit: 1000,
    depth: 1,
    select: { tags: true },
  })

  const counts = new Map<string, { title: string; slug: string; total: number }>()
  for (const p of posts) {
    const tags = (p.tags ?? []) as any[]
    for (const t of tags) {
      if (typeof t !== 'object' || !t) continue
      const k = t.slug
      const existing = counts.get(k)
      if (existing) existing.total++
      else counts.set(k, { title: t.title, slug: t.slug, total: 1 })
    }
  }

  const tags = [...counts.values()].sort((a, b) => b.total - a.total || a.title.localeCompare(b.title))

  return (
    <section className="mx-auto max-w-3xl w-full mt-40 px-4 xl:px-0 mb-20">
      <h2 className="text-4xl font-semibold">Tags ({tags.length})</h2>

      {tags.length === 0 ? (
        <p className="mt-8 text-gray-500">No tags yet.</p>
      ) : (
        <ul className="flex items-center flex-wrap text-sm gap-x-4 gap-y-4 mt-8">
          {tags.map((tag) => (
            <li key={tag.slug}>
              <Link
                href={`/tags/${tag.slug}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-4 py-2 transition-colors"
              >
                {tag.title} ({tag.total})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
