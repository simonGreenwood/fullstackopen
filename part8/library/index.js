const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer") //prettier-ignore
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const http = require("http")

const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

const User = require("./models/User")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const loaders = require("./loaders")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to", process.env.MONGODB_URI)
  })
  .catch((error) => console.log(error))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return {
            currentUser,
            loaders,
          }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  )
}
start()
