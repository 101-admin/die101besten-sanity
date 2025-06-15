import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventsType = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: (input) => {
          const umlautMap: {[key: string]: string} = {
            ä: 'ae',
            ö: 'oe',
            ü: 'ue',
            ß: 'ss',
            æ: 'ae',
            ø: 'oe',
            é: 'e',
            è: 'e',
            ê: 'e',
            ë: 'e',
            á: 'a',
            à: 'a',
            â: 'a',
            ã: 'a',
            ñ: 'n',
            ó: 'o',
            ò: 'o',
            ô: 'o',
            õ: 'o',
            ú: 'u',
            ù: 'u',
            û: 'u',
            ý: 'y',
            ÿ: 'y',
            Ä: 'ae',
            Ö: 'oe',
            Ü: 'ue',
          }

          return (
            input
              .toLowerCase()
              // Replace umlauts and special characters
              .replace(/[äöüßæøéèêëáàâãñóòôõúùûýÿÄÖÜ]/g, (char) => umlautMap[char] || char)
              // Replace spaces with hyphens
              .replace(/\s+/g, '-')
              // Replace ampersand with 'and'
              .replace(/&/g, 'and')
              // Remove all other special characters
              .replace(/[^a-z0-9-]/g, '')
              // Remove multiple consecutive hyphens
              .replace(/-+/g, '-')
              // Remove leading and trailing hyphens
              .replace(/^-+|-+$/g, '')
          )
        },
      },
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Datum/Zeit',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Datum/Zeit',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Ort',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beschreibung',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Hauptbild',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
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
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      media: 'mainImage',
    },
    prepare(selection) {
      const {date} = selection
      return {
        ...selection,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Kein Datum',
      }
    },
  },
})
