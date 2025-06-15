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
      type: 'reference',
      title: 'City',
      to: [{type: 'city'}],
      fieldset: 'postalCodeAndCity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'country'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      street: 'street',
      streetNumber: 'streetNumber',
      postalCode: 'postalCode',
      cityRef: 'city',
      country: 'country',
    },
    prepare({
      street,
      streetNumber,
      country,
      postalCode,
      cityRef,
    }: {
      street?: string
      streetNumber?: string
      country?: CountryCode
      postalCode?: string
      cityRef?: {label: string}
    }) {
      const PREPOSITIONS: Record<CountryCode, string> = {
        de: 'D-',
        at: 'AT-',
        ch: 'CH-',
        it: 'IT-',
      }

      return {
        title: `${cityRef?.label || ''} | ${country ? PREPOSITIONS[country] : ''}${postalCode}`,
        subtitle: `${street} ${streetNumber}`,
      }
    },
  },
})
