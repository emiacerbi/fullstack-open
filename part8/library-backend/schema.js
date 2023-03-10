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

  type Subscription {
    bookAdded: Book!
  }
  `

module.exports = typeDefs
