const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author: foundAuthor.id })
      return foundBooks.length
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

      console.log(author)

      const book = new Book({ ...args, author })

      console.log(book)

      try {
        await author.save()
        await book.save()
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
