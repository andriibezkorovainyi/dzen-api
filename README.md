# DZEN-API

Dzen-api is a component of back-end part of SPA comments app,
which is responsible for maintaining WebSocket connection with the client,
and provide necessary app functionality.

[Use this link to connect to the WebSocket Server](wss://dzen-api.herokuapp.com)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

- <b>Server</b>: Establishing WebSocket connection with the client and events handing.
- <b>Database</b>: Storing comments information in a database within several tables using relations.
- <b>Broadcasting</b>: Sending and receiving messages in real time for multiple users.
- <b>SingleResponse</b>: Sending and receiving messages in real time for single user.
- <b>Files</b>: Creating file records in database and storing them on cloud service.
- <b>Files validation</b>: Validating files before storing them on cloud service.
- <b>Comments validation</b>: Validating comments before storing them in database.
- <b>Containerization</b>: Containerizing the application using Docker.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [WebSocket](https://www.npmjs.com/package/ws)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Axios](https://www.npmjs.com/package/axios)
- [Heroku](https://www.heroku.com/)
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://www.npmjs.com/package/husky)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged)
- 

## Installation

To install the project, follow these steps:

1. Clone the repository with git clone
2. Run `npm install` in the root directory
3. The project requires these environment variables to be set:
  - `DATABASE_URL` - the url of the database(e.g. `postgresql://user:password@localhost:5432/database`)
  - `PORT` - the port websocket server will be running on(Heroku use it).
  - `HTTP` - the url of the http server to connect.

  - `AWS_ACCESS_KEY_ID`,
  - `AWS_SECRET_ACCESS_KEY`,
  - `AWS_REGION` - credentials for AWS S3 service.

4. Run `npm run dev` in the root directory to start the development server
6. Run `npm run start` in the root directory to start the production server

## Contributing

Contributions are welcome! If you want to contribute to [dzen-api], follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

