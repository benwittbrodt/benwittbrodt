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

export const inlineBlocks = [CalloutBlock, CodeBlock]
