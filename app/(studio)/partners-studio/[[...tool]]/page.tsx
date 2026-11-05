'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '@/partners-studio/sanity.config'

export default function PartnersStudioPage() {
  return <NextStudio config={{...config, basePath: '/partners-studio'}} />
}
