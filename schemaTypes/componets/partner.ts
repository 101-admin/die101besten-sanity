import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  type: 'document',
  title: 'Partner',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'partners',
      type: 'array',
      title: 'Exclusive Partners',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                }),
              ],
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Link',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'premiumPartners',
      type: 'array',
      title: 'Premium Partners',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                }),
              ],
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Link',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'otherPartners',
      type: 'array',
      title: 'Basic Partners',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                }),
              ],
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Link',
            }),
          ],
        },
      ],
    }),
  ],
})
