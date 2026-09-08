import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: 'qozgfxrm', // Hard-coded your actual ID
    dataset: 'production' 
  },
  deployment: {
    appId: 'kyc7ukdik8bw7hlvfk4riyaf'
  }
})