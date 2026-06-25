'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navigation = [
  { href: '/', title: 'Home' },
  { href: '/articles', title: 'Articles' },
  { href: '/background', title: 'Background' },
  { href: '/contact', title: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return
      const target = e.target as Node
      if (navRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('click', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const firstSeg = pathname.split('/')[1] ?? ''

  function isActive(href: string) {
    if (href === '/') return firstSeg === ''
    return href.includes(firstSeg) || (firstSeg === 'posts' && href === '/articles')
  }

  return (
    <header className="fixed bg-white top-0 left-0 w-full z-40 border-t-[14px] border-blue-600">
      <nav className="container mx-auto flex flex-wrap items-center justify-between py-6 px-4 xl:px-0">
        <div className="h-12">
          <Link href="/">
            <Image src="/website_logo.svg" alt="logo" width={120} height={48} priority className="w-auto h-12" />
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            ref={buttonRef}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <ul
          ref={navRef}
          className={`${open ? '' : 'hidden'} uppercase tracking-wide font-bold w-full grow-0 lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0`}
        >
          {navigation.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className={`hover:text-gray-500 ${isActive(nav.href) ? 'text-blue-700' : ''}`}
              >
                {nav.title}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/benwittbrodt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6 mt-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="nonzero"
                  d="M10 0c1.814 0 3.487.435 5.02 1.306a9.827 9.827 0 0 1 3.639 3.542A9.33 9.33 0 0 1 20 9.734c0 2.121-.636 4.03-1.908 5.723a9.783 9.783 0 0 1-4.928 3.518c-.234.042-.408.012-.52-.09a.49.49 0 0 1-.17-.38l.006-.969c.005-.621.007-1.19.007-1.705 0-.82-.226-1.42-.677-1.8.495-.05.94-.126 1.335-.228a5.4 5.4 0 0 0 1.223-.494 3.62 3.62 0 0 0 1.055-.843c.282-.334.512-.777.69-1.33.178-.554.267-1.19.267-1.909a3.7 3.7 0 0 0-1.028-2.61c.32-.77.286-1.631-.105-2.586-.243-.076-.594-.03-1.054.14-.46.168-.86.354-1.198.557l-.495.304a9.478 9.478 0 0 0-2.5-.33c-.86 0-1.693.11-2.5.33-.103-.07-.288-.184-.553-.342a8.16 8.16 0 0 0-1.088-.488c-.494-.19-.863-.247-1.106-.171-.391.955-.426 1.816-.105 2.585A3.7 3.7 0 0 0 3.62 9.227c0 .719.089 1.352.267 1.902.178.549.406.993.683 1.33.278.339.627.622 1.048.85a5.4 5.4 0 0 0 1.224.494c.395.102.84.178 1.335.228-.338.305-.551.74-.638 1.306a2.631 2.631 0 0 1-.586.19 3.782 3.782 0 0 1-.742.063c-.287 0-.57-.09-.853-.272a2.256 2.256 0 0 1-.723-.792 2.068 2.068 0 0 0-.631-.66c-.256-.168-.471-.27-.645-.304l-.26-.038c-.182 0-.308.02-.378.057-.07.038-.09.087-.065.146.026.06.065.118.117.178.053.059.109.11.17.152l.09.063c.192.085.38.245.567.482.187.236.324.452.41.646l.13.292c.113.32.304.58.574.78.269.198.56.325.872.38.312.054.614.084.905.088.29.004.532-.01.723-.044l.299-.05c0 .32.002.694.007 1.12l.006.692a.49.49 0 0 1-.17.38c-.112.101-.286.13-.52.089a9.783 9.783 0 0 1-4.928-3.518C.636 13.763 0 11.855 0 9.734a9.33 9.33 0 0 1 1.341-4.886 9.827 9.827 0 0 1 3.64-3.542C6.512.436 8.185 0 10 0z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
