import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: '404 Page Not Found' }

export default function NotFound() {
  return (
    <main>
      <section className="mx-auto max-w-3xl py-16 mt-24 px-4 xl:px-0">
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <div className="mt-12">
          <Image src="/404.svg" alt="404" width={500} height={300} className="w-full h-auto" />
        </div>
        <div className="mt-12">
          <Link
            href="/"
            className="bg-blue-700 hover:bg-blue-900 focus:bg-blue-900 text-white text-sm font-semibold tracking-wide uppercase shadow-sm rounded-sm cursor-pointer px-6 py-3"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  )
}
