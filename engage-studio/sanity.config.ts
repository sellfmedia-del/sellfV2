'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from '../sanity/env'
import {engageSchema} from '../sanity/engage/schemaTypes'
import {engageStructure} from '../sanity/engage/structure'

export default defineConfig({
  name: 'sellf-engage',
  title: 'Sellf Engage',
  basePath: '/engage-studio',
  projectId,
  dataset,
  schema: engageSchema,
  plugins: [
    structureTool({structure: engageStructure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
