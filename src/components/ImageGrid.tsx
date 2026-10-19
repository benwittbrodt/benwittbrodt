'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

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

      {open !== null && <Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
