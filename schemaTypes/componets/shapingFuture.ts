import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'shapingFuture',
  type: 'document',
  title: 'Shaping Future',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
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
      name: 'image',
      type: 'image',
      title: 'Image',
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button',
      fields: [
        defineField({
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
        }),
        defineField({
          name: 'buttonLink',
          type: 'string',
          title: 'Button Link',
        }),
      ],
    }),
  ],
})
