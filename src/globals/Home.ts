import type { GlobalConfig } from 'payload'

// The photo and intro at the top of the home page. Empty fields fall back to the built-in defaults.
export const Home: GlobalConfig = {
  slug: 'home',
  access: { read: () => true },
  fields: [
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square photos look best. Set the focal point on the image to control the crop.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'The line under "Hey, I\'m Ben Wittbrodt".' },
    },
  ],
}
