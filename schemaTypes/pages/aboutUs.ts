import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const aboutUsType = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  icon: DocumentIcon,
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
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'edition',
      type: 'string',
      title: 'Edition',
      options: {
        list: [
          {title: 'Deutschland', value: 'deutschland'},
          {title: 'DACH', value: 'dach'},
          {title: 'Schweiz', value: 'schweiz'},
        ],
      },
    }),

    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'heroAbout'},
            {type: 'utr'},
            {type: 'textQuote'},
            {type: 'imageQuote'},
            {type: 'partnerLogo'},
            {type: 'successStory'},
            {type: 'newsletter'},
            {type: 'dasBush'},
            {type: 'testimonials'},
            {type: 'dieBesten'},
            {type: 'boardofDas'},
            {type: 'principles'},
            {type: 'shapingFuture'},
            {type: 'hotelmomente'},
          ],
          options: {
            layout: 'grid',
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {title, language} = selection
      return {
        title: title,
        subtitle: language ? `[${language}]` : '',
      }
    },
  },
})
