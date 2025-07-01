import {defineField, defineType} from 'sanity'


export default defineType({
    name: 'eventsHero',
    type: 'document',
    title: 'Events Hero',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
          }),
          defineField({
            name: 'id',
            type: 'string',
            title: 'Section ID',
          }),
          defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
          }),
    ],
})
