import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { mediaUrl } from '../lib/media'
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
