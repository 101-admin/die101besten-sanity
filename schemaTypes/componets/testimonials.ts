import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  type: 'document',
  title: 'Testimonials',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slider',
      type: 'array',
      title: 'Slider',
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
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Alternative text for screen readers and SEO',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                  description: 'Caption displayed below the image',
                },
              ],
            }),
            defineField({
              name: 'review',
              type: 'text',
              title: 'Review',
              description:
                'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
            }),
            defineField({
              name: 'author',
              type: 'string',
              title: 'Author',
            }),
          ],
        },
      ],
    }),
  ],
})
