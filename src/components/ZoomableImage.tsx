'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

// A single post image that opens full screen when clicked or tapped.
export default function ZoomableImage({
  src,
  full,
  alt,
  caption,
  className,
}: {
  src: string
  full: string
  alt: string
  caption?: string
  className: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <figure className={`not-prose ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt || caption || 'image'}`}
        className="block w-full cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="rounded-lg w-full h-auto" />
      </button>
      {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
      {open && (
        <Lightbox images={[{ full, alt, caption }]} index={0} onIndexChange={() => {}} onClose={() => setOpen(false)} />
      )}
    </figure>
  )
}
