import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
// import { languageOptions } from "../../config/languages";

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readMore',
      type: 'string',
      title: 'Read More',
      validation: (Rule) => Rule.required(),
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
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: {type: 'author'},
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
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'Alle Artikel anzeigen', value: 'Alle Artikel anzeigen'},
          {title: 'Blog Kategorie', value: 'Blog Kategorie'},
          {title: 'Weitere Blog Kategorie', value: 'Weitere Blog Kategorie'},
          {title: 'Noch eine Kategorie', value: 'Noch eine Kategorie'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),

    defineField({
      name: 'heroSection',
      type: 'object',
      title: 'Hero Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
        }),
      ],
    }),

    // Partner Section
    defineField({
      name: 'partnerSection',
      type: 'object',
      title: 'Partner Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          options: {
            list: [
              {title: 'Ad', value: 'Ad'},
              {title: 'Anzeige', value: 'Anzeige'},
            ],
          },
        }),
        defineField({
          name: 'images',
          type: 'array',
          title: 'Partner Images',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    //Article Section
    defineField({
      name: 'articleSection',
      type: 'object',
      title: 'Article Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
        }),
        defineField({
          name: 'articles',
          type: 'array',
          title: 'Articles',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }),
                  ],
                }),
                defineField({
                  name: 'category',
                  type: 'string',
                  title: 'Category',
                  options: {
                    list: [
                      {title: 'Alle Artikel anzeigen', value: 'Alle Artikel anzeigen'},
                      {title: 'Blog Kategorie', value: 'Blog Kategorie'},
                      {title: 'Weitere Blog Kategorie', value: 'Weitere Blog Kategorie'},
                      {title: 'Noch eine Kategorie', value: 'Noch eine Kategorie'},
                    ],
                  },
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Description',
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
                      name: 'link',
                      type: 'string',
                      title: 'Button Link',
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'button',
          type: 'object',
          title: 'All Articles Button',
          fields: [
            defineField({
              name: 'text',
              type: 'string',
              title: 'Button Text',
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Button Link',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      edition: 'edition',
    },
    prepare(selection) {
      const {author, edition} = selection
      return {
        ...selection,
        subtitle: `${edition ? `[${edition}] ` : ''}${author ? `by ${author}` : ''}`,
      }
    },
  },
})
