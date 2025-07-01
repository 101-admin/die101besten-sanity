import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'allHotelsSlider',
  type: 'document',
  title: 'All Hotels Slider',
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
                  options: {
                    hotspot: true,
                  },
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
                      description:
                        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
                    },
                    {
                      name: 'link',
                      type: 'string',
                      title: 'Slug',
                      description:
                        'give the root of the hotel page you want to link to for example if you want to link to /hotels/slugOfTheHotel',
                    },
                    {
                      name: 'linkText',
                      type: 'string',
                      title: 'Link Text',
                    },
                    {
                      name: 'textColor',
                      type: 'string',
                      title: 'Text Color',
                      options: {
                        list: [
                          {title: 'White', value: 'white'},
                          {title: 'Black', value: 'black'},
                        ],
                      },
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
