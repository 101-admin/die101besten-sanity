import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'werde101',
  type: 'document',
  title: 'Werde 101',
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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
        }),
      ],
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
  ],
})
