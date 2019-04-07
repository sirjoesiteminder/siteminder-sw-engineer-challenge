import Hapi from 'Hapi';
import Inert from 'Inert';
import Path from 'path';
import send from './email/index.mjs';
import Boom from 'Boom';

// Create a server with a host and port
const __dirname = Path.dirname(new URL(import.meta.url).pathname);
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 8000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../../client/build'),
    },
  },
});

// Start the server
const start = async () => {
  try {
    await server.register(Inert);
    
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.'
        },
      },
    });
    
    // Endpoint for sending an email
    server.route({
      method: 'POST',
      path: '/email',
      // TODO: add API validation with JOI
      handler: async ({body}, h) => {
        try {
          return await send(body);
        }
        catch(err) {
          console.error(err);
          throw Boom.internal(err);
        }
      }
    });    
    
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
