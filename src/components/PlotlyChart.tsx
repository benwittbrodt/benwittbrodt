'use client'

import { useEffect, useRef, useState } from 'react'

type Figure = { data: unknown[]; layout?: Record<string, any> }

// Renders a Plotly figure exported by the fitness-data repo. plotly.js (~1 MB) is only downloaded
// once the chart is within ~400px of the viewport, so posts without charts never pay for it.
export default function PlotlyChart({ figure }: { figure: Figure }) {
  const ref = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const height = Number(figure.layout?.height) || 480

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    let plotly: any

    const render = async () => {
      try {
        const mod: any = await import('plotly.js-basic-dist-min')
        plotly = mod.default ?? mod
        if (cancelled) return
        el.style.minHeight = ''
        await plotly.newPlot(
          el,
          figure.data,
          { ...figure.layout, autosize: true },
          { responsive: true, displayModeBar: false },
        )
      } catch (err) {
        console.error('chart failed to render', err)
        if (!cancelled) setFailed(true)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        void render()
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
      if (plotly && el) plotly.purge(el)
    }
  }, [figure])

  return failed ? (
    <p className="text-sm text-gray-500">This chart failed to load.</p>
  ) : (
    <div ref={ref} style={{ minHeight: height }} />
  )
}
