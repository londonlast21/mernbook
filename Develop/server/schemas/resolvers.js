const { User, Book } = require("../models");



const resolvers = {

    Query: {
        books: async () => {
            return Book.find().sort({ _id: -1  });
        }
    }
};


module.exports = resolvers;