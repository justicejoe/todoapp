import mongoose from 'mongoose'

const { Schema } = mongoose

const ListSchema = new Schema({
  detail: { type: String ,index: true },
  status: { type: Boolean, index: true },
})

export const ListModel = mongoose.model('List', ListSchema)

export default ListModel
