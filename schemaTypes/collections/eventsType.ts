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
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
      name: 'eventHotel',
      type: 'string',
      title: 'Event Hotel',
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
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
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Tags of the event',
      of: [
        {
          type: 'reference',
          to: [{type: 'eventsTags'}],
        },
      ],
    }),

    defineField({
      name: 'youtubeVideo',
      type: 'object',
      title: 'Youtube Video',
      description:
        "Please add a Valid Emebed Youtube Url",
      hidden: ({document}) => {
        if (!document?.startDate) return true
        const start = new Date(document.startDate as string).getTime()
        if (isNaN(start)) return true
        return Date.now() < start
      },
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Youtube Video URL',
        }),
      ],
    }),
    defineField({
      name: 'allEvents',
      type: 'object',
      title: 'All Events',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
        }),
        defineField({
          name: 'events',
          type: 'array',
          title: 'Events',
          of: [
            {
              type: 'reference',
              to: [{type: 'event'}],
            },
          ],
        }),
        defineField({
          name:"ctaButton",
          type:"object",
          title:"Button",
          fields:[
            defineField({
              name:"text",
              type:"string",
              title:"Text",
            }),
            defineField({
              name:"link",
              type:"string",
              title:"Link",
            })
          ]
        })
      ],
    }),

    defineField({
      name: 'adds',
      type: 'object',
      title: 'Adds Section',
      fields: [
        defineField({
          name: 'add',
          type: 'reference',
          title: 'Adds',
          to: [{type: 'imageSection'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      media: 'mainImage',
      edition: 'edition',
    },
    prepare(selection) {
      const {date, edition} = selection
      return {
        ...selection,
        subtitle: `${date ? new Date(date).toLocaleDateString() : 'Kein Datum'}-${edition ? `[${edition}]` : ''}`,
      }
    },
  },
})
