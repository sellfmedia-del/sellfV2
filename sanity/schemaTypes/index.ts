import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import post from './post'
import {engageSchema} from '../engage/schemaTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, post, ...engageSchema.types],
}
