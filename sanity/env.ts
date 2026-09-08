export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-05'

// If it can't find the local file, it will smoothly use 'production'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// If it can't find the local file, it will smoothly use your real Project ID
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qozgfxrm'