import Link from 'next/link'
import type { ReactNode } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import DatePresenter from './DatePresenter'
import TagsPresenter from './TagsPresenter'
import { converters } from './richTextConverters'
import { toCardPost } from '../lib/posts'
import { mediaUrl } from '../lib/media'
import type { Media, Post } from '../payload-types'

// The article layout, shared by the public page and the admin draft preview.
export default function ArticleView({ post, banner }: { post: Post; banner?: ReactNode }) {
  const card = toCardPost(post, 'large')
  const fi = post.featuredImage as Media | number | null | undefined
  const heroUrl = fi && typeof fi === 'object' ? mediaUrl(fi, 'large') : null

  return (
    <section className="mx-auto max-w-4xl mt-40 px-4 xl:px-0 mb-20">
      <div className="post py-8">
        {banner}
        {heroUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroUrl}
            alt={card.featuredImage?.alt ?? post.title}
            className="w-full h-72 object-cover rounded-xl mb-8"
          />
        )}
        <div className="flex items-center gap-3">
          <DatePresenter date={card.date} />
          {card.category && (
            <Link
              href={`/categories/${card.category.slug}`}
              className="text-xs font-semibold uppercase tracking-wide bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition-colors"
            >
              {card.category.title}
            </Link>
          )}
        </div>
        <h2 className="text-4xl font-bold mt-1">{post.title}</h2>
        <TagsPresenter tags={card.tags} />
        {post.content && (
          <div className="prose prose-lg max-w-none text-gray-600 mt-8">
            <RichText data={post.content as any} converters={converters} />
          </div>
        )}
        <div className="pt-8 mt-8 border-t border-gray-300">
          <Link href="/articles" className="font-bold uppercase hover:text-gray-500">
            Back to Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
