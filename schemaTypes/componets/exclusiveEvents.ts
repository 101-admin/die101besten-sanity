import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'exclusiveEvents',
  type: 'document',
  title: 'Exclusive Events',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
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
      name: 'events',
      type: 'array',
      title: 'Events',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Event Name',
            },
            {
              name: 'date',
              type: 'date',
              title: 'Event Date',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Event Image',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Event Teaser Text',
            },
            {
              name: 'link',
              type: 'string',
              title: 'Event Link',
            },
          ],
        },
      ],
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
        defineField({
          name: 'link',
          type: 'string',
          title: 'Button Link',
        }),
      ],
    }),
  ],
})
