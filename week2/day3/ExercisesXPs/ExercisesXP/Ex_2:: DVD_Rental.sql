--**************************
--Exercise 2 : DVD Rental
--**************************


--Use UPDATE to change the language of some films. Make sure that you use valid languages
UPDATE film 
SET language_id = 2
WHERE film_id = 1;

UPDATE film
SET language_id = 3
WHERE film_id IN (4, 5);


--Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?






--We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
DROP TABLE customer_review;
--easy


-- =============
--Find out how many rentals are still outstanding 
SELECT COUNT(*) AS outstanding_rentals
FROM rental 
WHERE return_date IS NULL;

--Find the 30 most expensive movies which are outstanding
SELECT f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

--helping freind 🤦‍♂️
--**************************
--The 1st film
SELECT f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND f.description ILIKE '%sumo%';

--The 2nd film
SELECT title, description, length, rating
FROM film
WHERE length < 60 AND rating = 'R'
  AND description ILIKE '%documentary%';

--The 3rd film
SELECT f.title, r.rental_date, p.amount, r.return_date
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND p.amount > 4
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

--The 4th film
SELECT f.title, f.description, f.replacement_cost
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;



SELECT first_name, last_name FROM actor;