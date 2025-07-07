import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for browser tab and search results (50-60 characters recommended)',
      validation: (Rule) =>
        Rule.max(60).warning(
          'Meta titles longer than 60 characters may be truncated in search results',
        ),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search results (150-160 characters recommended)',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Meta descriptions longer than 160 characters may be truncated in search results',
        ),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social Media Share Image',
      type: 'image',
      description: 'Image shown when sharing on social media (Recommended: 1200x630 pixels)',
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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords relevant to this content (optional)',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred version of this page for search engines (optional)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'When enabled, tells search engines not to show this page in search results',
      initialValue: false,
    }),
  ],
})
