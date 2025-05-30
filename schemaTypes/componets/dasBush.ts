import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'dasBush',
  type: 'document',
  title: 'Das Bush',
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
      name: 'id',
      type: 'string',
      title: 'Section ID',
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      title: 'Image Position',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
    }),

    defineField({
      name: 'bgColor',
      type: 'string',
      title: 'Background Color',
      options: {
        list: [
          {title: 'Grey', value: 'grey'},
          {title: 'White', value: 'white'},
        ],
      },
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
          name: 'text',
          type: 'string',
          title: 'Button Text',
        }),
        defineField({
          name: 'link',
          type: 'string',
          title: 'Button Link',
        }),
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
