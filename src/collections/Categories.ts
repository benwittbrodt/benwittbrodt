import type { CollectionConfig } from 'payload'
import { slugFrom } from '../hooks/slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFrom('title')] },
      admin: { description: 'Auto-generated from title if left blank.' },
    },
  ],
}
