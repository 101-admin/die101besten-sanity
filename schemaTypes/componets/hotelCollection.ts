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
      name: 'collectionVariant',
      type: 'string',
      title: 'Collection Variant',
      description: 'Variant for this collection (e.g., "Featured", "Luxury", "New")',
      options: {
        list: [
          {title: 'Special Edition', value: 'special-edition'},
          {title: 'All Hotels', value: 'all-hotels'},
        ],
      },
    }),
  ],
})
