<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[EvaExchange] Eva Exchange App created with NestJS, TypeOrm, MySQL, JWT and SwaggerUI.

## Clone

Clone the app from the repo: git@github.com:hussainwali74/eva-exchange.git

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### After installation proceed to http://localhost:3000/docs to access the api docs 

.env file included here just for completeness if this is to be used replace the values with your own values.
### SEEDING
typeorm-seeding package has been used to populate the db with fake data
to populate the database run the following command
```
npm run seed:run
```

## db design 
please find db design in the root folder
--
## Asumptions:
if a user is registered he has portfolio by default and he can buy/sell shares