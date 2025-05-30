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
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ''),
      },
      validation: (rule) => rule.required().error('Ein Slug wird benötigt'),
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
