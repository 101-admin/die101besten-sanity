import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageSection',
  type: 'document',
  title: 'Image Section',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      options: {
        list: [
          {title: 'Ad', value: 'Ad'},
          {title: 'Anzeige', value: 'Anzeige'},
        ],
      },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {hotspot: true},
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
