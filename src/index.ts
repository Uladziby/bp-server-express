import { server, app } from './init/server';

const PORT = 4000;

server.then(() => {
  app.listen({ port: PORT }, () =>
    console.log(`Gateway API running at port: http://localhost:${PORT}`),
  );
});
