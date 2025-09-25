--**************************
--Exercise 1  : DVD Rental
--**************************


--Get a list of all the languages, from the language table
SELECT * FROM language;

--Get a list of all films joined with their languages – select the following details : film title, description, and language name
SELECT f.title, f.description, l.name
FROM film f
JOIN language l ON f.language_id = l.language_id;

--Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name
SELECT l.name, f.title, f.description
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;

--Create a new table called new_film with the following columns : id, name. Add some new films to the table
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO new_film (name) VALUES 
('The AI Revolution'),
('Lost in Casablanca'),
('Journey to Mars');

--Create a table customer_review
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--Add 2 movie reviews. Make sure you link them to valid objects in the other tables
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Amazing Storytelling', 9, 'A thought-provoking movie about AI and humanity.'),
(2, 1, 'Classic vibes', 8, 'Felt like a modern Casablanca with a twist.');

--Delete a film that has a review from the new_film table, what happens to the customer_review table?
DELETE FROM new_film WHERE id = 2;

--the review will be deleted too automatically because of the ON DELETE CASCADE


--===============================
--checking
SELECT * FROM customer_review;

