// Translate Strapi blocks rich-text JSON into Payload Lexical JSON.
// Mirrors block/inline coverage from the old src/lib/strapi-blocks.ts in the
// Astro repo: paragraph, heading, list (ordered/unordered), quote, code, image,
// and inline text (bold/italic/underline/strikethrough/code) + link.

export type StrapiNode = {
  type: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: StrapiNode[]
  format?: 'ordered' | 'unordered'
  level?: number
  image?: { url: string; alternativeText?: string | null; width?: number; height?: number }
}

// Lexical text format bitmask
const FMT_BOLD = 1
const FMT_ITALIC = 1 << 1
const FMT_STRIKE = 1 << 2
const FMT_UNDERLINE = 1 << 3
const FMT_CODE = 1 << 4

function textFormat(n: StrapiNode): number {
  let f = 0
  if (n.bold) f |= FMT_BOLD
  if (n.italic) f |= FMT_ITALIC
  if (n.strikethrough) f |= FMT_STRIKE
  if (n.underline) f |= FMT_UNDERLINE
  if (n.code) f |= FMT_CODE
  return f
}

function renderInline(n: StrapiNode): any[] {
  if (n.type === 'text') {
    return [{
      type: 'text',
      text: n.text ?? '',
      format: textFormat(n),
      mode: 'normal',
      style: '',
      detail: 0,
      version: 1,
    }]
  }
  if (n.type === 'link') {
    return [{
      type: 'link',
      version: 3,
      format: '',
      indent: 0,
      direction: 'ltr',
      fields: { url: n.url ?? '#', newTab: true, linkType: 'custom' },
      children: (n.children ?? []).flatMap(renderInline),
    }]
  }
  return (n.children ?? []).flatMap(renderInline)
}

function paragraph(children: any[]): any {
  return { type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', textFormat: 0, textStyle: '', children }
}

function renderBlock(b: StrapiNode): any | null {
  switch (b.type) {
    case 'paragraph': {
      const kids = (b.children ?? []).flatMap(renderInline)
      return paragraph(kids)
    }
    case 'heading': {
      const level = b.level ?? 2
      return {
        type: 'heading',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        tag: `h${level}`,
        children: (b.children ?? []).flatMap(renderInline),
      }
    }
    case 'list': {
      const ordered = b.format === 'ordered'
      const items = (b.children ?? []).map((item, idx) => ({
        type: 'listitem',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        value: idx + 1,
        children: (item.children ?? []).flatMap(renderInline),
      }))
      return {
        type: 'list',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        listType: ordered ? 'number' : 'bullet',
        start: 1,
        tag: ordered ? 'ol' : 'ul',
        children: items,
      }
    }
    case 'quote': {
      return {
        type: 'quote',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: (b.children ?? []).flatMap(renderInline),
      }
    }
    case 'code': {
      const text = (b.children ?? [])
        .map((c) => (c.type === 'text' ? c.text ?? '' : ''))
        .join('')
      return {
        type: 'code',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        language: '',
        children: text ? [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] : [],
      }
    }
    case 'image': {
      // Embedded images aren't migrated as upload-nodes (would require also
      // resolving the inline media to a Payload media id). Fall back to a
      // paragraph with a link so the URL isn't lost.
      if (!b.image) return null
      return paragraph([
        {
          type: 'link',
          version: 3,
          format: '',
          indent: 0,
          direction: 'ltr',
          fields: { url: b.image.url, newTab: true, linkType: 'custom' },
          children: [{ type: 'text', text: b.image.alternativeText || b.image.url, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        },
      ])
    }
    default:
      return null
  }
}

export function strapiBlocksToLexical(blocks: StrapiNode[] | null | undefined): any {
  const children = (blocks ?? []).map(renderBlock).filter(Boolean)
  if (children.length === 0) {
    children.push(paragraph([]))
  }
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children,
    },
  }
}
