import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navbarType = defineType({
  name: 'navbar',
  title: 'Navigation',
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
      validation: (Rule) => Rule.required(),
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
      name: 'mainMenu',
      type: 'array',
      title: 'Main Menu Items',
      of: [
        {
          type: 'object',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'string',
              title: 'URL',
              hidden: ({parent}) => parent?.hasSubmenu,
            }),
            defineField({
              name: 'hasSubmenu',
              type: 'boolean',
              title: 'Has Submenu',
              initialValue: false,
            }),
            defineField({
              name: 'submenu',
              type: 'object',
              title: 'Submenu',
              hidden: ({parent}) => !parent?.hasSubmenu,
              fields: [
                defineField({
                  name: 'columns',
                  type: 'array',
                  title: 'Submenu Columns',
                  of: [
                    {
                      type: 'object',
                      title: 'Column',
                      fields: [
                        defineField({
                          name: 'columnTitle',
                          type: 'string',
                          title: 'Column Title',
                          validation: (rule) => rule.required(),
                        }),
                        defineField({
                          name: 'links',
                          type: 'array',
                          title: 'Links',
                          of: [
                            {
                              type: 'object',
                              title: 'Link',
                              fields: [
                                defineField({
                                  name: 'label',
                                  type: 'string',
                                  title: 'Label',
                                  validation: (rule) => rule.required(),
                                }),
                                defineField({
                                  name: 'url',
                                  type: 'string',
                                  title: 'URL',
                                  validation: (rule) => rule.required(),
                                }),
                                defineField({
                                  name: 'id',
                                  type: 'string',
                                  title: 'Section ID',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
          ],
        },
      ],
      initialValue: [
        {
          label: 'RANKING',
          hasSubmenu: true,
          submenu: {
            columns: [
              {
                columnTitle: 'Wissenswertes',
                links: [
                  {label: 'Die Methodik des Rankings', url: '/methodik'},
                  {label: 'Die 101 Partner', url: '/partner'},
                  {label: 'Das Team hinter', url: '/team'},
                  {label: 'Presse', url: '/presse'},
                  {label: 'Jobs', url: '/jobs'},
                ],
              },
              {
                columnTitle: 'Hotelkategorien',
                links: [
                  {label: 'Business Hotels', url: '/business-hotels'},
                  {label: 'Luxury City Asia', url: '/luxury-city-asia'},
                  {label: 'Luxury Design & Bath', url: '/luxury-design-bath'},
                  {label: 'Luxury Family Resort', url: '/luxury-family-resort'},
                  {label: 'Luxury Spa & Health Resort', url: '/luxury-spa-health'},
                  {label: 'Luxury Hideaways', url: '/luxury-hideaways'},
                  {label: 'Luxury Hotels in Material', url: '/luxury-material'},
                  {label: 'Luxury City Hotels', url: '/luxury-city-hotels'},
                  {label: 'Luxury Golf Resort', url: '/luxury-golf-resort'},
                ],
              },
              {
                columnTitle: 'Weitere Auszeichnungen',
                links: [
                  {label: 'Editor Choice', url: '/editor-choice'},
                  {label: 'Newcomer Luxury Hotels', url: '/newcomer'},
                  {label: 'Top 50 Chefs', url: '/top-chefs'},
                ],
              },
              {
                columnTitle: 'Konto',
                links: [
                  {label: 'Login', url: '/login'},
                  {label: 'Spezielle Anbieten', url: '/special-offers'},
                  {label: 'Newsletter', url: '/newsletter'},
                  {label: 'Login für Hotels', url: '/hotel-login'},
                ],
              },
            ],
          },
        },
        {
          label: 'SPECIAL EDITIONS',
          url: '/special-editions',
        },
        {
          label: 'ABOUT US',
          url: '/about-us',
        },
      ],
    }),
    defineField({
      name: 'utilities',
      type: 'object',
      title: 'Utility Items',
      fields: [
        defineField({
          name: 'search',
          type: 'object',
          title: 'Search',
          fields: [
            defineField({
              name: 'placeholder',
              type: 'string',
              title: 'Search Placeholder',
              initialValue: 'Search...',
            }),
          ],
        }),
        defineField({
          name: 'languageSelector',
          type: 'object',
          title: 'Language Selector',
          fields: [
            defineField({
              name: 'languages',
              type: 'array',
              title: 'Available Languages',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'code',
                      type: 'string',
                      title: 'Language Code',
                    }),
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Language Label',
                    }),
                  ],
                },
              ],
              initialValue: [
                {code: 'de', label: 'DE'},
                {code: 'en', label: 'EN'},
              ],
            }),
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
        title: `Navbar - ${title}`,
        subtitle: language ? `[${language}]` : '',
      }
    },
  },
})
