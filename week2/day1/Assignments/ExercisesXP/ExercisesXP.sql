CREATE DATABASE public;

-- Items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price INT
);

-- Customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);

-- Insert items
INSERT INTO items (name, price)
VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

-- Insert customers
INSERT INTO customers (firstname, lastname)
VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

--select all the items
SELECT * FROM items;

--All the items with a price above 80 (80 not included)
SELECT * FROM items
WHERE price > 80;

--All the items with a price below 300. (300 included)
SELECT * FROM items
WHERE price <= 300;

--All customers whose last name is ‘Smith’ (What will be your outcome?)
SELECT * FROM customers
WHERE lastname = 'Smith';

--All customers whose last name is ‘Jones’
SELECT * FROM customers
WHERE lastname = 'Jones';

--All customers whose firstname is not ‘Scott’
SELECT * FROM customers
WHERE firstname != 'Scott';

