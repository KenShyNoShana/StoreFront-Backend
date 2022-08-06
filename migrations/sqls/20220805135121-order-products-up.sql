/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer CHECK(quantity > 0),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 4);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 2, 5);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (4, 1, 4);