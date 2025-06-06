import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'achivement',
    type: 'document',
    title: 'Achievement',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
        }),
    ],
})
