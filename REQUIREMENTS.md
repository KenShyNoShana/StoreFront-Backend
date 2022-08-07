# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

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

- Index [GET] `/orders` => token required
- Get all order products [GET] `/orders/article` => token required
- Show [GET] `/orders/:id` => token required
- Show Order products [GET] `/orders/article/:id` => token required
- Show Order by User Id [GET] `/orders/user/:id` => token required
- Show active by User Id [GET] `/orders/active/:id` => token required
- Show complete by User Id [GET] `/orders/complete/:id` => token required
- Create [POST] `/orders` => token required
- Add Product to Order [POST] `/orders/article` => token required
- Delete [DELETE] `orders/:id` => token required
- Delete Order Product by Id [DELETE] `/orders/article/:id/:prod_id` => token required
- Delete All Order Products [DELETE] `/orders/article/:id` => token required

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