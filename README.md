# Inventory Service

Account service for icommerce, this is the example of creating extensible & scalable nodeJS backend microservices. This project is follow **The Twelve-Factor App**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


## Solution Diagram
![](https://i.imgur.com/C4LF3v8.png)

## Postman Collection
https://www.getpostman.com/collections/c52b25bcf546c568e03a
```
Create Postman environment: development
Add 3 variables: 
- token: null
- INVENTORY_URL: http://localhost:3001
- ACCOUNT_URL: http://localhost:3000
```


## Structure
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


### Prerequisites

What things you need to install & start development

* Node.js v10 or above
* Docker & Docker Compose to start Redis & PostgresDB

### Installing

Install all package using yarn

```
yarn install
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
yarn test:e2e
```

### And coding style tests

We using eslint standard

```
yarn lint
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

### Config
All the environment config store in .env


## API Documents (swagger)

```bash
http://localhost:3000/docs
```

## Stay in touch

- Author - duminhtam@gmail.com

## License

This project is [MIT licensed](LICENSE).
