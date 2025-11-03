--**************************
--Part I
--**************************


CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) ,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile(
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN NOT NULL DEFAULT FALSE,
    customer_id INT UNIQUE REFERENCES customer(id)
);

INSERT INTO customer (first_name, last_name)
VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- John is logged in
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (TRUE, (SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe'));

-- Jerome is not logged in
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (FALSE, (SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

--The first_name of the LoggedIn customers
SELECT c.first_name
FROM customer c
JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

--All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile
SELECT c.first_name, cp.isLoggedIn
FROM customer c
LEFT JOIN customer_profile cp ON c.id = cp.customer_id;


--The number of customers that are not LoggedIn
SELECT COUNT(*) AS not_logged_in_count
FROM customer_profile
WHERE isLoggedIn = FALSE;


--**************************
--Part II
--**************************


CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

INSERT INTO book (title, author)
VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

INSERT INTO student (name, age)
VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE library (
    book_fk_id INT REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id)
);


INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES
((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM student WHERE name = 'John'),
 '2022-02-15'),

((SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
 (SELECT student_id FROM student WHERE name = 'Bob'),
 '2021-03-03'),

((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM student WHERE name = 'Lera'),
 '2021-05-23'),

((SELECT book_id FROM book WHERE title = 'Harry Potter'),
 (SELECT student_id FROM student WHERE name = 'Bob'),
 '2021-08-12');

--Select all the columns from the junction table
SELECT * FROM library;

--Select the name of the student and the title of the borrowed books
SELECT s.name, b.title, l.borrowed_date
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

--Select the average age of the children, that borrowed the book Alice in Wonderland
SELECT AVG(s.age) AS avg_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

--Delete a student from the Student table, what happened in the junction table ?
DELETE FROM student
WHERE name = 'Bob';

--easy delete cause of ON DELETE CASCADE
