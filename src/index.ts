import { subscriptions } from './bus/users/subscriptions';
import { server, app, httpServer } from './init/server';

const PORT = 4000;
const corsOptions = {
  origin: ['ws://localhost:4000', 'https://studio.apollographql.com'],
};

const runServer = async () => {
  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  );
};

runServer();
