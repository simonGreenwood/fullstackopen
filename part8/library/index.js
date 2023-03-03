const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { v1: uuid } = require("uuid")
require("dotenv").config()
const Author = require("./models/Author")
const Book = require("./models/Book")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { GraphQLError } = require("graphql")
const User = require("./models/User")
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to", process.env.MONGODB_URI)
  })
  .catch((error) => console.log(error))

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }


  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favouriteGenre:String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author")
      }
      if (args.author && !args.genre) {
        return Book.find({ author: args.author }).populate("author")
      }
      if (!args.author && args.genre) {
        return Book.find({ genres: { $all: [args.genre] } }).populate("author")
      }
      return Book.find({
        genres: { $all: [args.genre] },
        author: args.author,
      }).populate("author")
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root, args) => {
      const booksByAuthor = await Book.find({ author: root.id })
      return booksByAuthor.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      if (!(await Author.findOne({ name: args.author }))) {
        const newAuthor = new Author({
          name: args.author,
        })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("error creating author", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          })
        }
      }
      const theAuthor = await Author.findOne({ name: args.author })
      const newBook = new Book({
        ...args,
        author: theAuthor._id,
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return newBook
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError("Changing number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      try {
        await newUser.save()
      } catch (error) {
        throw new GraphQLError("Error when creating new user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return newUser
    },
    login: async (root, args) => {
      const password = "secret"
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== password) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      console.log(process.env.JWT_SECRET, userForToken)
      console.log(
        jwt.verify(
          jwt.sign(userForToken, process.env.JWT_SECRET),
          process.env.JWT_SECRET
        )
      )
      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      }
    },
  },
}

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
