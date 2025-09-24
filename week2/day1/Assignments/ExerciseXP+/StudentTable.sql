CREATE DATABASE  bootcamp;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);


INSERT INTO students (id, first_name, last_name, birth_date)
VALUES
(1, 'Marc', 'Benichou', '1998-11-02'),
(2, 'Yoan', 'Cohen', '2010-12-03'),
(3, 'Lea', 'Benichou', '1987-07-27'),
(4, 'Amelia', 'Dux', '1996-04-07'),
(5, 'David', 'Grez', '2003-06-14'),
(6, 'Omer', 'Simpson', '1980-10-03');

INSERT INTO students (first_name, last_name, birth_date)
VALUES ('Anas', 'Kessou', '2000-05-01');

--Fetch all of the data from the table
SELECT * FROM students;

--Fetch the student whose last_name is Benichou AND first_name is Marc
SELECT first_name, last_name FROM students WHERE first_name = 'Marc' AND last_name = 'Benichou';

--Fetch the students whose last_names are Benichou OR first_names are Marc
SELECT first_name, last_name FROM students WHERE first_name = 'Marc' OR last_name = 'Benichou';

--Fetch the students whose first_names contain the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a%';

--Fetch the students whose first_names start with the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE 'a%';

--Fetch the students whose first_names end with the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a';

 --Fetch the students whose second to last letter of their first_names are a (Example: Leah)
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a_';

--Fetch the students whose id’s are equal to 1 AND 3 .
SELECT first_name, last_name FROM students WHERE id = 1 OR id = 3;


--Fetch the students whose birth_dates are equal to or come after 1/01/2000. (show all their info)
SELECT * FROM students WHERE birth_date >= '2000-01-01';
