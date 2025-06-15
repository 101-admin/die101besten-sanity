import {defineField, defineType} from 'sanity'

export const cityType = defineType({
  name: 'city',
  title: 'Cities',
  type: 'document',
  preview: {
    select: {
      title: 'label',
      language: 'language',
      edition: 'edition',
    },
    prepare({title, language, edition = []}) {
      const editionText = edition.length > 0 ? ` (${edition.join(', ')})` : ''
      return {
        title: `${title} ${editionText}`,
      }
    },
  },
  fields: [
    // defineField({
    //   name: 'language',
    //   type: 'string',
    //   title: 'Language',
    //   readOnly: true,
    // }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'City Name',
      description: 'Name of the city as it should appear externally',
      validation: (rule) => rule.required().error('A city name is required'),
    }),
    defineField({
      name: 'value',
      type: 'slug',
      title: 'Value (internal)',
      description: 'Internal value that should not be changed once set',
      options: {
        source: 'label',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ''),
      },
      validation: (rule) => rule.required().error('An internal value is required'),
    }),
    defineField({
      name: 'edition',
      type: 'array',
      title: 'In which edition(s) does this city exist?',
      description: 'Choose at least one edition',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Germany', value: 'deutschland'},
          {title: 'Switzerland', value: 'schweiz'},
          {title: 'DACH', value: 'dach'},
        ],
        layout: 'list',
      },
      validation: (rule) => rule.required().min(1).error('At least one edition must be selected'),
    }),
  ],
})
