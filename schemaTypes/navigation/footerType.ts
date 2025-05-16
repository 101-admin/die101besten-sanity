import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: MenuIcon,
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
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'kontakt',
      type: 'object',
      title: 'Kontakt',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Kontakt',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          initialValue:
            'Die Marken 101 beste Hotels sind die entscheidende Benchmark der Hospitality und das relevanteste Hotelranking für Deutschland, die Schweiz, Österreich, Südtirol und Liechtenstein.',
        }),
        defineField({
          name: 'emailText',
          type: 'string',
          title: 'Email Text',
          initialValue: 'Schreiben Sie uns',
        }),
        defineField({
          name: 'emailLink',
          type: 'string',
          title: 'Email Link',
        }),
      ],
    }),
    defineField({
      name: 'service',
      type: 'object',
      title: 'Service',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Service',
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'newTab',
                  type: 'boolean',
                  title: 'Open in New Tab',
                  initialValue: false,
                }),
              ],
            },
          ],
          initialValue: [
            {label: 'FAQ', url: '/faq'},
            {label: 'Partner werden', url: '/partner-werden'},
            {label: 'Presse', url: '/presse'},
            {label: 'Sitemap', url: '/sitemap'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'quickLinks',
      type: 'object',
      title: 'Quick Links',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Quick Links',
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'newTab',
                  type: 'boolean',
                  title: 'Open in New Tab',
                  initialValue: false,
                }),
              ],
            },
          ],
          initialValue: [
            {label: 'Ranking Deutschland', url: '/ranking-deutschland'},
            {label: 'Ranking Schweiz', url: '/ranking-schweiz'},
            {label: 'Ranking DACH-Region', url: '/ranking-dach'},
            {label: 'Special Editions', url: '/special-editions'},
            {label: 'Buch bestellen', url: '/buch-bestellen'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'ausDer101Welt',
      type: 'object',
      title: 'Aus der 101 Welt',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Aus der 101 Welt',
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'newTab',
                  type: 'boolean',
                  title: 'Open in New Tab',
                  initialValue: false,
                }),
              ],
            },
          ],
          initialValue: [
            {label: 'Club of Icons', url: '/club-of-icons'},
            {label: 'Fine Hotels', url: '/fine-hotels'},
            {label: 'Friends of "Die 101 Besten"', url: '/friends'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'bottomSection',
      type: 'object',
      title: 'Bottom Section',
      fields: [
        defineField({
          name: 'copyright',
          type: 'string',
          title: 'Copyright Text',
          initialValue: '© Die 101 besten. All rights reserved.',
        }),
        defineField({
          name: 'legalLinks',
          type: 'array',
          title: 'Legal Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'newTab',
                  type: 'boolean',
                  title: 'Open in New Tab',
                  initialValue: false,
                }),
              ],
            },
          ],
          initialValue: [
            {label: 'Cookies', url: '/cookies'},
            {label: 'Impressum', url: '/impressum'},
            {label: 'Datenschutz', url: '/datenschutz'},
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'edition',
      language: 'language',
    },
    prepare(selection) {
      const {title, language} = selection
      return {
        title: `Footer - ${title}`,
        subtitle: language ? `[${language}]` : '',
      }
    },
  },
})
