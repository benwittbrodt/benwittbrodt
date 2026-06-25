import type { CollectionConfig } from 'payload'
import { slugFrom } from '../hooks/slugify'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFrom('title')] },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'previewText',
      type: 'textarea',
      admin: { description: 'Shown on listing cards. If blank, the first paragraph is used.' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'content', type: 'richText' },
  ],
}
