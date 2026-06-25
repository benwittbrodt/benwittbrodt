import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text' },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'small', width: 800, height: undefined, position: 'centre' },
      { name: 'medium', width: 1200, height: undefined, position: 'centre' },
      { name: 'large', width: 1920, height: undefined, position: 'centre' },
    ],
  },
}
