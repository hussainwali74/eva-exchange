<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# EvaExchange

EvaExchange is an educational stock trading simulation backend application. It allows users to register, receive a trading portfolio, and perform buy/sell operations on registered shares. The purpose of the application is to help users understand trading concepts and terminology by simulating real-time share trading scenarios.

## Features

- **User Registration & Authentication:** Users can register and are automatically assigned a trading portfolio. All trading operations require JWT authentication.
- **Share Management:** Register new shares with unique, three-letter uppercase symbols. Share prices can be updated on an hourly basis.
- **Portfolio Management:** Users have portfolios that track their share holdings.
- **Trading Operations:** Users can buy and sell shares using RESTful API endpoints. Trades are validated for sufficient balance and portfolio conditions.
- **Transaction Logging:** All buy and sell operations are logged for auditing and learning purposes.
- **API Docs:** Swagger UI documentation is available at `/docs` after starting the server.
- **Database Seeding:** Use `typeorm-seeding` to pre-populate the database with sample data.
- **Tech Stack:** NestJS, TypeORM, MySQL, JWT, Swagger.

## Requirements

- Node.js (recommended v16+)
- MySQL server

## Getting Started

### Clone

```bash
git clone git@github.com:hussainwali74/eva-exchange.git
cd eva-exchange
```

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and provide your own values. The included `.env` is for demonstration only.

### Running the App

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod
```

#### API Documentation

Access Swagger UI at: [http://localhost:3000/docs](http://localhost:3000/docs)

### Database Seeding

Populate the database with sample users and trading data:

```bash
npm run seed:run
```

## Usage Overview

- Register as a user to receive a portfolio.
- Register new shares (admin or privileged users).
- Use authenticated endpoints to buy and sell shares.
- Share symbols must be unique, three uppercase letters (e.g., "ABC").
- All share prices have two decimal places.
- You can only buy registered shares and only sell shares you own.

## Database Design

Database schema diagrams and files can be found in the root folder.

## Assumptions

- Registered users have a portfolio by default and can buy/sell shares.
- The frontend application is out of scope for this repository.

---

EvaExchange is designed as a learning tool for stock market trading and is not for real financial transactions.
