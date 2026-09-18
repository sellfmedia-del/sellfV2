import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from '../sanity/env'

export default defineCliConfig({
  api: {projectId, dataset},
  studioHost: 'sellf-engage',
  deployment: {
    appId: 'uu5aggs7o80g458iawusym9q',
  },
})
