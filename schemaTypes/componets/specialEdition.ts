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
          type: 'reference',
          to: [{type: 'hotel'}],
        },
      ],
    }),
  ],
})
