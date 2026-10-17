import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugFrom } from '../hooks/slugify'
import { inlineBlocks } from '../blocks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    // "Preview" button in the editor: renders the latest saved draft (login required).
    preview: (doc) => (doc?.slug ? `/preview/${doc.slug}` : null),
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
      hooks: {
        // Stamp the publish time the first time a post is published, unless one was set by hand.
        beforeChange: [
          ({ value, siblingData }) =>
            !value && siblingData?._status === 'published' ? new Date().toISOString() : value,
        ],
      },
    },
    {
      name: 'previewText',
      type: 'textarea',
      admin: { description: 'Shown on listing cards. If blank, the first paragraph is used.' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({
            collections: {
              media: {
                fields: [
                  { name: 'caption', type: 'text' },
                  {
                    name: 'size',
                    type: 'select',
                    defaultValue: 'medium',
                    admin: { description: 'How wide the image appears in the post.' },
                    options: [
                      { label: 'Small', value: 'small' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'Large', value: 'large' },
                      { label: 'Full width', value: 'full' },
                    ],
                  },
                  {
                    name: 'alignment',
                    type: 'select',
                    defaultValue: 'center',
                    options: [
                      { label: 'Left', value: 'left' },
                      { label: 'Center', value: 'center' },
                      { label: 'Right', value: 'right' },
                      { label: 'Full width', value: 'full' },
                    ],
                  },
                ],
              },
            },
          }),
          BlocksFeature({ blocks: inlineBlocks }),
        ],
      }),
    },
  ],
}
