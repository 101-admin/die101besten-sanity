import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlider',
  type: 'document',
  title: 'Hero Slider',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Internal title for this slider',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'heroSection',
      type: 'object',
      title: 'Hero Section',
      fields: [
        defineField({
          name: 'heroImage',
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
          name: 'heroImageOverlay',
          type: 'object',
          title: 'Hero Image Overlay',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Hotel Name',
            }),
            defineField({
              name: 'city',
              type: 'string',
              title: 'City of the Hotel',
            }),
            defineField({
              name: 'country',
              type: 'string',
              title: 'Country of the Hotel',
            }),
            defineField({
              name: 'imageCredits',
              type: 'string',
              title: 'Image Credits',
              description: 'Credits for the image.If nessesary',
            }),
            defineField({
              name: 'color',
              type: 'string',
              title: 'Color of the text',
              options: {
                list: [
                  {title: 'White', value: 'white'},
                  {title: 'Black', value: 'black'},
                ],
              },
            }),
          ],
        }),
        defineField({
          name: 'infoOverlay',
          type: 'object',
          title: 'Info Overlay',
          fields: [
            {
              name: 'tags',
              type: 'array',
              title: 'Tags',
              of: [{type: 'string'}],
            },
            {
              name: 'city',
              type: 'string',
              title: 'City',
            },
            {
              name: 'hotelName',
              type: 'string',
              title: 'Hotel Name',
            },
            {
              name: 'ctaButton',
              type: 'object',
              title: 'CTA Button',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Text',
                },
                {
                  name: 'url',
                  type: 'url',
                  title: 'Url',
                  description: 'URL to navigate to when clicked',
                },
              ],
            },
            {
              name: 'shareButton',
              type: 'object',
              title: 'Share Button',
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enable Share Button',
                  description: 'Enable social media sharing functionality',
                },
                {
                  name: 'platforms',
                  type: 'array',
                  title: 'Share Platforms',
                  of: [{type: 'string'}],
                  options: {
                    list: [
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Twitter', value: 'twitter'},
                      {title: 'Email', value: 'email'},
                      {title: 'WhatsApp', value: 'whatsapp'},
                    ],
                  },
                },
              ],
            },
            {
              name: 'wishlistButton',
              type: 'object',
              title: 'Save to Wishlist Button',
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enable Wishlist Button',
                  description: 'Enable save to wishlist functionality',
                },
              ],
            },
          ],
        }),
        defineField({
          name: 'hotelSeals',
          type: 'array',
          title: 'Hotel Seals',
          description: 'List hotel seals (if applicable. Not all hotels will have these)',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'sealImage',
                  type: 'image',
                  title: 'Seal Image',
                },
                {
                  name: 'sealTitle',
                  type: 'string',
                  title: 'Seal Title',
                },
              ],
            },
          ],
        }),
        defineField({
          name: 'imageGallery',
          type: 'object',
          title: 'Image Gallery Button',
          description: 'PREMIUM to GRAND - Click opens image gallery with all images of that hotel',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Gallery Button',
            },
            {
              name: 'images',
              type: 'array',
              title: 'Gallery Images',
              of: [
                {
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroSection.heroImage',
    },
  },
})
