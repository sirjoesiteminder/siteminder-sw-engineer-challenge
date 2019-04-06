import Hapi from 'hapi';
import send from './email/index.mjs';

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000,
});

// Add the route
server.route({
  method: 'POST',
  path: '/email',
  handler: async (request, h) => {
    console.log(request, h);
    await send();
    return 'hello world';
  },
});

// Start the server
const start = async function () {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
