import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'utr',
  type: 'document',
  title: 'Utr',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Main Title',
      description: 'This main title is set under the hero section',
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
      name: 'subTitle',
      type: 'string',
      title: 'Section Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
  ],
})
