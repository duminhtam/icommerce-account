# Account service

Account service for icommerce, this is the example of creating extensible & scalable nodeJS backend microservices. This project is follow **The Twelve-Factor App**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Solution Diagram
This solution follow Microservice, Services must be loosely coupled so that they can be developed, deployed and scaled independently and different services have different data storage requirements

### Components Diagram
![](https://i.imgur.com/C4LF3v8.png)
### Microservice Architecture
![](https://github.com/duminhtam/icommerce-inventory/blob/master/README/Architecture/architecture-overview.png?raw=true)

## Postman Collection
https://www.getpostman.com/collections/c52b25bcf546c568e03a
```
Create Postman environment: development
Add 3 variables: 
- token: null
- INVENTORY_URL: http://localhost:3001
- ACCOUNT_URL: http://localhost:3000
```


## Code Structure
```
.
├── migrations          
│   ├── factories
│   └── seeds
├── src
│   ├── auth
│   │   ├── controllers
│   │   ├── guards
│   │   ├── services
│   │   └── strategies      # Passport Strategies
│   └── user
│       ├── controllers
│       ├── entities
│       └── services
└── test

```

## DB Diagram
We use 3 Postgres Databases, each microservice’s persistent data private to that service and accessible only via its API. A service’s transactions only involve its database.

![](https://github.com/duminhtam/icommerce-inventory/blob/master/README/DB/merged.png?raw=true)

## Sequence Diagram
1. User Register SD

![](https://github.com/duminhtam/icommerce-inventory/blob/master/README/SD/User%20Register.png?raw=true)

2. User Login SD

![](https://github.com/duminhtam/icommerce-inventory/blob/master/README/SD/User%20Login.png?raw=true)

### Prerequisites

What things you need to install & start development

* Node.js v10 or above
* Docker & Docker Compose to start Redis & PostgresDB

### Installing & start development

1. Start docker containers

```
docker-compose up -d
```
2. Install all package using yarn

```
yarn install
```
3. Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Running the tests

This project use Jest & NestJS test

### Unit Test

This project only have 2 sample tests for Controller & Service 

```
yarn test
```
### E2E Test

Run end to end test, you should stop the development server first

```
yarn test:e2e
```

### Test coverage

Get the coverage report

```
yarn test:cov
```

### And coding style tests

We using eslint standard

```
yarn lint
```

### Config
All the environment config store in .env

```dotenv
# Development will enable Data Synchronize
NODE_ENV=development

# Application/Service
PORT=3000
## USER_SERVICE
USER_SERVICE_HOST=localhost
USER_SERVICE_PORT=4000
## AUTH_SERVICE
AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=4010

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5455
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=account

# JWT Config
JWT_SECRET=thisIsSecre(t)
JWT_EXPIRES_IN=1h

```

## API Documents (swagger)

```bash
http://localhost:3000/docs
```

## Stay in touch

- Author - duminhtam@gmail.com

## License

This project is [MIT licensed](LICENSE).
