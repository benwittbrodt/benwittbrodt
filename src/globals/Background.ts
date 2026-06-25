import type { GlobalConfig } from 'payload'

export const Background: GlobalConfig = {
  slug: 'background',
  access: { read: () => true },
  fields: [
    { name: 'professionalSummary', type: 'richText' },
    {
      name: 'experience',
      type: 'array',
      labels: { singular: 'Experience', plural: 'Experience' },
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'companyLogo', type: 'upload', relationTo: 'media' },
        {
          name: 'roles',
          type: 'array',
          fields: [
            { name: 'jobTitle', type: 'text', required: true },
            { name: 'jobDescription', type: 'richText' },
            {
              name: 'startDate',
              type: 'date',
              required: true,
              admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' } },
            },
            {
              name: 'endDate',
              type: 'date',
              admin: {
                description: 'Leave blank for current role.',
                date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' },
              },
            },
          ],
        },
      ],
    },
  ],
}
