import type {SchemaTypeDefinition} from 'sanity'
import engageContent from './engageContent'
import engageEvent from './engageEvent'
import engagePerson from './engagePerson'
import engageSeo from './engageSeo'
import engageSettings from './engageSettings'
import engageTool from './engageTool'
import engageWebinar from './engageWebinar'

export const engageSchema: {types: SchemaTypeDefinition[]} = {
  types: [
    engageSeo,
    engageSettings,
    engagePerson,
    engageWebinar,
    engageEvent,
    engageContent,
    engageTool,
  ],
}
