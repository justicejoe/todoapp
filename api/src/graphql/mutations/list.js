import { ListTC } from '../type-composers/list'

const listMutations = {
  createList: ListTC.getResolver('createOne'),
  updateList: ListTC.getResolver('updateById'),
  removeList: ListTC.getResolver('removeById'),
}

export default listMutations
