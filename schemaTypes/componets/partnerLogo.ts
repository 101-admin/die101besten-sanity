import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partnerLogo',
  type: 'document',
  title: 'Partner Logo',
  fields: [
    defineField({
      name: 'brandName',
      type: 'string',
      title: 'Brand Name',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'Section ID',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'logoSlider',
      type: 'array',
      title: 'Logo Slider',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Logo',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                },
              ],
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'isAnimated',
      type: 'boolean',
      title: 'Enable Treadmill Animation',
      description: 'Enable slow moving animation effect',
      initialValue: false,
    }),
    defineField({
      name: 'isDraggable',
      type: 'boolean',
      title: 'Enable Drag Interaction',
      description: 'Allow logo to be dragged',
      initialValue: false,
    }),
    defineField({
      name: 'editionRelated',
      type: 'reference',
      to: [{type: 'edition'}],
      title: 'Related Edition',
      description: 'Link this logo to a specific edition',
    }),
  ],
})
