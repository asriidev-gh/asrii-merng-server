const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
// const { MONGODB } = require("./config.js");

// Public subscription, can be use in resolvers
const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

// Connect to DB then run node in server in port 5000
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected!");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`The Server Running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
