import { defineField, defineType } from 'sanity';
import { EarthAmericasIcon } from '@sanity/icons';

export const editionType = defineType({
  name: 'edition',
  title: 'Editionen',
  type: 'document',
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required().error('Bitte gib einen Namen ein.'),
    }),
    defineField({
      name: 'code',
      type: 'string',
      title: 'Code',
      description: 'Interner Code bzw. Abkürzung für die Edition.',
      readOnly: ({ document }) => {
        // make document read-only after initial publish
        return !!document?._id && !document?._id.startsWith('drafts.');
      },
      validation: (rule) =>
        rule.required().error('Es muss ein Code ausgewählt werden.'),
    }),
  ],
});
