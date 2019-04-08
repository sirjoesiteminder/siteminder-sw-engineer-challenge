# Siteminder SW Engineer test submission

Answer by Chris Malherbe to the Sitemeinder SW Enineering test 2.2.

This service features a front end and back end to send emails via SendGrid and Mailgun with automatic failover. 

Some newer features have been used in this project to make it a bit more interesting like:
- Native ES6 modules in Node by using `--experimental-modules`, this is not fit for production and is not supported in some libs like Jest (yet).
- React Hooks
- Yarn workspaces
- Hapi 18.x


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. The project is deployed to Heroku. You can see it running [here](https://siteminder-app.herokuapp.com).

### Prerequisites

Please install Yarn and Node. If not installed by following the instructions [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable).


### Installing dependcies

Install dependenies by running

```
yarn install
```

## Running the tests

Tests are written with Jest. To run all tests by running:

```
yarn test
```

Examples of tests written:
[Node](https://github.com/ChrisMalherbe/siteminder-sw-engineer-challenge/blob/master/packages/server/src/index.test.mjs#L8)
[React](https://github.com/ChrisMalherbe/siteminder-sw-engineer-challenge/blob/master/packages/client/src/validate-email-array.test.js)
[React](https://github.com/ChrisMalherbe/siteminder-sw-engineer-challenge/blob/master/packages/client/src/App.test.js)


### And coding style tests

ESLint is implemented, you can run it with

```
Yarn lint
```

### Local development

Watch the server and client by running

```
yarn watch
```

Please set the following keys in your `.env` file
- SENDGRID_API_KEY
- MAILGUN_API_KEY


## Deployment

Add additional notes about how to deploy this on a live system

## TODO
- Add more tests, Unit and E2E
- Implement FlowType (or TypeScript)


## Built With

* [water.css](https://github.com/kognise/water.css) - Very minimal CSS framework with no classes
* [React](https://reactjs.org/) - Clientside SPA framework
* [Node](https://node.org) - Serverside 
* [Hapi](https://github.com/hapijs/hapi/) - Routing framework

## Authors

**Chris Malherbe** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
Thank you for taking the time to review my submission and I look forward to hearing back from the technical team.
