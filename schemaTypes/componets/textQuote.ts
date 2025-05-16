import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textQuote',
  type: 'document',
  title: 'Text Quote',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
    }),
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
