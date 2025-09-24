CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
)


INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Damon','08/10/1970', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('George','Clooney','06/05/1961', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Leonardo','DiCaprio','11/11/1974', 1);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Tom','Hanks','07/06/56', 4);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Meryl','Streep','06/07/60', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Natalie','Portman','06/11/71', 1);

--1. Count how many actors are in the table
SELECT COUNT(*) FROM actors;


--2. Try to add a new actor with some blank fields. What do you think the outcome will be ?
INSERT INTO actors (first_name, last_name, number_oscars)
VALUES('John','Doe', 0);

INSERT INTO actors (first_name, age, number_oscars)
VALUES('John', '06/06/66', 0);
-- **********************************************************
-- IT SHOULD RETURN ERROR
-- TO AVOIDE THIS ERROR WE HAVE TO REMOVE NOT NULL CONSTRAINT FROM THE TABLE
-- **********************************************************
