import type {SchemaTypeDefinition} from 'sanity'
import {engageInsight, engageShowcase} from './engageContent'
import engageEvent from './engageEvent'
import engagePerson from './engagePerson'
import engageSeo from './engageSeo'
import engageSettings from './engageSettings'
import engageWebinar from './engageWebinar'

export const engageSchema: {types: SchemaTypeDefinition[]} = {
  types: [
    engageSeo,
    engageSettings,
    engagePerson,
    engageWebinar,
    engageEvent,
    engageShowcase,
    engageInsight,
  ],
}
