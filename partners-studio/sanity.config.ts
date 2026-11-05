'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from '../sanity/env'
import {partnersSchema} from '../sanity/partners/schemaTypes'
import {partnersStructure} from '../sanity/partners/structure'

export default defineConfig({
  name: 'sellf-partners', title: 'Sellf Partners', projectId, dataset,
  schema: {
    ...partnersSchema,
    templates: (templates) => templates.filter((template) => template.schemaType !== 'partnersSettings'),
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => option.templateId !== 'partnersSettings'),
    actions: (actions, context) => context.schemaType === 'partnersSettings'
      ? actions.filter((action) => !['delete', 'duplicate'].includes(action.action || '')) : actions,
  },
  plugins: [structureTool({structure: partnersStructure}), visionTool({defaultApiVersion: apiVersion})],
})
