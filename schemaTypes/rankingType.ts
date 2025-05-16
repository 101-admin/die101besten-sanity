import { defineField, defineType } from 'sanity';
import { OlistIcon } from '@sanity/icons';

export const rankingType = defineType({
  name: 'ranking',
  title: 'Ranking',
  type: 'document',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
  ],
});
