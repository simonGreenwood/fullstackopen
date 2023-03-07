const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer") //prettier-ignore
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const http = require("http")

require("dotenv").config()

const User = require("./models/User")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to", process.env.MONGODB_URI)
  })
  .catch((error) => console.log(error))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
