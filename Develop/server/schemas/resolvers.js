const { User, Book } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {

    Query: {
        // get me (user)
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
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
            
        }

        
        
    },
//only these four functions necessary for assignment
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };

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