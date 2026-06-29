import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import DatePresenter from '../../../../components/DatePresenter'
import TagsPresenter from '../../../../components/TagsPresenter'
import { getPayload } from '../../../../lib/payload'
import { toCardPost, publishedFilter } from '../../../../lib/posts'
import { mediaUrl } from '../../../../lib/media'
import type { Media } from '../../../../payload-types'

type Params = { slug: string }

async function getPost(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { ...publishedFilter, slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    limit: 1000,
    select: { slug: true },
  })
  return docs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return { title: post.title }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const card = toCardPost(post, 'large')
  const fi = post.featuredImage as Media | number | null | undefined
  const heroUrl = fi && typeof fi === 'object' ? mediaUrl(fi, 'large') : null

  return (
    <section className="mx-auto max-w-3xl mt-40 px-4 xl:px-0 mb-20">
      <div className="post py-8">
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
            <RichText data={post.content as any} />
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
