import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dieBesten',
  type: 'document',
  title: 'Die Besten',
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
      name: 'bestenSection',
      type: 'array',
      title: 'Besten Section',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'percentage',
              type: 'number',
              title: 'Percentage',
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
          ],
        },
      ],
    }),
  ],
})
