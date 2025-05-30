// import {PiAddressBookTabsLight} from 'react-icons/pi'
import {defineField, defineType} from 'sanity'

type CountryCode = 'de' | 'at' | 'ch' | 'it'

export const addressType = defineType({
  name: 'address',
  type: 'document',
  // icon: PiAddressBookTabsLight,
  fieldsets: [
    {
      name: 'streetAndNumber',
      title: 'Street and Number',
      options: {columns: 2},
    },
    {
      name: 'postalCodeAndCity',
      title: 'Postal Code and City',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'street',
      type: 'string',
      title: 'Street',
      fieldset: 'streetAndNumber',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'streetNumber',
      type: 'string',
      title: 'Number',
      fieldset: 'streetAndNumber',
    }),
    defineField({
      name: 'postalCode',
      type: 'string',
      title: 'Postal Code',
      fieldset: 'postalCodeAndCity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      type: 'string',
      title: 'City',
      fieldset: 'postalCodeAndCity',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          {title: 'Germany', value: 'de'},
          {title: 'Austria', value: 'at'},
          {title: 'Switzerland', value: 'ch'},
          {title: 'Italy', value: 'it'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      street: 'street',
      streetNumber: 'streetNumber',
      postalCode: 'postalCode',
      city: 'city',
      country: 'country',
    },
    prepare({
      street,
      streetNumber,
      country,
      postalCode,
      city,
    }: {
      street?: string
      streetNumber?: string
      country?: CountryCode
      postalCode?: string
      city?: string
    }) {
      const PREPOSITIONS: Record<CountryCode, string> = {
        de: 'D-',
        at: 'AT-',
        ch: 'CH-',
        it: 'IT-',
      }

      return {
        title: `${city} | ${country ? PREPOSITIONS[country] : ''}${postalCode}`,
        subtitle: `${street} ${streetNumber}`,
      }
    },
  },
})
