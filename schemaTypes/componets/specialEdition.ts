import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'specialEdition',
  type: 'document',
  title: 'Special Edition',
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
      name: 'specialEditionHotels',
      type: 'array',
      title: 'Special Edition Hotels',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name:"title",
              type:"string",
              title:"Title",
            }),
            defineField({
              name:"image",
              type:"image",
              title:"Image",
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
              name:"link",
              type:"string",
              title:"Link",
            }),
          ],
        },
      ],
    }),
  ],
})
