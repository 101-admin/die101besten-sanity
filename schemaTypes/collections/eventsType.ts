import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventsType = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
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
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'eventType',
      type: 'array',
      title: 'Event Type',
      of: [
        {
          type: 'reference',
          to: [{type: 'eventType'}],
        },
      ],
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Datum',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      group: 'content',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Ort',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Teaser',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Beschreibung',
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
      group: 'content',
    }),

    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Bildergallerie',
      hidden: ({document}) => {
        if (!document?.startDate) return true
        const start = new Date(document.startDate as string).getTime()
        if (isNaN(start)) return true
        return Date.now() < start
      },
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                },
              ],
            }),
          ],
          preview: {
            select: {
              image: 'image',
              alt: 'image.alt',
            },
            prepare(selection) {
              const {image, alt} = selection
              return {
                title: alt || 'No alt text',
                media: image,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'youtubeVideo',
      type: 'object',
      title: 'Youtube Video',
      description: 'Please add a Valid Emebed Youtube Url',
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
      group: 'content',
    }),

    defineField({
      name: 'allEvents',
      type: 'object',
      title: 'All Events',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Titel',
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
          name: 'ctaButton',
          type: 'object',
          title: 'Button',
          fields: [
            defineField({
              name: 'text',
              type: 'string',
              title: 'Text',
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Link',
            }),
          ],
        }),
      ],
      group: 'content',
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
      group: 'content',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
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
