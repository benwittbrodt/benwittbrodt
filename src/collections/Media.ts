import sharp from 'sharp'
import type { CollectionConfig } from 'payload'

const MAX_EDGE = 3000

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  folders: true,
  admin: {
    defaultColumns: ['filename', 'alt', 'folder', 'createdAt'],
  },
  hooks: {
    // Phone photos carry an EXIF rotation flag that the browser honors but crop/focal-point
    // math does not. Bake the rotation into the pixels (and cap the size) before anything else sees the file.
    beforeOperation: [
      async ({ req, operation }) => {
        const file = req.file
        if (!file || (operation !== 'create' && operation !== 'update')) return
        if (file.mimetype !== 'image/jpeg') return
        const data = await sharp(file.data)
          .rotate()
          .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 88 })
          .toBuffer()
        file.data = data
        file.size = data.length
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text' },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    crop: true,
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'small', width: 800, height: undefined, position: 'centre' },
      { name: 'medium', width: 1200, height: undefined, position: 'centre' },
      { name: 'large', width: 1920, height: undefined, position: 'centre' },
    ],
  },
}
