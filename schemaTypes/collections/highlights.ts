import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'highlights',
    type: 'document',
    title: 'Highlights',
    fields: [
        defineField({
            name:'icon',
            type:'image',
            title:'Icon',
            options:{
                hotspot:true,
            },
            fields:[
                defineField({
                    name:'alt',
                    type:'string',
                    title:'Alternative Text',
                }),
            ],
        }),
        defineField({
            name:'description',
            type:'text',
            title:'Description',
        }),
    ],
    preview: {
        select: {
            icon: 'icon.asset',
            description: 'description',
        },
        prepare({icon, description}) {
            return {
                title: icon ? 'Icon' : description,
                subtitle: icon ? description : 'Description',
                media: icon,
            };
        },
    },
})
