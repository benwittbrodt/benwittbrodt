import type { FieldHook } from 'payload'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function slugFrom(sourceField: string): FieldHook {
  return ({ value, data, operation }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    if (operation === 'create' || operation === 'update') {
      const source = data?.[sourceField]
      if (typeof source === 'string' && source.length > 0) return slugify(source)
    }
    return value
  }
}
