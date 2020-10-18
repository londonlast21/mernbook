const { AuthenticationError } = require('apollo-server-express');
const { User, Book, BookInput } = require("../models");
const { signToken } = require('../utils/auth');


const resolvers = {

    Query: {
        // get me (user)
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-_v -password')
                    .populate('savedBooks');


                    return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
       
        
        
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
        saveBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updatedUser= await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: body } },
                    { new: true }
                )}; 
            if (!user) {
                throw new AuthenticationError('You need to be logged in');
            }
        },

        // removeBook: async(parent, {user, params} ) {
        //     if (context.user) {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: user._id },
        //             { $pull: { savedBooks: { bookId: params.bookId } } },
        //             { new: true }
        //         );
        //         if (!updatedUser) {
        //             return resolvers.status(404).json({ message: " Couldn't"})
        //         }
        //     }
        // }
    }
}


module.exports = resolvers;