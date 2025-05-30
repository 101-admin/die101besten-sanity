import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hotelCollection',
  type: 'document',
  title: 'Hotel Collection',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Collection Title',
    }),

    defineField({
      name: 'id',
      type: 'string',
      title: 'Section ID',
    }),

    defineField({
      name: 'variant',
      type: 'string',
      title: 'Collection Variant',
      description: 'Variant for this collection (e.g., "Featured", "Luxury", "New")',
      initialValue: 'classic',
      options: {
        list: [
          {title: 'Special Edition Hotels', value: 'special'},
          {title: 'Classic Hotels', value: 'classic'},
        ],
      },
    }),
  ],
})
