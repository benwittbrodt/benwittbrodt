'use client'

import { useCallback, useEffect } from 'react'

export type LightboxImage = { full: string; alt: string; caption?: string }

// Full-screen image viewer. Closes on Esc / backdrop / ×, steps with arrow keys or the side buttons.
export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[]
  index: number
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const count = images.length
  const step = useCallback((d: number) => onIndexChange((index + d + count) % count), [index, count, onIndexChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && count > 1) step(1)
      else if (e.key === 'ArrowLeft' && count > 1) step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [count, step, onClose])

  const current = images[index]
  if (!current) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute top-4 right-5 text-white text-4xl leading-none"
        onClick={onClose}
      >
        ×
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 text-white text-5xl px-2"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 sm:right-6 text-white text-5xl px-2"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
          >
            ›
          </button>
        </>
      )}
      <figure className="max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.full} alt={current.alt} className="max-w-full max-h-[85vh] object-contain" />
        {current.caption && <figcaption className="text-sm text-gray-300 mt-3">{current.caption}</figcaption>}
      </figure>
    </div>
  )
}
