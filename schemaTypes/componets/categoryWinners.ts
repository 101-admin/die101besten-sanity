import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoryWinners',
  type: 'document',
  title: 'Category Winners',
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
      name: 'Carousel',
      type: 'array',
      title: 'Hotel Carousel',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Hotel Image',
            },
            {
              name: 'catogary',
              type: 'string',
              title: 'Catogary Name',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'isDraggable',
      type: 'boolean',
      title: 'Enable Drag Navigation',
      description: 'Allow slides to be dragged',
    }),
    defineField({
      name: 'showArrows',
      type: 'boolean',
      title: 'Show Navigation Arrows',
      description: 'Show prev/next arrows on hover',
    }),
  ],
})
