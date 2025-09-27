

DROP TABLE IF EXISTS grade;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS users;

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    grade VARCHAR(20),
    "dateOfBirth" DATE,
    address TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    subject VARCHAR(100),
    experience VARCHAR(50),
    department VARCHAR(100)
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    teacher VARCHAR(100),
    students INT,
    schedule VARCHAR(100),
    description TEXT
);

CREATE TABLE grade (
    id SERIAL PRIMARY KEY,
    student VARCHAR(100),
    course VARCHAR(100),
    grade VARCHAR(5),
    score INT,
    date DATE,
    type VARCHAR(50)
);

INSERT INTO student (name, email, password, phone, grade, "dateOfBirth", address) VALUES
('John Smith', 'anaskessou4@gmail.com', 'anaskessou', '(555) 123-4567', 'Grade 10', '2007-05-15', '123 Main St, City, State 12345'),
('Emily Johnson', 'emily.johnson@email.com', 'password123', '(555) 234-5678', 'Grade 11', '2006-08-22', '456 Oak Ave, City, State 12345'),
('Michael Brown', 'michael.brown@email.com', 'password123', '(555) 345-6789', 'Grade 9', '2008-12-03', '789 Pine St, City, State 12345'),
('Sarah Davis', 'sarah.davis@email.com', 'password123', '(555) 456-7890', 'Grade 12', '2005-03-18', '321 Elm St, City, State 12345'),
('David Wilson', 'david.wilson@email.com', 'password123', '(555) 567-8901', 'Grade 10', '2007-11-07', '654 Maple Ave, City, State 12345'),
('Jessica Miller', 'jessica.miller@email.com', 'password123', '(555) 678-9012', 'Grade 11', '2006-01-25', '987 Cedar St, City, State 12345'),
('James Garcia', 'james.garcia@email.com', 'password123', '(555) 789-0123', 'Grade 9', '2008-07-14', '147 Birch Ave, City, State 12345'),
('Ashley Rodriguez', 'ashley.rodriguez@email.com', 'password123', '(555) 890-1234', 'Grade 12', '2005-09-30', '258 Spruce St, City, State 12345');

INSERT INTO teacher (name, email, phone, subject, experience, department) VALUES
('Dr. Robert Anderson', 'r.anderson@school.edu', '(555) 111-2222', 'Mathematics', '15 years', 'Science & Math'),
('Prof. Linda Thompson', 'l.thompson@school.edu', '(555) 222-3333', 'English Literature', '12 years', 'Language Arts'),
('Mr. Kevin Martinez', 'k.martinez@school.edu', '(555) 333-4444', 'Physics', '8 years', 'Science & Math'),
('Ms. Rachel Lee', 'r.lee@school.edu', '(555) 444-5555', 'History', '10 years', 'Social Studies'),
('Dr. Mark Taylor', 'm.taylor@school.edu', '(555) 555-6666', 'Chemistry', '18 years', 'Science & Math'),
('Mrs. Jennifer White', 'j.white@school.edu', '(555) 666-7777', 'Art', '6 years', 'Fine Arts'),
('Mr. Daniel Harris', 'd.harris@school.edu', '(555) 777-8888', 'Physical Education', '9 years', 'Physical Education');

INSERT INTO course (title, code, teacher, students, schedule, description) VALUES
('Advanced Mathematics', 'MATH401', 'Dr. Robert Anderson', 28, 'Mon, Wed, Fri - 9:00 AM', 'Advanced mathematical concepts including calculus and statistics'),
('English Literature', 'ENG301', 'Prof. Linda Thompson', 32, 'Tue, Thu - 10:30 AM', 'Study of classic and contemporary literature'),
('Physics I', 'PHY201', 'Mr. Kevin Martinez', 25, 'Mon, Wed, Fri - 11:00 AM', 'Introduction to mechanics, waves, and thermodynamics'),
('World History', 'HIS101', 'Ms. Rachel Lee', 30, 'Tue, Thu - 1:00 PM', 'Survey of world civilizations and historical events'),
('Chemistry II', 'CHE301', 'Dr. Mark Taylor', 22, 'Mon, Wed, Fri - 2:00 PM', 'Advanced chemistry concepts and laboratory work'),
('Digital Art', 'ART201', 'Mrs. Jennifer White', 18, 'Tue, Thu - 3:30 PM', 'Digital design and multimedia art creation'),
('Health & Fitness', 'PE101', 'Mr. Daniel Harris', 35, 'Daily - 8:00 AM', 'Physical fitness and health education');

INSERT INTO grade (student, course, grade, score, date, type) VALUES
('John Smith', 'Advanced Mathematics', 'A-', 91, '2024-01-15', 'Final Exam'),
('Emily Johnson', 'English Literature', 'B+', 87, '2024-01-16', 'Essay Assignment'),
('Michael Brown', 'Physics I', 'B', 84, '2024-01-17', 'Lab Report'),
('Sarah Davis', 'World History', 'A', 95, '2024-01-18', 'Research Paper'),
('David Wilson', 'Chemistry II', 'B-', 82, '2024-01-19', 'Midterm Exam'),
('Jessica Miller', 'Digital Art', 'A', 96, '2024-01-20', 'Portfolio Review'),
('James Garcia', 'Health & Fitness', 'B+', 88, '2024-01-21', 'Fitness Test'),
('Ashley Rodriguez', 'Advanced Mathematics', 'A', 94, '2024-01-22', 'Quiz');
