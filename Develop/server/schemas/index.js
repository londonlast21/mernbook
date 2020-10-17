const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { model } = require('../config/connection');


module.exports = { typeDefs, resolvers };