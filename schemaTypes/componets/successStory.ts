import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'successStory',
  type: 'document',
  title: 'Success Story',
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
      name: 'story',
      type: 'blockContent',
      title: 'Story',
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
      name: 'name',
      type: 'string',
      title: 'Person Name',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
  ],
})
