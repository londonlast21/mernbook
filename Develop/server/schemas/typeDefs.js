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

    input BookInput {
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


    type Query {
       me: User
       users: [User]
       user(username: String!): User
       books(username: String!): [Book]
       book(bookId: String!): Book
    },

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: String!, authors: [String]!, description: String!, title: String!, image: String!, link: String!): Book
        removeBook(bookId: String!): User
        
    }

    type Auth {
        token: ID!
        user: User
    }

`








// export the typeDefs
module.exports = typeDefs;