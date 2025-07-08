import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'eventType',
    type: 'document',
    title: 'Event Type',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
    ],
})