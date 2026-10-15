import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from '../../../../lib/payload'
import ArticleView from '../../../../components/ArticleView'
import { publishedFilter } from '../../../../lib/posts'

export const revalidate = 60

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

  return <ArticleView post={post} />
}
