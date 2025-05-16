import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'specialEditionHero',
  type: 'document',
  title: 'Special Edition Hero',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Internal title for this slider',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'allHotelsSection',
      type: 'object',
      title: 'All Hotels Section',
      fields: [
        defineField({
          name: 'imageGallery',
          type: 'object',
          title: 'Image Gallery Button',
          description: 'PREMIUM to GRAND - Click opens image gallery with all images of that hotel',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Gallery Button',
            },
            {
              name: 'images',
              type: 'array',
              title: 'Gallery Images',
              of: [
                {
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                    {
                      name: 'link',
                      type: 'string',
                      title: 'Link',
                    },
                    {
                      name: 'linkText',
                      type: 'string',
                      title: 'Link Text',
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'allHotelsSection.imageGallery.enabled',
    },
  },
})
