import path from 'path'
import { createServer } from 'http'

import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from 'config'
// import ConnectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import flash from 'express-flash'
import jwt from 'express-jwt'
import mongoose from 'mongoose'
import passport from 'passport'

import depthLimit from 'graphql-depth-limit'

import './mongoose-connect'
import schema from './graphql'

const app = express()

app.set('trust proxy', 1)
app.use(compression())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(cookieParser())


// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())

app.use(cors())

const gqlPath = '/graphql'
// app.use(
//   gqlPath,
//   async (req, res, next) => {
//       next()
//   }
// )

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  validationRules: [depthLimit(3)],
})
apolloServer.applyMiddleware({ app, path: gqlPath })

const server = createServer(app)
// apolloServer.installSubscriptionHandlers(server)

const port = config.get('app.port')
const host = config.get('app.host')
server.listen({ port }, () => {
  const { graphqlPath, subscriptionsPath } = apolloServer
  console.log(`Server running on port: ${port}`)
  console.log(`GraphQL path: http://${host}:${port}${graphqlPath}`)
  console.log(`Subscriptions path: ws://${host}:${port}${subscriptionsPath}`)
})

const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected')
    process.exit(0)
  })
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

