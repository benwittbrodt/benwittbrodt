import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { mediaUrl } from '../lib/media'
import PlotlyChart from './PlotlyChart'
import type { Media } from '../payload-types'

const alignmentClass: Record<string, string> = {
  left: 'float-left mr-6 mb-4 max-w-sm',
  right: 'float-right ml-6 mb-4 max-w-sm',
  center: 'mx-auto my-6',
  full: 'w-full my-6',
}

const calloutStyles: Record<string, string> = {
  info: 'border-blue-500 bg-blue-50 text-blue-900',
  tip: 'border-emerald-500 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-500 bg-amber-50 text-amber-900',
  success: 'border-green-500 bg-green-50 text-green-900',
}

const gridCols: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  upload: ({ node }: { node: any }) => {
    const value = node.value as Media | number | null | undefined
    const media = typeof value === 'object' ? value : null
    if (!media) return null
    const url = mediaUrl(media, 'large')
    if (!url) return null
    const fields = (node.fields ?? {}) as { caption?: string; alignment?: string }
    const wrapClass = alignmentClass[fields.alignment ?? 'center'] ?? alignmentClass.center
    return (
      <figure className={`not-prose ${wrapClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={media.alt ?? fields.caption ?? ''} className="rounded-lg w-full h-auto" />
        {fields.caption && (
          <figcaption className="text-sm text-gray-500 mt-2 text-center">{fields.caption}</figcaption>
        )}
      </figure>
    )
  },

  blocks: {
    imageGrid: ({ node }: { node: any }) => {
      const { columns = '2', images = [] } = node.fields as {
        columns?: string
        images?: { image: Media | number | null; caption?: string }[]
      }
      const items = images.flatMap((item) => {
        const media = typeof item.image === 'object' ? item.image : null
        const url = media ? mediaUrl(media, 'large') : null
        return media && url ? [{ media, url, caption: item.caption }] : []
      })
      if (!items.length) return null
      return (
        <div className={`not-prose grid grid-cols-1 gap-4 my-8 ${gridCols[columns] ?? gridCols['2']}`}>
          {items.map(({ media, url, caption }, i) => (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={media.alt ?? caption ?? ''}
                className="rounded-lg w-full aspect-[4/3] object-cover"
                style={{ objectPosition: `${media.focalX ?? 50}% ${media.focalY ?? 50}%` }}
              />
              {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
            </figure>
          ))}
        </div>
      )
    },

    sideBySide: ({ node }: { node: any }) => {
      const { image, caption, imageSide = 'left', text } = node.fields as {
        image?: Media | number | null
        caption?: string
        imageSide?: string
        text?: any
      }
      const media = typeof image === 'object' ? image : null
      const url = media ? mediaUrl(media, 'large') : null
      if (!media || !url) return null
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-8">
          <figure className={`not-prose ${imageSide === 'right' ? 'md:order-2' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={media.alt ?? caption ?? ''} className="rounded-lg w-full h-auto" />
            {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
          </figure>
          <div>{text && <RichText data={text} />}</div>
        </div>
      )
    },

    callout: ({ node }: { node: any }) => {
      const { variant = 'info', title, body } = node.fields as {
        variant?: string
        title?: string
        body?: string
      }
      const style = calloutStyles[variant] ?? calloutStyles.info
      return (
        <aside className={`not-prose border-l-4 rounded-r-md p-4 my-6 ${style}`}>
          {title && <div className="font-semibold mb-1">{title}</div>}
          {body && <p className="whitespace-pre-wrap m-0">{body}</p>}
        </aside>
      )
    },

    chart: ({ node }: { node: any }) => {
      const { figure, caption } = node.fields as { figure?: string; caption?: string }
      let fig: { data: unknown[]; layout?: Record<string, any> } | null = null
      try {
        fig = figure ? JSON.parse(figure) : null
      } catch {
        fig = null
      }
      if (!fig || !Array.isArray(fig.data)) return null
      const title = String(fig.layout?.title?.text ?? caption ?? 'Chart')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      return (
        <figure className="not-prose my-8" role="img" aria-label={title}>
          <PlotlyChart figure={fig} />
          {caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>
          )}
        </figure>
      )
    },

    dataTable: ({ node }: { node: any }) => {
      const { html, caption } = node.fields as { html?: string; caption?: string }
      if (!html) return null
      return (
        <figure className="not-prose my-8">
          {/* Authored in the admin by the site owner; the exporter escapes all cell text. */}
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
          {caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>
          )}
        </figure>
      )
    },

    code: ({ node }: { node: any }) => {
      const { language = 'plaintext', filename, code } = node.fields as {
        language?: string
        filename?: string
        code?: string
      }
      return (
        <figure className="not-prose my-6">
          {filename && (
            <div className="text-xs font-mono text-gray-400 mb-1">{filename}</div>
          )}
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </figure>
      )
    },
  },
})
