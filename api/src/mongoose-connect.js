import config from 'config'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import timestamps from 'mongoose-timestamp'

const { uri, mongooseOptions } = config.get('db.mongodb')
const options = { ...mongooseOptions, promiseLibrary: Promise, useCreateIndex: true }
mongoose.Promise = Promise
mongoose.connect(uri, options)
mongoose.plugin(timestamps)
