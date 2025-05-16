import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'rankingMitRelevanz',
  type: 'document',
  title: 'Ranking mit Relevanz',
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
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'ctaButtons',
      type: 'array',
      title: 'CTA Buttons',
      of: [
        {
          type: 'object',
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
            defineField({
              name: 'btnStyle',
              type: 'string',
              title: 'Button Style',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                ],
              },
            }),
          ],
        },
      ],
    }),
  ],
})
