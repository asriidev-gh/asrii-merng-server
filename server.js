require("dotenv").config();

const { ApolloServer, PubSub } = require("apollo-server");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

// Public subscription, can be use in resolvers
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

// MONGODB & APOLLO SERVER CONNECTION
const connectDB = require("./database/db");
let res = connectDB();

const PORT = process.env.PORT || 5000;
if (res) {
  server.listen({ port: PORT });
} else {
  console.log("Server Failed to Start!");
}
