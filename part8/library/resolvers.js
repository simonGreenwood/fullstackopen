const Book = require("./models/Book")
const Author = require("./models/Author")
const User = require("./models/User")
const jwt = require("jsonwebtoken")
const { GraphQLError } = require("graphql")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

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
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook.populate("author") })
      return newBook.populate("author")
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
