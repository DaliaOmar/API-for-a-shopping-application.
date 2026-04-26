## Storefront Backend Project

This project is a backend API for an e-commerce (storefront) application built using Node.js, Express, TypeScript, and PostgreSQL.

It provides endpoints for:

User authentication
Product management
Order processing (cart system)
## Technologies Used
PostgreSQL – Database
Node.js / Express – Backend framework
TypeScript – Type safety
dotenv – Environment configuration
db-migrate – Database migrations
jsonwebtoken (JWT) – Authentication
bcrypt – Password hashing
Jasmine – Testing framework
Supertest – API testing
## Setup Instructions 
1. Install Dependencies
```
npm install
```
2. Environment Variables

Create a .env file:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=pajama_store
POSTGRES_TEST_DB=pajama_store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

BCRYPT_PASSWORD=your_secret
SALT_ROUNDS=10

TOKEN_SECRET=your_jwt_secret

ENV=dev
PORT=3000
```
3. Create Databases
```
CREATE DATABASE pajama_store;
CREATE DATABASE pajama_store_test;
```
4. Run Migrations
```
npm run migrate:up
```
5. Start Server
```
npm run start
```
Server runs on:

http://localhost:3000

# Package Scripts 

Make sure package.json includes:

"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "npm run build && jasmine --config=spec/support/jasmine.json",

  "db:create": "psql -U postgres -c \"CREATE DATABASE pajama_store;\"",
  "db:create:test": "psql -U postgres -c \"CREATE DATABASE pajama_store_test;\"",

  "migrate:up": "db-migrate up",
  "migrate:down": "db-migrate down"
}
## Authentication

Some endpoints require JWT authentication.

- Create user:
POST /users

- Response:

{
  "token": "your_jwt_token"
}
- Use token:
Authorization: Bearer <token>

## API Endpoints
# Users
POST /users → Create user
POST /users/authenticate → Login
GET /users → Get all users (Protected)
DELETE /users/:id → Delete user
# Products
GET /products → List products
GET /products/:id → Get product
POST /products → Create product (Protected)
PUT /products/:id → Update product (Protected)
DELETE /products/:id → Delete product (Protected)
# Orders
POST /orders → Create order (Protected)
GET /orders/current/:user_id → Current order
GET /orders/completed/:user_id → Completed orders
POST /orders/:id/products → Add product to order
PUT /orders/:id → Update order status
DELETE /orders/:id → Delete order

## Database Schema
- Users
id SERIAL PRIMARY KEY
firstname VARCHAR(100)
lastname VARCHAR(100)
email VARCHAR(255)
password VARCHAR(255)

- Products
id SERIAL PRIMARY KEY
name VARCHAR(150)
price INTEGER
category VARCHAR(100)

- Orders
id SERIAL PRIMARY KEY
user_id INTEGER REFERENCES users(id)
status VARCHAR(20) DEFAULT 'active'

- Order Products
id SERIAL PRIMARY KEY
order_id INTEGER REFERENCES orders(id)
product_id INTEGER REFERENCES products(id)
quantity INTEGER

## Relationships
User → Orders (1 to many)
Order → Products (many to many via order_products)
Product → Orders (many to many)

## Running Tests

Ensure test database exists:

CREATE DATABASE pajama_store_test;

Run tests:
```
npm test
```
## SQL Operations Coverage

This project demonstrates full CRUD operations using PostgreSQL.

SELECT (Read)
```sql
SELECT * FROM products;
SELECT * FROM orders WHERE id = $1;
```
✔ Retrieves data from database

UPDATE (Modify)
```sql
UPDATE orders SET status = $1 WHERE id = $2;
```
✔ Changes order status (active → complete)

DELETE (Remove)
```sql
DELETE FROM orders WHERE id = $1;
```
✔ Removes record permanently

WHERE (Filtering)
```sql
SELECT * FROM orders WHERE user_id = $1 AND status = 'active';
```
✔ Returns specific filtered data

## Final Notes
All setup steps are fully reproducible
Database names are consistent across all files
Migrations work using a single command
CRUD operations are fully demonstrated across models
API is fully RESTful and production-structured