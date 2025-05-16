'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
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
      ],
      weakReferences: true,
    }),
  ],
})
