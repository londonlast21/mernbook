const { User, Book } = require("../models");



const resolvers = {

    Query: {
        savedBooks: async () => {
            return Book.find().sort({ _id: -1  });
        }
    }
};


module.exports = resolvers;