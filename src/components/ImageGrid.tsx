'use client'

import { useCallback, useEffect, useState } from 'react'

export type GridImage = {
  src: string
  full: string
  alt: string
  caption?: string
  focalX: number
  focalY: number
}

const gridCols: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

// Square, focal-point-cropped tiles; clicking one opens a lightbox over every image in the grid.
export default function ImageGrid({ images, columns }: { images: GridImage[]; columns: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const count = images.length

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, step])

  const current = open === null ? null : images[open]

  return (
    <>
      <div className={`grid grid-cols-1 gap-4 my-8 ${gridCols[columns] ?? gridCols['2']}`}>
        {images.map((img, i) => (
          <figure key={i}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View larger: ${img.alt || img.caption || `image ${i + 1}`}`}
              className="block w-full cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="rounded-lg w-full aspect-square object-cover"
                style={{ objectPosition: `${img.focalX}% ${img.focalY}%` }}
              />
            </button>
            {img.caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-5 text-white text-4xl leading-none"
            onClick={() => setOpen(null)}
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
      )}
    </>
  )
}
