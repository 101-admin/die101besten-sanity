import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'boardofDas',
  type: 'document',
  title: 'Board of Das',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'If you want to Hightlight the text Wrap it into # symbol like this: Section #Title#',
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

    defineField({
      name: 'description1',
      type: 'text',
      title: 'Description 1',
    }),
    defineField({
      name: 'description2',
      type: 'text',
      title: 'Description 2',
    }),
    defineField({
      name: 'readmore',
      type: 'string',
      title: 'Read More',
    }),

    defineField({
      name: 'boardMembers',
      type: 'array',
      title: 'Board Members',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description:
                'if you giving the email and phone then make sure your description is short',
            },
            {
              name: 'email',
              type: 'string',
              title: 'Email',
            },
            {
              name: 'phone',
              type: 'string',
              title: 'Phone',
            },

            {
              name: 'hoverColor',
              type: 'string',
              title: 'Hover Color',
              initialValue: 'black',
              options: {
                list: [
                  {title: 'Black', value: 'black'},
                  {title: 'White', value: 'white'},
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
})
