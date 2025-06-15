import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageQuote',
  title: 'Image Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Person Name',
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
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description of the image for accessibility purposes',
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'post',
      type: 'string',
      title: 'Post in Compony',
    }),
  ],
})
