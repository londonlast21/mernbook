const { User, Book } = require("../models");



const resolvers = {

    Query: {
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find().sort({ _id: -1  });
        },
    }
};


module.exports = resolvers;