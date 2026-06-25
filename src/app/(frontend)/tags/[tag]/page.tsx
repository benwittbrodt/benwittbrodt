import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostsList from '../../../../components/PostsList'
import { getPayload } from '../../../../lib/payload'
import { toCardPost } from '../../../../lib/posts'

const PAGE_SIZE = 10

type Params = { tag: string }

async function findTag(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'tags', limit: 1000, select: { slug: true } })
  return docs.map((t) => ({ tag: t.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { tag } = await params
  const t = await findTag(tag)
  return { title: t ? `Tag: ${t.title}` : 'Tag' }
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<{ page?: string }>
}) {
  const [{ tag: slug }, sp] = await Promise.all([params, searchParams])
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

  const tag = await findTag(slug)
  if (!tag) notFound()

  const payload = await getPayload()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    where: { tags: { contains: tag.id } },
    page,
    limit: PAGE_SIZE,
    depth: 2,
  })

  return (
    <PostsList
      posts={res.docs.map((p) => toCardPost(p, 'medium'))}
      page={page}
      totalPages={res.totalPages}
      totalCount={res.totalDocs}
      basePath={`/tags/${slug}`}
      heading={{ kind: 'tag', label: tag.title }}
    />
  )
}
