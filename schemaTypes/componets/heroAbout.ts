import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroAbout',
  type: 'document',
  title: 'Hero About',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Hero Title',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'Section ID',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Hero Subtitle',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
