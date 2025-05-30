import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      initialValue: 'Erfahren Sie es als Erster!',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'Section ID',
    }),
    defineField({
      name: 'emailLabel',
      type: 'string',
      title: 'Email Input Label',
      initialValue: 'E-Mail Adresse',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      initialValue: 'ANMELDEN',
    }),
    defineField({
      name: 'privacyText',
      type: 'text',
      title: 'Privacy Policy Text',
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Media Links',
      fields: [
        defineField({
          name: 'facebook',
          type: 'string',
          title: 'Facebook URL',
        }),
        defineField({
          name: 'instagram',
          type: 'string',
          title: 'Instagram URL',
        }),
        defineField({
          name: 'linkedin',
          type: 'string',
          title: 'LinkedIn URL',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Newsletter',
      }
    },
  },
})
