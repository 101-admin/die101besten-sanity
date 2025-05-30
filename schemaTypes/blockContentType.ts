import {defineType, defineArrayMember, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import {HighlightIcon} from '@sanity/icons'
import {ColoredTextDecorator} from '../components/ColoredTextDecorator'

/**
 * This is the schema type for block content.
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Colored Text',
            value: 'coloredText',
            icon: HighlightIcon,
            component: ColoredTextDecorator,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'coloredText',
      title: 'Colored Text',
      icon: HighlightIcon,
      description: 'For colored text wrap in # symbol',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Text',
        },
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'fullWidthImage',
      title: 'Full Width Image',
      fields: [
        {
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
        },
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'anzeigeImage',
      title: 'Anzeige Image',
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
          title: 'Anzeige Images',
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
                    defineField({
                      name: 'link',
                      type: 'string',
                      title: 'Link',
                    }),
                    defineField({
                      name: 'linkText',
                      type: 'string',
                      title: 'Link Text',
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'contentSection',
      title: 'Content Section',
      fields: [
        defineField({
          name: 'content',
          type: 'array',
          title: 'Content',
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
    defineArrayMember({
      type: 'object',
      name: 'blogDescriptionGrid',
      title: 'Blog Description Grid',
      fields: [
        {
          name: 'descriptions',
          type: 'array',
          title: 'Descriptions',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'description',
                  type: 'blockContent',
                  title: 'Description',
                }),
              ],
            },
          ],
          options: {
            layout: 'grid',
          },
        },
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'descriptionGrid',
      title: 'Description Grid',
      fields: [
        {
          name: 'descriptions',
          type: 'array',
          title: 'Descriptions',
          of: [
            {
              type: 'text',
              title: 'Description',
            },
          ],
          options: {
            layout: 'grid',
          },
        },
      ],

      preview: {
        select: {
          descriptions: 'descriptions',
        },
        prepare({descriptions = []}) {
          return {
            title: 'Description Grid',
            subtitle: `${descriptions.length} description${descriptions.length === 1 ? '' : 's'}`,
          }
        },
      },
    }),
  ],
})
