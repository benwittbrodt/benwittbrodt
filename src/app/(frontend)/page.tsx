import Link from 'next/link'
import Image from 'next/image'
import DatePresenter from '../../components/DatePresenter'
import { getPayload } from '../../lib/payload'
import { toCardPost } from '../../lib/posts'

export const metadata = { title: 'Home' }

export default async function HomePage() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 3,
    depth: 2,
  })
  const recentPosts = docs.map((p) => toCardPost(p, 'medium'))

  return (
    <main>
      <section className="mx-auto max-w-3xl px-4 xl:px-0 pt-36 pb-20 flex flex-col sm:flex-row items-center gap-10">
        <Image
          src="/headshot.jpg"
          alt="Ben Wittbrodt"
          width={224}
          height={224}
          priority
          className="w-56 h-56 rounded-2xl object-cover shadow-md shrink-0"
        />
        <div>
          <h1 className="text-4xl font-bold">
            Hey, I&apos;m <span className="text-blue-700">Ben Wittbrodt</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg leading-relaxed">
            I write about personal finance, watches, and home automation — the things I spend too much
            time thinking about.
          </p>
          <div className="flex gap-3 mt-6">
            <Link
              href="/articles"
              className="rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Read articles
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 hover:border-blue-700 text-gray-700 text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 xl:px-0 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent articles</h2>
          <Link href="/articles" className="text-sm text-blue-700 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-gray-500">No articles yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:border-blue-700 transition-colors"
              >
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100" />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-1">
                    <DatePresenter date={post.date} />
                  </p>
                  <h3 className="font-semibold group-hover:text-blue-700 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">{post.summary}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
