const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { default: mongoose } = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { MONGODB_URI } = require('./utils/config')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    editAuthor(
      name: String!,
      setBornTo: Int!,
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    bookCount: async () => await Book.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          $and: [
            { author: { $in: author._id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')
        return books
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: { $in: author._id } }).populate(
          'author'
        )
        return books
      }

      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        )
        return books
      }
      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: async (root, args, context) => {
      return context
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      const author = await Author.findById(root.id)

      return books.filter(
        (book) => book.author.toString() === author._id.toString()
      ).length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Permission error', {
          extensions: {
            code: 'AUTH',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
        })
      }

      const book = new Book({ ...args, author })

      try {
        await author.save()
        await book.save()
        return book
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Permission error', {
          extensions: {
            code: 'AUTH',
          },
        })
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) return null

        author.born = args.setBornTo

        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Edit author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
