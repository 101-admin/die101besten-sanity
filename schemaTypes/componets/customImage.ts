import {defineField, defineType} from 'sanity'

export const customImage = defineType({
  name: 'customImage',
  type: 'image',
  title: 'Custom Image',
  description: 'A reusable image component with optional caption and link',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption text to display below the image',
    }),
    defineField({
      name: 'link',
      type: 'string',
      title: 'Link',
      description: 'Optional URL to link the image to',
    }),
    defineField({
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
      description: 'Text to display for the link (if link is provided)',
      hidden: ({parent}) => !parent?.link,
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
