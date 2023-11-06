-- DROP the existing tables (if they exist) to start fresh
DROP TABLE IF EXISTS calls;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS payments;

-- Create the "calls" table to record call details
CREATE TABLE calls (
    call_id SERIAL PRIMARY KEY,
    customer_id INT,
    call_duration INT, -- in minutes
    data_usage INT, -- in MB
    call_cost DECIMAL(10, 2), -- in dollars
    call_date DATE
);

-- Create the "customer" table to store customer information
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone_number VARCHAR(20) -- Assuming phone numbers are in a string format
);

-- Create the "payments" table to record payments
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    customer_id INT,
    payment_amount DECIMAL(10, 2), -- in dollars
    payment_date DATE
);

-- Insert sample data into the "customer" table
INSERT INTO customer (name, phone_number)
VALUES 
    ('John', '123-456-7890'),
    ('Jane', '987-654-3210'),
    ('Alice', '555-555-5555'),
    ('Bob', '888-888-8888'),
    ('Charlie', '999-999-9999');

-- Insert sample data into the "calls" table
INSERT INTO calls (customer_id, call_duration, data_usage, call_cost, call_date)
VALUES
    (1, 15, 100, 10.50, '2023-10-20'),
    (1, 20, 150, 15.75, '2023-10-21'),
    (2, 10, 80, 8.00, '2023-10-19'),
    (2, 30, 200, 20.25, '2023-10-20'),
    (3, 5, 50, 5.25, '2023-10-15'),
    (3, 10, 100, 10.50, '2023-10-16'),
    (4, 8, 75, 7.88, '2023-10-14'),
    (4, 12, 100, 11.50, '2023-10-15'),
    (5, 20, 150, 16.75, '2023-10-13'),
    (5, 15, 120, 12.75, '2023-10-14');

-- Insert sample data into the "payments" table
INSERT INTO payments (customer_id, payment_amount, payment_date)
VALUES
    (1, 25.00, '2023-10-22'),
    (2, 30.00, '2023-10-20'),
    (3, 15.00, '2023-10-16'),
    (4, 20.00, '2023-10-15'),
    (5, 22.50, '2023-10-14');