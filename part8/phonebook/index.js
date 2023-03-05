const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const {ApolloServerPluginDrainHttpServer} = require("@apollo/server/plugin/drainHttpServer") //prettier-ignore
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const http = require("http")

require("dotenv").config()
const jwt = require("jsonwebtoken")

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const User = require("./models/user")

const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb")
  })
  .catch((error) => {
    console.log("error connecting to mongodb:", error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
          const currentUser = await User.findById(decodedToken.id).populate(
            "friends"
          )
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server is now runnign on http://localhost:${PORT}`)
  })
}

start()
