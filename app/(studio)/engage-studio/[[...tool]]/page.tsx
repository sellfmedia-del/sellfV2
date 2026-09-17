'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '@/engage-studio/sanity.config'

export default function EngageStudioPage() {
  return <NextStudio config={{...config, basePath: '/engage-studio'}} />
}
