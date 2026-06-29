import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostsList from '../../../../components/PostsList'
import { getPayload } from '../../../../lib/payload'
import { toCardPost, publishedFilter } from '../../../../lib/posts'

const PAGE_SIZE = 10

type Params = { category: string }

async function findCategory(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'categories', limit: 1000, select: { slug: true } })
  return docs.map((c) => ({ category: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { category } = await params
  const cat = await findCategory(category)
  return { title: cat ? `Category: ${cat.title}` : 'Category' }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<{ page?: string }>
}) {
  const [{ category: slug }, sp] = await Promise.all([params, searchParams])
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

  const cat = await findCategory(slug)
  if (!cat) notFound()

  const payload = await getPayload()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    where: { ...publishedFilter, category: { equals: cat.id } },
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
      basePath={`/categories/${slug}`}
      heading={{ kind: 'category', label: cat.title }}
    />
  )
}
