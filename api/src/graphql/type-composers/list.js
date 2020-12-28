import { composeWithMongoose } from 'graphql-compose-mongoose'

import { ListModel } from '../../models'

export const ListTC = composeWithMongoose(ListModel)

export default ListTC
