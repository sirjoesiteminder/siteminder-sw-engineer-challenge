import Hapi from 'hapi';
import Joi from 'joi';
import Inert from 'inert';
import Path from 'path';
import send from './email/index.mjs';
import Boom from 'boom';

// Create a server with a host and port
const __dirname = Path.dirname(new URL(import.meta.url).pathname);
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 8000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../../client/build'),
    },
  }
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
      options: {
        validate: {
          payload: {
            to: Joi.string().min(3).max(140),
            cc: Joi.string().allow(""),
            bcc: Joi.string().allow(""),
            subject: Joi.string().required(),
            body: Joi.string().required(),
          },
          failAction: handleError,
        },
        cors: true
      },
      handler: async (req, h) => {
        try {
          await send(req.payload);
          return 'email sent';
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

const handleError = function (request, h, err) {

  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0];
    return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(err.details)}`)
    .code(400)
    .takeover();
  }

  return h.response(err)
  .takeover()
};
