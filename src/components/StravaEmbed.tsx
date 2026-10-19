'use client'

import { useEffect, useRef } from 'react'

const SCRIPT_ID = 'strava-embed-script'
const SCRIPT_SRC = 'https://strava-embeds.com/embed.js'

type StravaWindow = Window & { __STRAVA_EMBED_BOOTSTRAP__?: () => void }

// Strava's official embed script swaps a placeholder div for its iframe. The placeholder is created by hand
// (not by React) so React never tries to manage the node the script replaces.
export default function StravaEmbed({ id }: { id: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const placeholder = document.createElement('div')
    placeholder.className = 'strava-embed-placeholder'
    placeholder.dataset.embedType = 'activity'
    placeholder.dataset.embedId = id
    placeholder.dataset.style = 'standard'
    el.replaceChildren(placeholder)

    const w = window as StravaWindow
    if (w.__STRAVA_EMBED_BOOTSTRAP__) {
      w.__STRAVA_EMBED_BOOTSTRAP__()
    } else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script) // runs the bootstrap itself once loaded
    } else {
      // Script tag exists but is still loading: bootstrap again when it finishes.
      document.getElementById(SCRIPT_ID)?.addEventListener('load', () => w.__STRAVA_EMBED_BOOTSTRAP__?.(), { once: true })
    }
    return () => el.replaceChildren()
  }, [id])

  return <div ref={host} className="w-full max-w-[554px] mx-auto min-h-[120px]" />
}
