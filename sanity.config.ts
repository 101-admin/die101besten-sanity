'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {presentationTool} from 'sanity/presentation'
import type {DocumentLocationResolver} from 'sanity/presentation'
import {map} from 'rxjs'
import {apiVersion, dataset, projectId} from './env'
import {schema} from './schemaTypes'
import {structure} from './structure'
import {languages} from './config/languages'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure,
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Presentation tool for Visual Editing / embedded preview
    presentationTool({
      locate: ((params, context) => {
        // Locale-aware locations per document type
        const listenLocaleOnly = () =>
          context.documentStore.listenQuery(
            `*[_id == $id][0]{
              "locale": coalesce(__i18n_lang, language, "en")
            }`,
            {id: params.id},
            {perspective: 'drafts'},
          )

        const listenWithSlug = () =>
          context.documentStore.listenQuery(
            `*[_id == $id][0]{
              "locale": coalesce(__i18n_lang, language, "en"),
              "slug": slug.current
            }`,
            {id: params.id},
            {perspective: 'drafts'},
          )

        switch (params.type) {
          case 'home': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Homepage', href: `/${locale}`}],
                }
              }),
            )
          }
          case 'blog': {
            const doc$ = listenWithSlug()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                const slug = doc?.slug
                if (!slug) return null
                return {
                  locations: [
                    {title: 'Blog detail', href: `/${locale}/blogs/${slug}`},
                    {title: 'Blogs', href: `/${locale}/blogs`},
                  ],
                }
              }),
            )
          }
          case 'allBlogs': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Blogs', href: `/${locale}/blogs`}],
                }
              }),
            )
          }
          case 'event': {
            const doc$ = listenWithSlug()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                const slug = doc?.slug
                if (!slug) return null
                return {
                  locations: [
                    {title: 'Event detail', href: `/${locale}/events/${slug}`},
                    {title: 'Events', href: `/${locale}/events`},
                  ],
                }
              }),
            )
          }
          case 'allEvents': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Events', href: `/${locale}/events`}],
                }
              }),
            )
          }
          case 'hotel': {
            const doc$ = listenWithSlug()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                const slug = doc?.slug
                if (!slug) return null
                return {
                  locations: [
                    {title: 'Hotel detail', href: `/${locale}/hotels/${slug}`},
                    {title: 'Hotels', href: `/${locale}/hotels`},
                  ],
                }
              }),
            )
          }
          case 'allHotels': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Hotels', href: `/${locale}/hotels`}],
                }
              }),
            )
          }
          case 'aboutUs': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'About', href: `/${locale}/about`}],
                }
              }),
            )
          }
          case 'partners': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Partners', href: `/${locale}/partners`}],
                }
              }),
            )
          }
          case 'specialEditionHotels': {
            const doc$ = listenLocaleOnly()
            return doc$.pipe(
              map((doc) => {
                const locale = doc?.locale || 'en'
                return {
                  locations: [{title: 'Special editions', href: `/${locale}/special-editions`}],
                }
              }),
            )
          }
          default:
            return null
        }
      }) as DocumentLocationResolver,
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    // Add internationalization support
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: [
        'blog',
        'event',
        'hotel',
        'home',
        'aboutUs',
        'partners',
        'navbar',
        'footer',
        'allHotels',
        'allBlogs',
        'specialEditionHotels',
        'hotelCategory',
        'allEvents',
      ],
      weakReferences: true,
    }),
  ],
})
