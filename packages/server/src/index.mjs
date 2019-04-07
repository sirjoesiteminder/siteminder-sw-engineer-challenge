import Hapi from 'hapi';
import Inert from 'inert';
import Path from 'path';
import send from './email/index.mjs';

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
      handler: async (request, h) => {
        console.log(request, h);
        await send();
        return 'hello world';
      },
    });    
    
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
