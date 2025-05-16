import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hotelmomente',
  type: 'document',
  title: 'Hotelmomente',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
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
      name: 'slider',
      type: 'array',
      title: 'Slider',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'catogory',
              type: 'string',
              title: 'Catogory',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
            {
              name: 'ctaButton',
              type: 'object',
              title: 'CTA Button',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Button Text',
                },
                {
                  name: 'link',
                  type: 'string',
                  title: 'Button Link',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'link',
          type: 'string',
          title: 'Button Link',
        },
      ],
    }),
  ],
})
