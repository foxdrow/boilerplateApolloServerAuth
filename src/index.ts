import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

import typeDefs from "./typeDefs";
import { resolvers } from "./resolvers/index";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context(request) {
    return {
      prisma,
      request,
    };
  },
});

const options = {
  port: 8000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
};

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
