import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const schema = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello client',
  },
};

const PORT = 4000;

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.start().then((res) => {
  server.applyMiddleware({ app, path: '/' });
  app.listen({ port: PORT }, () =>
    console.log(`Gateway API running at port: ${PORT}`),
  );
});

/* server.start();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready`);
}); */
