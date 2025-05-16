import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageTitle',
  type: 'document',
  title: 'Page Title',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
  ],
})
