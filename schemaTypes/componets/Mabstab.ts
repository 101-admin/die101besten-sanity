import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mabstab',
  type: 'document',
  title: 'Mabstab für Exzellenz',
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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
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
  ],
})
