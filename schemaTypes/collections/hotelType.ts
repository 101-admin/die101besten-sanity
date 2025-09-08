import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const hotelType = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'edition',
      type: 'string',
      title: 'Edition',
      group: 'content',
      options: {
        list: [
          {title: 'Deutschland', value: 'deutschland'},
          {title: 'DACH', value: 'dach'},
          {title: 'Schweiz', value: 'schweiz'},
        ],
      },
    }),

    defineField({
      name: 'variant',
      type: 'string',
      title: 'Hotel Type',
      group: 'content',
      initialValue: 'classic',
      options: {
        list: [
          {title: 'Special Edition', value: 'special'},
          {title: '101 Hotel', value: 'classic'},
        ],
      },
    }),

    defineField({
      name: 'isPackageBooked',
      type: 'boolean',
      title: 'Hotel hat Paket gebucht',
      group: 'content',
      initialValue: true,
      description: 'Enable package booking',
    }),

    defineField({
      name: 'hotelType',
      type: 'string',
      title: 'Hotel Package',
      group: 'content',
      initialValue: 'classic',
      options: {
        list: [
          {title: 'Basic', value: 'classic'},
          {title: 'Premium', value: 'premium'},
          {title: 'Exclusive', value: 'exclusive'},
          {title: 'Grand', value: 'grand'},
        ],
      },
    }),

    defineField({
      name: 'segment',
      type: 'string',
      title: 'Hotel Segment',
      group: 'content',
      options: {
        list: [
          {title: 'Leisure', value: 'leisure'},
          {title: 'Business', value: 'business'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Hotel Kategorie',
      group: 'content',
      to: [{type: 'hotelCategory'}],
      hidden: ({document}) => document?.variant === 'special',
      options: {
        filter: ({document}) => ({
          filter: 'language == $language && $edition in edition',
          params: {
            language: document?.language,
            edition: document?.edition,
          },
        }),
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Only require category when variant is not 'special'
          if (context.document?.variant === 'special') {
            return true // Skip validation for special variant
          }
          return value ? true : 'A category must be selected'
        }),
    }),

    defineField({
      name: 'name',
      type: 'string',
      title: 'Hotel Name',
      group: 'content',
      description: 'Name of the hotel',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      description: 'Eindeutige Bezeichnung für das Hotel, bspw. in der Website Url.',
      options: {
        source: 'name',
        slugify: (input, _schemaType, context) => {
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

          // Create slug for the hotel name part
          const nameSlug = input
            .toLowerCase()
            .replace(/[äöüßæøéèêëáàâãñóòôõúùûýÿÄÖÜ]/g, (char) => umlautMap[char] || char)
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')

          const document = context?.parent as {edition?: string; language?: string} | undefined
          const editionMap: Record<string, string> = {
            deutschland: 'de',
            dach: 'dach',
            schweiz: 'ch',
          }
          const editionValue = document?.edition || ''
          const editionCode =
            editionMap[editionValue] || (typeof editionValue === 'string' ? editionValue : '')
          const languageCode = (document?.language || '').toLowerCase()

          const parts = [editionCode, nameSlug, languageCode].filter(Boolean).join('-')
          return parts
            .toLowerCase()
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
        },
      },
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Titelbild in Ranking Liste',
      group: 'content',
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

    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'Hotel Link',
      description: 'Link zur Website des Hotels.',
      group: 'content',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'Button Link',
        }),
      ],
    }),

    defineField({
      name: 'achievements',
      type: 'array',
      title: 'Tags',
      group: 'content',
      description: 'Auszeichnungen, wie z.B. Outstanding oder Honored.',
      of: [
        {
          type: 'reference',
          to: [{type: 'achivement'}],
        },
      ],
    }),

    defineField({
      name: 'ranking',
      type: 'object',
      title: 'Ranking Einstellungen',
      group: 'content',
      fields: [
        defineField({
          name: 'position',
          type: 'number',
          title: 'Ranking Position',
          hidden: ({document}) => document?.variant === 'special',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // Only require position when variant is not 'special'
              if (context.document?.variant === 'special') {
                return true // Skip validation for special variant
              }
              if (value !== undefined && value < 0) {
                return false
              }
              return true
              // return value && value >= 1 ? true : 'A position must be entered'
            }),
        }),
        defineField({
          name: 'category',
          type: 'string',
          title: 'Special Edition Kategorie',
          hidden: ({document}) => document?.variant === 'classic',
          options: {
            list: [
              {title: 'International Luxury Partners', value: 'luxury'},
              {title: "Editor's Choice", value: 'editors-choice'},
              {title: 'New Hotel Openings', value: 'new'},
            ],
          },
        }),
      ],
    }),

    // Primary Hero Section - Show for Exclusive, Grand, Premium
    defineField({
      name: 'primaryHeroSection',
      type: 'object',
      title: 'Titelbild (Hero Section - Premium bis Grand)',
      group: 'content',
      hidden: ({document}) => document?.hotelType === 'classic',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Titelbild (Hero Image)',
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
        defineField({
          name:"gallery",
          type:"array",
          title:"Image Gallery",
          of:[
            {
              type:"object",
              fields:[
                defineField({
                  name:"image",
                  type:"image",
                  title:"Image",
                  options:{
                    hotspot:true
                  },
                  fields:[
                    defineField({
                      name:"alt",
                      type:"string",
                      title:"Alternative Text",
                    })
                  ]
                })
              ]
            }
          ]
        }),
      ],
    }),

    // Secondary Hero Section - Show for Classic
    defineField({
      name: 'secondaryHeroSection',
      type: 'object',
      title: 'Titelbild (Hero Section - Basic)',
      group: 'content',
      hidden: ({document}) => document?.hotelType !== 'classic',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Titelbild (Hero Image)',
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
        defineField({
          name: 'brandImages',
          type: 'array',
          title: 'Logo zusätzliche Auszeichnung',
          description: 'z.B. Hornstein Ranking, Fairjob Hotel',
          of: [
            {
              type: 'reference',
              to: [
                {
                  type: 'images',
                },
              ],
            },
          ],
        }),
      ],
    }),

    // Hotel Details
    defineField({
      name: 'hotelDetailsSection',
      type: 'object',
      title: 'About',
      group: 'content',
      hidden: ({document}) => document?.hotelType === 'classic',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Hotel Image',
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

        defineField({
          name: 'description',
          type: 'text',
          title: 'About Text',
        }),
        defineField({
          name: 'brandImages',
          type: 'array',
          title: 'Logo zusätzliche Auszeichnung',
          description: 'z.B. Hornstein Ranking, Fairjob Hotel',
          of: [
            {
              type: 'reference',
              to: [
                {
                  type: 'images',
                },
              ],
            },
          ],
        }),
      ],
    }),

    // About Hotel
    defineField({
      name: 'aboutHotel',
      type: 'object',
      title: '5 Fakten (Basic)',
      group: 'content',
      hidden: ({document}) => document?.hotelType !== 'classic',
      fields: [
        defineField({
          name: 'aboutHotels',
          type: 'array',
          title: 'Fakten',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Bild neben den Fakten',
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
                defineField({
                  name: 'imagePosition',
                  type: 'string',
                  title: 'Position des Bildes',
                  description:
                    'Auswählen, ob das Bild links oder rechts neben dem Text stehen soll.',
                  options: {
                    list: [
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                    ],
                  },
                }),
                defineField({
                  name: 'description',
                  type: 'blockContent',
                  title: 'Fakten',
                  description:
                    'Texte als H2 Format definieren, sodass sie wie vorgesehen gerendert werden.Text der von Hashtags umschlossen ist, wird als farbiger Text in Highlightfarbe dargestellt. Ein Zeilenumbruch fügt einen Abstand ein.',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
      title: '5 Fakten (Premium bis Grand)',
      description:
        'Element “Description Grid” für ein- oder zweispaltiges Layout (ein oder zwei Texte einfügen).Element “Full Width Image” für Bilder.',
      group: 'content',
      hidden: ({document}) => document?.hotelType === 'classic',
    }),

    // Hotel Events - Show for Grand only
    // defineField({
    //   name: 'hotelEvents',
    //   type: 'object',
    //   title: 'Hotel Events Section',
    //   group: 'content',
    //   hidden: ({document}) => document?.hotelType !== 'grand',
    //   fields: [
    //     defineField({
    //       name: 'title',
    //       type: 'string',
    //       title: 'Title',
    //     }),
    //     defineField({
    //       name: 'text',
    //       type: 'text',
    //       title: 'Description',
    //     }),
    //     defineField({
    //       name: 'events',
    //       type: 'array',
    //       title: 'Events List',
    //       description: 'List all existing events for this hotel',
    //       of: [
    //         {
    //           type: 'object',
    //           fields: [
    //             defineField({
    //               name: 'image',
    //               type: 'image',
    //               title: 'Event Image',
    //               options: {
    //                 hotspot: true,
    //               },
    //               fields: [
    //                 {
    //                   name: 'alt',
    //                   type: 'string',
    //                   title: 'Alternative Text',
    //                 },
    //               ],
    //             }),
    //             defineField({
    //               name: 'title',
    //               type: 'string',
    //               title: 'Title',
    //             }),
    //             defineField({
    //               name: 'subtitle',
    //               type: 'string',
    //               title: 'SubTitle',
    //             }),
    //             defineField({
    //               name: 'description',
    //               type: 'text',
    //               title: 'Event Description',
    //             }),
    //             defineField({
    //               name: 'eventDate',
    //               type: 'object',
    //               title: 'Event Date',
    //               fields: [
    //                 defineField({
    //                   name: 'name',
    //                   type: 'string',
    //                   title: 'Date Name',
    //                 }),
    //                 defineField({
    //                   name: 'date',
    //                   type: 'date',
    //                   title: 'Date',
    //                 }),
    //               ],
    //             }),
    //             defineField({
    //               name: 'eventTime',
    //               type: 'object',
    //               title: 'Event Time',
    //               fields: [
    //                 defineField({
    //                   name: 'name',
    //                   type: 'string',
    //                   title: 'Time Name',
    //                 }),
    //                 defineField({
    //                   name: 'time',
    //                   type: 'string',
    //                   title: 'Time',
    //                 }),
    //               ],
    //             }),
    //             defineField({
    //               name: 'eventLocation',
    //               type: 'object',
    //               title: 'Event Location',
    //               fields: [
    //                 defineField({
    //                   name: 'name',
    //                   type: 'string',
    //                   title: 'Location Name',
    //                 }),
    //                 defineField({
    //                   name: 'location',
    //                   type: 'string',
    //                   title: 'Location',
    //                 }),
    //               ],
    //             }),
    //             defineField({
    //               name: 'ctaButton',
    //               type: 'object',
    //               title: 'CTA Button',
    //               fields: [
    //                 defineField({
    //                   name: 'text',
    //                   type: 'string',
    //                   title: 'Button Text',
    //                 }),
    //                 defineField({
    //                   name: 'url',
    //                   type: 'string',
    //                   title: 'Button URL',
    //                 }),
    //               ],
    //             }),
    //           ],
    //         },
    //       ],
    //     }),
    //   ],
    // }),

    // Hotel Info
    defineField({
      name: 'hotelInfo',
      type: 'object',
      title: 'Hotel Info Section',
      group: 'content',
      hidden: ({document}) => ['classic', 'premium'].includes(document?.hotelType as string),
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
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
          name: 'title',
          type: 'string',
          title: 'Popup Title',
        }),
        defineField({
          name: 'description',
          type: 'blockContent',
          title: 'Description',
        }),
        // defineField({
        //   name: 'readMore',
        //   type: 'string',
        //   title: 'Read more button',
        // }),
      ],
    }),

    // Hotel Info Premium - Show for Premium only
    defineField({
      name: 'hotelInfoPremium',
      type: 'object',
      title: 'Hotel Info Section (Premium)',
      group: 'content',
      hidden: ({document}) => document?.hotelType !== 'premium',
      fields: [
        defineField({
          name: 'Person',
          type: 'object',
          title: 'Person',
          fields: [
            defineField({
              name: 'host',
              type: 'string',
              title: 'Überschrift Gastgeber',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Person Image',
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
              name: 'role',
              type: 'string',
              title: 'Person Role',
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Person Name',
            }),
          ],
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Popup Title',
        }),
        defineField({
          name: 'description',
          type: 'blockContent',
          title: 'Beschreibung Hotel',
        }),
        // defineField({
        //   name: 'readMore',
        //   type: 'string',
        //   title: 'Read more button',
        // }),
      ],
    }),

    //testimonials section
    defineField({
      name: 'testimonials',
      type: 'object',
      title: 'Zitat Section',
      group: 'content',
      hidden: ({document}) => ['classic', 'premium'].includes(document?.hotelType as string),
      fields: [
        defineField({
          name: 'testimonial',
          type: 'array',
          title: 'Zitat Section',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'review',
                  type: 'text',
                  title: 'Zitat Text',
                }),
                defineField({
                  name: 'author',
                  type: 'string',
                  title: 'Autor',
                  description: 'Vorname Nachname - Rolle der zitierenden Person ',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // interview Section - Show for Exclusive and Grand
    defineField({
      name: 'interviewSection',
      type: 'object',
      title: 'Interview Section',
      group: 'content',
      hidden: ({document}) => !['exclusive', 'grand'].includes(document?.hotelType as string),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Überschrift',
        }),
        defineField({
          name: 'manager',
          type: 'object',
          title: 'Hotel Manager',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Manager Photo',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Manager Name',
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Manager Role',
            }),
          ],
        }),
        defineField({
          name: 'exclusiveQuestions',
          type: 'array',
          title: 'Fragen & Antworten (Nur Exclusive)',
          description: 'Es werden nur 5 Fragen und Antworten auf der Webseite ausgegeben.',
          hidden: ({document}) => document?.hotelType !== 'exclusive',

          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  type: 'text',
                  title: 'Question',
                }),
                defineField({
                  name: 'answer',
                  type: 'text',
                  title: 'Answer',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'grandQuestions',
          type: 'array',
          title: 'Fragen & Antworten (Nur Grand)',
          hidden: ({document}) => document?.hotelType !== 'grand',

          description:
            'Es sind 6 Fragen und Antworten vorgesehen. Wenn es mehr als 6 Fragen gibt, werden diese trotzdem auf der Webseite ausgegeben.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  type: 'text',
                  title: 'Question',
                }),
                defineField({
                  name: 'answer',
                  type: 'text',
                  title: 'Answer',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Hotel Highlights
    defineField({
      name: 'hotelHighlights',
      type: 'object',
      title: 'Hotel Highlights Section',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          title: 'Headline',
        }),
        defineField({
          name: 'highlights',
          type: 'array',
          title: 'Highlights',
          of: [
            {
              type: 'reference',
              to: [{type: 'highlights'}],
            },
          ],
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Section Image',
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
        defineField({
          name: 'ctaButton',
          type: 'object',
          title: 'CTA Button',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
          ],
        }),
      ],
    }),

    // Fullwidth Image
    defineField({
      name: 'fullwidthImage',
      type: 'image',
      title: 'Fullwidth Image',
      group: 'content',
      description: 'A full-width image to be displayed in the hotel details',
      hidden: ({document}) => document?.hotelType === 'classic',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility purposes',
        }),
      ],
    }),

    //fields entered by looking at petra code
    defineField({
      name: 'address',
      title: 'Hotel Adresse',
      type: 'reference',
      group: 'content',
      to: [{type: 'address'}],
    }),

    // Map Section
    defineField({
      name: 'mapSection',
      type: 'object',
      title: 'Map Section',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Hier werden Sie sein',
        }),
        // defineField({
        //   name: 'hotelLocation',
        //   type: 'reference',
        //   title: 'Map Location',
        //   to: [{type: 'address'}],
        // }),
        defineField({
          name: 'contactInfo',
          type: 'object',
          title: 'Hotel Contact Information',
          fields: [
            defineField({
              name: 'phone',
              type: 'string',
              title: 'Phone Number',
            }),
            defineField({
              name: 'email',
              type: 'string',
              title: 'Email Address',
            }),
            defineField({
              name: 'website',
              type: 'string',
              title: 'Website URL',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'adds',
      type: 'object',
      title: 'Ad Banner Section',
      group: 'content',
      fields: [
        defineField({
          name: 'add',
          type: 'reference',
          title: 'Ad Banner',
          to: [{type: 'imageSection'}],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      author: 'author.name',
      media: 'mainImage',
      language: 'language',
    },
    prepare(selection) {
      const {author, language} = selection
      return {
        ...selection,
        subtitle: `${language ? `[${language}] ` : ''}${author ? `by ${author}` : ''}`,
      }
    },
  },
})
