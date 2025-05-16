import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'specialHotels',
  type: 'document',
  title: 'Special Hotels',
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
      name: 'hotels',
      type: 'array',
      title: 'Hotels',
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
              name: 'name',
              type: 'string',
              title: 'Name',
            }),
          ],
        },
      ],
    }),
  ],
})
