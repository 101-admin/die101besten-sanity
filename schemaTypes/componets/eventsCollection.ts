import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'eventsCollection',
    type: 'document',
    title: 'Events Collection',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Collection Title',
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