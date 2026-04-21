# Storefront Backend Project

This project is a backend API for an e-commerce (storefront) application built using **Node.js, Express, TypeScript, and PostgreSQL**.
It provides endpoints for user authentication, product management, and order processing.

---

##  Technologies Used

* PostgreSQL – Database
* Node.js / Express – Backend framework
* TypeScript – Type safety
* dotenv – Environment variable management
* db-migrate – Database migrations
* jsonwebtoken (JWT) – Authentication
* bcrypt – Password hashing
* Jasmine – Testing framework
* Supertest** – API testing



##  Setup Instructions

### 1. Install Dependencies

```bash
npm install
```



### 2. Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

BCRYPT_PASSWORD=your_secret
SALT_ROUNDS=10

TOKEN_SECRET=your_jwt_secret

ENV=dev
PORT=3000
```



### 3. Database Setup

Make sure PostgreSQL is running, then open `psql` and run:

```sql
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```



### 4. Run Migrations

Install db-migrate globally :

```bash
npm install -g db-migrate
```

Run migrations:

```bash
npm run db-migrate up
```

---

### 5. Start Server

```bash
npm run watch
```

Server will run on:

```
http://localhost:3000
```

---

##  Authentication

Some endpoints require a JWT token.

### Create a user:

```http
POST /users
```

Response includes a token:

```json
{
  "token": "your_jwt_token"
}
```



### Use token in requests:

```
Authorization: Bearer your_jwt_token
```

---

##  API Endpoints

### Users

* `POST /users` → Create user
* `POST /users/authenticate` → Login
* `GET /users` → Get all users (Protected)

---

### Products

* `GET /products` → List products
* `GET /products/:id` → Get product
* `POST /products` → Create product (Protected)

---

### Orders

* `POST /orders` → Create order (Protected)
* `GET /orders/current/:user_id` → Current order
* `GET /orders/completed/:user_id` → Completed orders
* `POST /orders/:id/products` → Add product to order

---

##  Running Tests

Make sure test database exists:

```sql
CREATE DATABASE storefront_test;
```

Run tests:

```bash
npm run test
```

---




