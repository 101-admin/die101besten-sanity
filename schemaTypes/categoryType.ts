import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Hotel Kategorien',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Anzeigename',
      description:
        'Name wie er extern angezeigt wird, bspw. auf der Website. Dieser Name kann jederzeit angepasst werden, ohne eine neue Kategorie zu erstellen.',
      validation: (rule) =>
        rule.required().error('Es muss ein Anzeigename eingebgeben werden.'),
    }),
    defineField({
      name: 'name',
      type: 'slug',
      title: 'Name (intern)',
      description:
        'Name für den internen Gebrauch, der nicht mehr geändert werden sollte.',
      options: {
        source: 'label',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ''),
      },
      validation: (rule) =>
        rule.required().error('Es muss ein Name eingebgeben werden.'),
    }),
    defineField({
      name: 'edition',
      type: 'array',
      title: 'In welchen Edition(en) existiert die Kategorie?',
      description: 'Wähle mindestens eine Edition.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Deutschland', value: 'de' },
          { title: 'Schweiz', value: 'ch' },
          { title: 'DACH', value: 'dach' },
        ],
        layout: 'list',
      },
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('Es muss mindestens eine Edition ausgewählt werden.'),
    }),
    defineField({
      name: 'parentCategory',
      type: 'reference',
      title: 'Gibt es eine Eltern-Kategorie?',
      to: { type: 'category' },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
});
