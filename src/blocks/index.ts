import type { Block } from 'payload'

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

export const inlineBlocks = [CalloutBlock, CodeBlock, ChartBlock, TableBlock]
