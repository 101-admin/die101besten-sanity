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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'allBlogs',
      type: 'array',
      title: 'All Blogs',
      of: [
        {
          type: 'reference',
          to: [{type: 'blog'}],
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
