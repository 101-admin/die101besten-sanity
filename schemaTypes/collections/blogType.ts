import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
// import { languageOptions } from "../../config/languages";

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
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
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
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
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'readMore',
      type: 'string',
      title: 'Read More',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: {type: 'author'},
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      group: 'content',
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
      type: 'array',
      title: 'Categories',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
      group: 'content',
    }),
    defineField({
      name: 'articleSection',
      type: 'object',
      title: 'Article Section',
      group: 'content',
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
              type: 'reference',
              to: {type: 'blog'},
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
    defineField({
      name: 'adds',
      type: 'object',
      title: 'Adds Section',
      group: 'content',
      fields: [
        defineField({
          name: 'add',
          type: 'reference',
          title: 'Adds',
          to: [{type: 'imageSection'}],
        }),
      ],
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
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
