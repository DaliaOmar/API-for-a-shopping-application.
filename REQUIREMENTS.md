📦 API Requirements

The company stakeholders aim to build an online storefront to showcase products.

Users should be able to:

browse products
view product details
create and manage orders (cart functionality)
authenticate securely

This document defines the required API endpoints and database structures agreed upon by frontend and backend teams.

### API Endpoints

# Products
GET /products
→ Retrieve all products (Index)
GET /products/:id
→ Retrieve a single product (Show)
POST /products
→ Create a new product (Protected - JWT required)
PUT /products/:id
→ Update a product (Protected - JWT required)
DELETE /products/:id
→ Delete a product (Protected - JWT required)

# Users
GET /users
→ Retrieve all users
GET /users/:id
→ Retrieve a specific user
POST /users
→ Create a new user (Register)
POST /users/authenticate
→ Authenticate user and return JWT token
DELETE /users/:id
→ Delete a user (Optional but included for full CRUD coverage)

# Orders
POST /orders
→ Create a new order for a user
GET /orders/current/:user_id
→ Get current (active) order for a user
GET /orders/completed/:user_id
→ Get completed orders for a user
POST /orders/:id/products
→ Add a product to an order (requires product_id and quantity)
PUT /orders/:id
→ Update order status (active → complete)
DELETE /orders/:id
→ Delete an order
## Database Schema
 # Users Table
```sql
id SERIAL PRIMARY KEY,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
```
 # Products Table
```sql
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
price INTEGER NOT NULL,
category VARCHAR(100)
```
 # Orders Table
```sql
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
status VARCHAR(20) DEFAULT 'active'
```
 # Order Products (Join Table)
```sql
id SERIAL PRIMARY KEY,
order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
quantity INTEGER NOT NULL
```
## Relationships
A User can have many Orders (1 → N)
An Order belongs to one User
An Order contains many Products (M → N via order_products)
A Product can belong to many Orders
## Authentication

Protected routes require a valid JWT token.

Include token in request headers:

Authorization: Bearer <token>
## Security Rules
Passwords must be hashed using bcrypt before storage
Only authenticated users can create/update/delete products
Orders are user-specific and cannot be accessed by other users
## Order Status

Orders support two states:

active → cart in progress
complete → finalized order
## Notes
All endpoints follow RESTful conventions
Database enforces relationships using foreign keys
Cascade delete is enabled for relational integrity
API supports full CRUD across all major entities (Users, Products, Orders)