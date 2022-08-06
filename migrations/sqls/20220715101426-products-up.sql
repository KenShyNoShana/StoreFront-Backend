/* Replace with your SQL commands */
CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price DECIMAL(10, 2), category VARCHAR(100));

INSERT INTO products (name, price, category) VALUES ('Pizza', 15.99, 'fast-food');
INSERT INTO products (name, price, category) VALUES ('Orange', 7.99, 'fruit');