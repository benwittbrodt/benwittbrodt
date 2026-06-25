import Link from 'next/link'

export default function TagsPresenter({
  tags,
}: {
  tags: Array<{ title: string; slug: string }>
}) {
  if (!tags || tags.length === 0) return null
  return (
    <div className="flex items-center flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tags/${tag.slug}`}
          className="text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors"
        >
          {tag.title}
        </Link>
      ))}
    </div>
  )
}
