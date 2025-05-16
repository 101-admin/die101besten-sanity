import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'businessLeisure',
  type: 'document',
  title: 'Business Leisure',
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
      name: 'image',
      type: 'image',
      title: 'bachground Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description of the image for accessibility purposes',
        }),
      ],
    }),
    defineField({
      name: 'ctaButtons',
      type: 'array',
      title: 'CTA Buttons',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'link',
              type: 'string',
              title: 'Button Link',
            },
          ],
        },
      ],
    }),
  ],
})
