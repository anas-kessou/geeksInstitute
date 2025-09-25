-- ******************
--Queries
-- ******************
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
)

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

SELECT * FROM FirstTab

CREATE TABLE SecondTab (
    id integer 
)

INSERT INTO SecondTab VALUES
(5),
(NULL);


SELECT * FROM SecondTab


--
--Questions
--
--==========================
--Q1. What will be the OUTPUT of the following statement?
SELECT COUNT(*) 
FROM FirstTab AS ft
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL )

--result is 0 and i really don't know why




--==========================
--Q2. What will be the OUTPUT of the following statement?
SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 )

--result is 2 cause it has to be different from 5 and NULL (Q1)




--==========================
--Q3. What will be the OUTPUT of the following statement?
SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab )

-- idk agn but it seams that the result is 0
-- after searching more i found that it's because because a NULL in a NOT IN list makes the whole condition unknown


--==========================
--Q4. What will be the OUTPUT of the following statement?
SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL )

--reult is 2 as Q2 cause (WHERE id IS NOT NULL)=>(WHERE id = 5)