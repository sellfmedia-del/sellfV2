'use client'

/**
 * This configuration is used for the Sanity Studio 
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// We removed dataset and projectId from this import to prevent env variable crashes
import {apiVersion} from './sanity/env' 
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'qozgfxrm', // Hardcoded public ID
  dataset: 'production', // Hardcoded dataset
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})