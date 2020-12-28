import { ListTC } from '../type-composers/list'

const listQueries = {
  list: ListTC.getResolver('findOne'),
  listId: ListTC.getResolver('findById'),
  lists: ListTC.getResolver('findMany'),
  listPagination: ListTC.getResolver('pagination'),
}

export default listQueries
