# API Requirements

The company stakeholders want to build an online storefront to showcase their products.
Users should be able to browse products, view product details, and manage orders (cart functionality).

This document defines the required API endpoints and data structures agreed upon between the frontend and backend teams.

---

##  API Endpoints

###  Products

* GET /products
  → Retrieve all products (Index)

* GET /products/:id
  → Retrieve a single product (Show)

* POST /products
  → Create a new product (Token required)

---

###  Users

* GET /users 
  → Retrieve all users

* GET /users/:id 
  → Retrieve a specific user

* POST /users
  → Create a new user (Register)

* POST /users/authenticate
  → Authenticate user and return JWT token

---

###  Orders

* POST /orders 
  → Create a new order for a user

* GET /orders/current/:user_id
  → Get current (active) order for a user

* GET /orders/completed/:user_id 
  → Get completed orders for a user

* POST /orders/:id/products 
  → Add a product to an order
  (Requires product_id and quantity)

---

##  Data Shapes

###  Product

```json
{
  "id": 1,
  "name": "Silk Pajama",
  "price": 50,
  "category": "Women"
}
```

---

###  User

```json
{
  "id": 1,
  "firstname": "Dalia",
  "lastname": "Omar",
  "password": "hashed_password"
}
```

---

###  Order

```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

---

###  Order Product (Join Table)

```json
{
  "order_id": 1,
  "product_id": 2,
  "quantity": 3
}
```

---

##  Authentication

Protected routes require a valid JWT token.

Include in request headers:

```
Authorization: Bearer <token>
```

---

##  Notes

* All protected endpoints require authentication.
* Passwords must be hashed using bcrypt before storing.
* Orders have two statuses:

  * `active`
  * `complete`
* Products can be added to orders via the order-products endpoint.
