import { schemaComposer } from 'graphql-compose'

import queryFields from './queries'
import mutationFields from './mutations'

schemaComposer.Query.addFields(queryFields)
schemaComposer.Mutation.addFields(mutationFields)
const GQLSchema = schemaComposer.buildSchema()

export default GQLSchema
