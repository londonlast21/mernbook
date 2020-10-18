// import the graphQL tagged template function
const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]

    },

    input BookData {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String

    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    },

    type Auth {
        _id: Int
        token: ID!
        user: User
    },


    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(title: String!): [Book]
        book(bookId: String!): Book
     },
 
     type Mutation {
         login(email: String!, password: String!): Auth
         addUser(username: String!, email: String!, password: String!): Auth
         saveBook(bookId: String!, authors: [String]!, description: String!, title: String!, image: String!, link: String!): Book
         removeBook(bookId: String!): User
         
    }

`








// export the typeDefs
module.exports = typeDefs;