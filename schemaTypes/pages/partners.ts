import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const partnersType = defineType({
  name: 'partners',
  title: 'Partners',
  type: 'document',
  icon: UsersIcon,
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
      type: 'array',
      title: 'Components',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'pageTitle'},
            {type: 'strategischePartner'},
            {type: 'medienPartner'},
            {type: 'premiumPartner'},
            {type: 'partner'},
            {type: 'werde101'},
            {type: 'dasBush'},
            {type: 'newsletter'},
            {type: 'imageSection'},
          ],
          options: {
            layout: 'grid',
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
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
