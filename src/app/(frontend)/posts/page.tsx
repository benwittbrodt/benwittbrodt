import PostsList from '../../../components/PostsList'
import { getPayload } from '../../../lib/payload'
import { toCardPost, publishedFilter } from '../../../lib/posts'

export const metadata = { title: 'Posts' }
export const revalidate = 60

const PAGE_SIZE = 3

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const sp = await searchParams
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

  const payload = await getPayload()
  const res = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    sort: '-updatedAt',
    page,
    limit: PAGE_SIZE,
    depth: 2,
  })
  const posts = res.docs.map((p) => toCardPost(p, 'medium'))

  return (
    <PostsList
      posts={posts}
      page={page}
      totalPages={res.totalPages}
      totalCount={res.totalDocs}
      basePath="/posts"
    />
  )
}
