import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const specialEditionHotels = defineType({
  name: 'specialEditionHotels',
  title: 'Special Edition Hotels',
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
            {type: 'dieInstagram'},
            {type: 'newsletter'},
            {type: 'hotelCollection'},
            {type: 'specialHotels'},
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
