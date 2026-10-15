import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleView from '../../../../components/ArticleView'
import { getPayload } from '../../../../lib/payload'

// Draft preview for the admin "Preview" button. Not cached, not indexed, and only visible while logged in
// to the admin (the public /articles/[slug] page shows published posts only).
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Preview', robots: { index: false, follow: false } }

type Params = { slug: string }

export default async function PreviewPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const payload = await getPayload()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) notFound()

  const { docs } = await payload.find({
    collection: 'posts',
    draft: true, // latest saved draft, even if it was never published
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const post = docs[0]
  if (!post) notFound()

  return (
    <ArticleView
      post={post}
      banner={
        <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
          Draft preview{post._status ? ` (${post._status})` : ''}. Only you can see this page.
        </div>
      }
    />
  )
}
