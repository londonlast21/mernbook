const { User, Book } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {

    Query: {
        // get me (user)
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-_v -password')
                    .populate('savedBooks')
            }
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-_v -password')
            .populate('savedBooks')

        },
        // get single user
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-_v -password')
            .populate('savedBooks')
            
        },

        
        book: async (parent, { title }) => {
            return Book.findOne({ title });
        },

        books: async (parent, { title }) => {
            const params = title ? { title } : {};
            return Book.find(params)
        }
    },
//only these four functions necessary for assignment
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
            return user;

        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };

        },
        // saveBook: {

        // },
        removeBook: {}
    }
}


module.exports = resolvers;