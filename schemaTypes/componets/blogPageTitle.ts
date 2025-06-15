import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPageTitle',
  type: 'document',
  title: 'Blog Page Title',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
  ],
})
