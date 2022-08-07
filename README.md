# Storefront Backend Project

## Getting Started

1. Create the .env file and set [Enviroment variables](#enviroment-variables)
2. Install all dependencies with `npm install`
3. Create the Databases and User in psql:
```
CREATE USER storefront_backend_user WITH PASSWORD '123qwe';
CREATE DATABASE storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_backend_user;
CREATE DATABASE storefront_testdb;
GRANT ALL PRIVILEGES ON DATABASE storefront_testdb TO storefront_backend_user;
```
4. populate the Database with `npm run db-up` (Windows) or `npm run db-upL` (Linux and Mac)
5. Transpile Typescript and start the server on port 3000 with `npm run watch` (Windows) or `npm run watchL` (Linux and Mac)
6. Run all tests with `npm run test` (Windows) or `npm run testL` (Linux and Mac)

## Data Shapes

#### Users
- id => SERIAL PRIMARY KEY
- firstname => VARCHAR(70)
- lastname => VARCHAR(70)
- username => VARCHAR(100)
- password => VARCHAR(200)

#### Products
- id => SERIAL PRIMARY KEY
- name => VARCHAR(100)
- price => DECIMAL(10, 2)
- category VARCHAR(100)

#### Orders
- id => SERIAL PRIMARY KEY,
- user_id => integer NOT NULL,
- order_status => VARCHAR(8) CHECK(order_status = 'active' OR order_status = 'complete'),
- CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

#### Order_products
- id => SERIAL PRIMARY KEY,
- order_id => integer NOT NULL,
- product_id => integer NOT NULL,
- quantity => integer CHECK(quantity > 0),
- CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
- CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

## Routes

#### Users

- Index [GET] `/` => token required
- Show [GET] `/:id` => token required
- Create [POST] `/` => SIGN UP
- Authenticate [POST] `/auth` => SIGN IN
- Delete [DELETE] `/:id` => token required

#### Products

- Index [GET] `/products`
- Show [GET] `/products/:id`
- Create [POST] `/products` => token required
- Delete [DELETE] `/products/:id` => token required

#### Orders

- Index [GET] `/orders`
- Get all order products [GET] `/orders/article`
- Show [GET] `/orders/:id`
- Show Order products [GET] `/orders/article/:id`
- Show Order by User Id [GET] `/orders/user/:id` => token required
- Show active by User Id [GET] `/orders/active/:id` => token required
- Show complete by User Id [GET] `/orders/complete/:id` => token required
- Create [POST] `/orders` => token required
- Add Product to Order [POST] `/orders/article` => token required
- Delete [DELETE] `orders/:id` => token required
- Delete Order Product by Id [DELETE] `/orders/article/:id/:prod_id` => token required
- Delete All Order Products [DELETE] `/orders/article/:id` => token required

## Enviroment Variables

Since this project is configured using a .env file (added to .gitignore) you need to create one.
This is the configuration I used:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DIST_DB=storefront
POSTGRES_TEST_DB=storefront_testdb
POSTGRES_USER=storefront_backend_user
POSTGRES_PASSWORD=123qwe
SALTROUNDS=13
PEPPER=BDrXE3LB8VG@0V1Qy4WE
TOKEN_SECRET=7Y26f8zhNc^0
```