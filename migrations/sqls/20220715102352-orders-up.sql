/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    order_status VARCHAR(8) CHECK(order_status = 'active' OR order_status = 'complete'),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);

INSERT INTO orders (user_id, order_status) VALUES (1, 'active');
INSERT INTO orders (user_id, order_status) VALUES (2, 'complete');
INSERT INTO orders (user_id, order_status) VALUES (3, 'complete');
INSERT INTO orders (user_id, order_status) VALUES (2, 'active');