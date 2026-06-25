import Link from 'next/link'
import DatePresenter from './DatePresenter'
import TagsPresenter from './TagsPresenter'
import type { CardPost } from '../lib/posts'

type Props = {
  posts: CardPost[]
  page: number
  totalPages: number
  totalCount: number
  basePath: string // e.g. "/articles", "/tags/python", "/categories/lifestyle"
  heading?: { kind: 'tag' | 'category'; label: string } | null
}

export default function PostsList({ posts, page, totalPages, totalCount, basePath, heading }: Props) {
  const prevHref = page > 1 ? hrefFor(basePath, page - 1) : null
  const nextHref = page < totalPages ? hrefFor(basePath, page + 1) : null

  return (
    <section className="mx-auto max-w-3xl w-full mt-40 px-4 xl:px-0 mb-20">
      {heading?.kind === 'tag' && (
        <h2 className="text-4xl font-bold mb-6">
          Tag: {heading.label} ({totalCount})
        </h2>
      )}
      {heading?.kind === 'category' && (
        <h2 className="text-4xl font-bold mb-6">
          Category: {heading.label} ({totalCount})
        </h2>
      )}

      <div className="posts divide-y divide-gray-200">
        {posts.length === 0 && (
          <p className="text-gray-500 py-8">No articles yet — check back soon.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="post py-8">
            {post.featuredImage && (
              <Link href={`/articles/${post.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="w-full h-56 object-cover rounded-lg mb-5"
                />
              </Link>
            )}
            <div className="flex items-center gap-3">
              <DatePresenter date={post.date} />
              {post.category && (
                <Link
                  href={`/categories/${post.category.slug}`}
                  className="text-xs font-semibold uppercase tracking-wide bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition-colors"
                >
                  {post.category.title}
                </Link>
              )}
            </div>
            <h2 className="text-3xl font-bold mt-1">
              <Link href={`/articles/${post.slug}`} className="hover:text-gray-500">
                {post.title}
              </Link>
            </h2>

            <TagsPresenter tags={post.tags} />

            {post.summary && <p className="line-clamp-3 text-gray-600 mt-4">{post.summary}</p>}

            <div className="mt-4">
              <Link href={`/articles/${post.slug}`} className="font-bold uppercase hover:text-gray-500">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination flex justify-between text-base items-center border-t border-gray-200 pt-8">
          {prevHref ? (
            <Link href={prevHref} className="hover:text-gray-500">
              ← Prev
            </Link>
          ) : (
            <button className="opacity-50" disabled>← Prev</button>
          )}
          <div>
            Page {page} of {totalPages}
          </div>
          {nextHref ? (
            <Link href={nextHref} className="hover:text-gray-500">
              Next →
            </Link>
          ) : (
            <button className="opacity-50" disabled>Next →</button>
          )}
        </div>
      )}
    </section>
  )
}

function hrefFor(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}?page=${page}`
}
