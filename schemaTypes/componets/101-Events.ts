import {defineType, defineField} from 'sanity'

export default defineType({
  name: '101Events',
  type: 'document',
  title: '101 Events',

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
      name: 'upcomigTitle',
      type: 'string',
      title: 'Upcoming Title',
    }),

    defineField({
      name: 'upcomingEvents',
      type: 'array',
      title: 'Upcoming Events',
      of: [
        {
          type: 'reference',
          to: [{type: 'event'}],
        },
      ],
    }),

    defineField({
      name: 'upcomingCtaButton',
      type: 'object',
      title: 'Upcoming CTA Button',
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

    defineField({
      name: 'pastTitle',
      type: 'string',
      title: 'Past Title',
    }),

    defineField({
      name: 'pastEvents',
      type: 'array',
      title: 'Past Events',
      of: [
        {
          type: 'reference',
          to: [{type: 'event'}],
        },
      ],
    }),

    defineField({
      name: 'pastCtaButton',
      type: 'object',
      title: 'Past CTA Button',
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
