import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogCollection',
  type: 'document',
  title: 'Blog Collection',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Collection Title',
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
  ],
})
