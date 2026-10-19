import Link from 'next/link'
import Image from 'next/image'
import DatePresenter from '../../components/DatePresenter'
import SocialLinks from '../../components/SocialLinks'
import { getPayload } from '../../lib/payload'
import { toCardPost, publishedFilter } from '../../lib/posts'
import { mediaUrl } from '../../lib/media'
import type { Media } from '../../payload-types'

export const metadata = { title: 'Home' }
export const revalidate = 60

const DEFAULT_INTRO =
  "This site is an effort to document and write more of what's going on in my life. Topics could span from technology projects, running, home improvement, or anything that has a rabbit hole you can dive down."

// Photo and intro come from the "Home" global in the admin. Any failure (empty global, table not created yet)
// falls back to the built-in defaults so the home page never breaks.
async function getHero() {
  try {
    const payload = await getPayload()
    const home = await payload.findGlobal({ slug: 'home', depth: 1 })
    const media = home.headshot && typeof home.headshot === 'object' ? (home.headshot as Media) : null
    const url = media ? mediaUrl(media, 'small') : null
    return {
      intro: home.intro?.trim() || DEFAULT_INTRO,
      photo: media && url ? { url, alt: media.alt || 'Ben Wittbrodt', x: media.focalX ?? 50, y: media.focalY ?? 50 } : null,
    }
  } catch {
    return { intro: DEFAULT_INTRO, photo: null }
  }
}

// Flip to true to surface the "What I write about" category grid below the hero.
const SHOW_TOPICS_SECTION = false

export default async function HomePage() {
  const payload = await getPayload()
  const hero = await getHero()
  const postsRes = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    sort: '-updatedAt',
    limit: 3,
    depth: 2,
  })
  const recentPosts = postsRes.docs.map((p) => toCardPost(p, 'medium'))
  const categories = SHOW_TOPICS_SECTION
    ? (await payload.find({ collection: 'categories', sort: 'title', limit: 20 })).docs
    : []

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 xl:px-0 pt-36 pb-20 flex flex-col sm:flex-row items-center gap-10">
        {hero.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.photo.url}
            alt={hero.photo.alt}
            width={224}
            height={224}
            className="w-56 h-56 rounded-2xl object-cover shadow-md shrink-0"
            style={{ objectPosition: `${hero.photo.x}% ${hero.photo.y}%` }}
          />
        ) : (
          <Image
            src="/headshot.jpg"
            alt="Ben Wittbrodt"
            width={224}
            height={224}
            priority
            className="w-56 h-56 rounded-2xl object-cover shadow-md shrink-0"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">
            Hi, I&apos;m <span className="text-blue-700">Ben Wittbrodt</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg leading-relaxed">
            {hero.intro}
          </p>
          <div className="flex gap-3 mt-6">
            <Link
              href="/posts"
              className="rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Read posts
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 hover:border-blue-700 text-gray-700 text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Get in touch
            </Link>
          </div>
          <SocialLinks className="mt-6" />
        </div>
      </section>

      {/* What I write about — gated by SHOW_TOPICS_SECTION above */}
      {SHOW_TOPICS_SECTION && categories.length > 0 && (
        <section className="bg-gray-50 py-16 px-4 xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">What I write about</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-blue-200 group"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-blue-700 transition-colors">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent posts */}
      <section className="mx-auto max-w-5xl px-4 xl:px-0 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent posts</h2>
          <Link href="/posts" className="text-sm text-blue-700 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500 mb-4">No posts yet, but more coming soon.</p>
            <div className="flex justify-center gap-3 text-sm">
              <Link href="/background" className="text-blue-700 hover:underline">
                Read my background
              </Link>
              <span className="text-gray-300">·</span>
              <Link href="/contact" className="text-blue-700 hover:underline">
                Say hi
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
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
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {post.category && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-blue-700 text-white rounded-md px-2 py-0.5">
                        {post.category.title}
                      </span>
                    )}
                    <p className="text-xs text-gray-400">
                      <DatePresenter date={post.date} />
                    </p>
                  </div>
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
