import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homeType = defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
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
            {type: 'allHotelsSlider'},
            {type: 'partnerLogo'},
            {type: 'textQuote'},
            {type: 'businessLeisure'},
            {type: 'hotels'},
            {type: 'successStory'},
            {type: 'mabstab'},
            {type: 'rankingMitRelevanz'},
            {type: 'specialEdition'},
            {type: '101Events'},
            {type: 'imageQuote'},
            {type: 'exclusiveEvents'},
            {type: 'location'},
            {type: 'newsletter'},
            {type: 'hotelmomente'},
            {type: 'dieInstagram'},
            {type: 'dasBush'},
            {type: 'imageSection'},
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
