import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'images',
    type: 'document',
    title: 'Images',
    fields: [
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }),
            ],
        }),
        defineField({
            name:"name",
            type:"string",
            title:"Name",
        })
    ],
})