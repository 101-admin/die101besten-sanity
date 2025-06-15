import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const hotelType = defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'variant',
      type: 'string',
      title: 'Hotel Type',
      initialValue: 'classic',
      options: {
        list: [
          {title: 'Special', value: 'special'},
          {title: 'Classic', value: 'classic'},
        ],
      },
    }),

    defineField({
      name: 'hotelType',
      type: 'string',
      title: 'Hotel Package',
      initialValue: 'classic',
      options: {
        list: [
          {title: 'Basic', value: 'classic'},
          {title: 'Exclusive', value: 'exclusive'},
          {title: 'Grand', value: 'grand'},
          {title: 'Premium', value: 'premium'},
        ],
      },
    }),

    defineField({
      name: 'segment',
      type: 'string',
      title: 'Hotel Segment',
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
      name: 'isPackageBooked',
      type: 'boolean',
      title: 'Hotel hat Paket gebucht',
      initialValue: true,
      description: 'Enable package booking',
    }),

    defineField({
      name: 'name',
      type: 'string',
      title: 'Hotel Name',
      description: 'Name of the hotel',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Eindeutige Bezeichnung für das Hotel, bspw. in der Website Url.',
      options: {
        source: 'name',
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
      name: 'image',
      type: 'image',
      title: 'Hotel Cover Image',
      description: 'Image of the hotel',
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
        defineField({
          name: 'text',
          type: 'string',
          title: 'CTA Button Text',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'CTA Button URL',
        }),
      ],
    }),

    defineField({
      name: 'achievements',
      type: 'array',
      title: 'Achievements',
      description: 'Achievements of the hotel',
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
      fields: [
        defineField({
          name: 'position',
          type: 'number',
          title: 'Ranking Position',
          hidden: ({document}) => document?.variant === 'special',
          description: 'Lower numbers appear first (e.g., 1 is highest rank)',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // Only require position when variant is not 'special'
              if (context.document?.variant === 'special') {
                return true // Skip validation for special variant
              }
              return value && value >= 1 ? true : 'A position must be entered'
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
      title: 'Primary Hero Section',
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
      ],
    }),

    // Secondary Hero Section - Show for Classic
    defineField({
      name: 'secondaryHeroSection',
      type: 'object',
      title: 'Secondary Hero Section',
      hidden: ({document}) => document?.hotelType !== 'classic',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Hero Image',
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
          title: 'Brand Images',
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
      title: 'Hotel Details Section',
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
          title: 'Description',
        }),
        defineField({
          name: 'brandImages',
          type: 'array',
          title: 'Brand Images',
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
      title: 'About Hotel',
      hidden: ({document}) => document?.hotelType !== 'classic',
      fields: [
        defineField({
          name: 'aboutHotels',
          type: 'array',
          title: 'About Hotels',
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
                defineField({
                  name: 'description',
                  type: 'blockContent',
                  title: 'Description',
                }),
                defineField({
                  name: 'imagePosition',
                  type: 'string',
                  title: 'Image Position',
                  options: {
                    list: [
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                    ],
                  },
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
      title: 'Body',
      hidden: ({document}) => document?.hotelType === 'classic',
    }),

    // Hotel Events - Show for Grand only
    defineField({
      name: 'hotelEvents',
      type: 'object',
      title: 'Hotel Events Section',
      hidden: ({document}) => document?.hotelType !== 'grand',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
        }),
        defineField({
          name: 'text',
          type: 'text',
          title: 'Description',
        }),
        defineField({
          name: 'events',
          type: 'array',
          title: 'Events List',
          description: 'List all existing events for this hotel',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Event Image',
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
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                }),
                defineField({
                  name: 'subtitle',
                  type: 'string',
                  title: 'SubTitle',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Event Description',
                }),
                defineField({
                  name: 'eventDate',
                  type: 'object',
                  title: 'Event Date',
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                      title: 'Date Name',
                    }),
                    defineField({
                      name: 'date',
                      type: 'date',
                      title: 'Date',
                    }),
                  ],
                }),
                defineField({
                  name: 'eventTime',
                  type: 'object',
                  title: 'Event Time',
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                      title: 'Time Name',
                    }),
                    defineField({
                      name: 'time',
                      type: 'string',
                      title: 'Time',
                    }),
                  ],
                }),
                defineField({
                  name: 'eventLocation',
                  type: 'object',
                  title: 'Event Location',
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                      title: 'Location Name',
                    }),
                    defineField({
                      name: 'location',
                      type: 'string',
                      title: 'Location',
                    }),
                  ],
                }),
                defineField({
                  name: 'ctaButton',
                  type: 'object',
                  title: 'CTA Button',
                  fields: [
                    defineField({
                      name: 'text',
                      type: 'string',
                      title: 'Button Text',
                    }),
                    defineField({
                      name: 'url',
                      type: 'string',
                      title: 'Button URL',
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Hotel Info
    defineField({
      name: 'hotelInfo',
      type: 'object',
      title: 'Hotel Info Section',
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
      hidden: ({document}) => document?.hotelType !== 'premium',
      fields: [
        defineField({
          name: 'Person',
          type: 'object',
          title: 'Person',
          fields: [
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
              name: 'name',
              type: 'string',
              title: 'Person Name',
            }),
            defineField({
              name: 'host',
              type: 'string',
              title: 'Person Host',
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Person Role',
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

    //testimonials section

    defineField({
      name: 'testimonials',
      type: 'object',
      title: 'Testimonials',
      hidden: ({document}) => ['classic', 'premium'].includes(document?.hotelType as string),

      fields: [
        defineField({
          name: 'testimonial',
          type: 'array',
          title: 'Testimonial',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'review',
                  type: 'text',
                  title: 'Review',
                }),
                defineField({
                  name: 'author',
                  type: 'string',
                  title: 'Author',
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
      hidden: ({document}) => !['exclusive', 'grand'].includes(document?.hotelType as string),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
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
          title: 'Questions & Answers (EXCLUSIVE)',
          description: '5 questions and answers for EXCLUSIVE hotels',
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
          title: 'Questions & Answers (GRAND)',
          hidden: ({document}) => document?.hotelType !== 'grand',

          description: '6 questions and answers for GRAND hotels',
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
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          title: 'Headline',
        }),
        defineField({
          name: 'amenities',
          type: 'array',
          title: 'Amenities List',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'amenityText',
                  type: 'string',
                  title: 'Amenity Text',
                }),
                defineField({
                  name: 'icon',
                  type: 'image',
                  title: 'Amenity Icon',
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

    // Map Section

    defineField({
      name: 'mapSection',
      type: 'object',
      title: 'Map Section',
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
     name:"adds",
     type:"object",
     title:'Adds Section',
     fields:[
      defineField({
        name:"add",
        type:"reference",
        title:"Adds",
        to:[{type:"imageSection"}]
      })
     ]
    }),




    //fields entered by looking at petra code
    defineField({
      name: 'address',
      title: 'Hotel Adresse',
      type: 'reference',
      to: [{type: 'address'}],
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
