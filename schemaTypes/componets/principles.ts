import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'principles',
  type: 'document',
  title: 'Principles',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
    }),

    defineField({
      name: 'subTitle',
      type: 'string',
      title: 'Sub Title',
    }),

    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    defineField({
      name: 'principlesSection',
      type: 'array',
      title: 'Principles Section',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
        },
      ],
    }),
  ],
})
