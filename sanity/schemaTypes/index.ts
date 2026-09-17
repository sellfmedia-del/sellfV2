import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, post],
}