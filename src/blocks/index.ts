import type { Block } from 'payload'
import { parseActivityEmbed } from '../lib/activityEmbed'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Tip', value: 'tip' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
      ],
    },
    { name: 'title', type: 'text' },
    { name: 'body', type: 'textarea', required: true },
  ],
}

export const CodeBlock: Block = {
  slug: 'code',
  labels: { singular: 'Code', plural: 'Code Blocks' },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'yaml',
      options: [
        { label: 'YAML', value: 'yaml' },
        { label: 'JSON', value: 'json' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
        { label: 'Bash', value: 'bash' },
        { label: 'Jinja', value: 'jinja' },
        { label: 'Plain', value: 'plaintext' },
      ],
    },
    { name: 'filename', type: 'text' },
    { name: 'code', type: 'code', required: true },
  ],
}

// Plotly figure JSON exported by the fitness-data repo (`make charts`, then `make copy CHART=<name>`).
export const ChartBlock: Block = {
  slug: 'chart',
  labels: { singular: 'Chart', plural: 'Charts' },
  fields: [
    {
      name: 'figure',
      type: 'code',
      required: true,
      label: 'Figure JSON',
      admin: {
        language: 'json',
        description: 'Paste a Plotly figure exported by `make charts` (must contain "data" and "layout").',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value.trim()) return 'Paste the figure JSON.'
        try {
          const fig = JSON.parse(value)
          if (!fig || !Array.isArray(fig.data)) return 'Not a Plotly figure: missing "data" array.'
        } catch {
          return 'Invalid JSON.'
        }
        return true
      },
    },
    { name: 'caption', type: 'text' },
  ],
}

// A pre-styled HTML <table> exported alongside the charts (`splits-table.html`).
export const TableBlock: Block = {
  slug: 'dataTable',
  labels: { singular: 'Table', plural: 'Tables' },
  fields: [
    {
      name: 'html',
      type: 'code',
      required: true,
      label: 'Table HTML',
      admin: { language: 'html', description: 'Paste the <table> HTML exported by `make charts`.' },
      validate: (value: unknown) =>
        typeof value === 'string' && /<table[\s>]/i.test(value) ? true : 'Paste a <table>...</table> element.',
    },
    { name: 'caption', type: 'text' },
  ],
}

// A responsive grid of images (1 column on mobile).
export const ImageGridBlock: Block = {
  slug: 'imageGrid',
  labels: { singular: 'Image Grid', plural: 'Image Grids' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      required: true,
      defaultValue: '2',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

// An image next to a block of text, stacked on mobile.
export const SideBySideBlock: Block = {
  slug: 'sideBySide',
  labels: { singular: 'Side by Side', plural: 'Side by Side' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image on left', value: 'left' },
        { label: 'Image on right', value: 'right' },
      ],
    },
    { name: 'text', type: 'richText', required: true },
  ],
}

// A Garmin Connect or Strava activity (route map and stats), pasted from the activity's embed/share dialog.
export const ActivityEmbedBlock: Block = {
  slug: 'activityEmbed',
  labels: { singular: 'Activity Embed', plural: 'Activity Embeds' },
  fields: [
    {
      name: 'embed',
      type: 'textarea',
      required: true,
      label: 'Embed code or link',
      admin: {
        description:
          'Garmin Connect: Share, then Embed, then paste the iframe. Strava: Share, then Embed on your site, then paste the snippet. The activity must be public.',
      },
      validate: (value: unknown) =>
        parseActivityEmbed(value) ? true : 'Paste a Garmin Connect or Strava activity embed code or link.',
    },
    { name: 'caption', type: 'text' },
  ],
}

export const inlineBlocks = [CalloutBlock, CodeBlock, ChartBlock, TableBlock, ImageGridBlock, SideBySideBlock, ActivityEmbedBlock]
