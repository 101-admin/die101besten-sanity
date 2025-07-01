import {defineField, defineType} from 'sanity'

export const eventsTags = defineType({
    name: 'eventsTags',
    title: 'Events Tags',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
    ],
})
