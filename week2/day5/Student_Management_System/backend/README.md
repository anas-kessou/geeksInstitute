# School Management System - Backend

This is the backend API for the School Management System, built with Flask and PostgreSQL.

## Project Structure

```
backend/
├── index.py              # Main Flask application entry point
├── config.py             # Configuration settings
├── middleware.py         # Authentication and authorization middleware
├── requirements.txt      # Python dependencies
├── seed.py              # Database seeding script
├── models/              # Database models
│   ├── user.py          # User model
│   ├── course.py        # Course model
│   ├── enrollment.py    # Enrollment model
│   └── grade.py         # Grade model
├── database/            # Database configuration
│   ├── index.py         # Database connection setup
│   └── seed/
│       └── index.sql    # Database schema
├── routes/              # API route handlers
│   ├── auth.py          # Authentication endpoints
│   ├── users.py         # User management endpoints
│   ├── courses.py       # Course management endpoints
│   └── grades.py        # Grade management endpoints
└── templates/           # HTML templates (optional UI)
    ├── base.html        # Base template
    ├── index.html       # Dashboard
    ├── create.html      # Create form
    ├── edit.html        # Edit form
    ├── details.html     # Detail view
    └── stats.html       # Statistics page
```

## Database Configuration

The backend connects to PostgreSQL using the following credentials:

- **Host:** localhost
- **Port:** 5432
- **Database:** School_Management_System
- **Username:** postgres
- **Password:** vji47cf8

These settings are configured in `config.py` and match the connection settings in `.vscode/settings.json`.

## Prerequisites

1. **Python 3.8+** installed
2. **PostgreSQL 12+** installed and running
3. **Database created:** `School_Management_System`

## Installation

### 1. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE "School_Management_System";

# Exit psql
\q
```

### 2. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Set Up Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
JWT_SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:vji47cf8@localhost:5432/School_Management_System
```

## Running the Application

### 1. Initialize Database Tables

The application will automatically create tables when you first run it:

```bash
python index.py
```

### 2. Seed the Database (Optional)

To populate the database with sample data:

```bash
python seed.py
```

This will create:
- 1 Director account
- 2 Teacher accounts
- 3 Student accounts
- 4 Sample courses
- Multiple enrollments and grades

**Test Credentials:**
- **Director:** username: `director`, password: `director123`
- **Teacher 1:** username: `teacher1`, password: `teacher123`
- **Teacher 2:** username: `teacher2`, password: `teacher123`
- **Student 1:** username: `student1`, password: `student123`
- **Student 2:** username: `student2`, password: `student123`
- **Student 3:** username: `student3`, password: `student123`

### 3. Start the Server

```bash
python index.py
```

The server will start on `http://0.0.0.0:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/` - Get all users (Director only)
- `GET /api/users/<id>` - Get user by ID
- `POST /api/users/` - Create new user (Director only)
- `PUT /api/users/<id>` - Update user (Director only)
- `DELETE /api/users/<id>` - Delete user (Director only)
- `GET /api/users/teachers` - Get all teachers
- `GET /api/users/students` - Get all students

### Courses
- `GET /api/courses/` - Get all courses
- `GET /api/courses/<id>` - Get course by ID
- `POST /api/courses/` - Create new course (Director only)
- `PUT /api/courses/<id>` - Update course (Director/Teacher)
- `DELETE /api/courses/<id>` - Delete course (Director only)
- `GET /api/courses/<id>/students` - Get enrolled students
- `POST /api/courses/<id>/enroll` - Enroll student in course

### Grades
- `GET /api/grades/` - Get all grades
- `GET /api/grades/<id>` - Get grade by ID
- `POST /api/grades/` - Create new grade (Teacher only)
- `PUT /api/grades/<id>` - Update grade (Teacher only)
- `DELETE /api/grades/<id>` - Delete grade (Teacher only)
- `GET /api/grades/student/<id>` - Get grades for a student
- `GET /api/grades/course/<id>` - Get grades for a course

### Health Check
- `GET /api/health` - Check API status

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login via `/api/auth/login` to get an access token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-access-token>
   ```

## Role-Based Access Control

The system has three roles with different permissions:

- **Director:** Full access to all endpoints
- **Teacher:** Can manage courses they teach and grades
- **Student:** Can view their own courses and grades

## Database Models

### User
- `id` - Primary key
- `email` - Unique email address
- `username` - Unique username
- `password_hash` - Hashed password (bcrypt)
- `role` - User role (director/teacher/student)
- `first_name` - First name
- `last_name` - Last name
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Course
- `id` - Primary key
- `name` - Course name
- `code` - Unique course code
- `description` - Course description
- `teacher_id` - Foreign key to User (teacher)
- `grade_level` - Grade level (e.g., "Grade 10")
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Enrollment
- `id` - Primary key
- `student_id` - Foreign key to User (student)
- `course_id` - Foreign key to Course
- `enrolled_at` - Enrollment timestamp

### Grade
- `id` - Primary key
- `student_id` - Foreign key to User (student)
- `course_id` - Foreign key to Course
- `score` - Score achieved
- `max_score` - Maximum possible score
- `assignment_name` - Name of the assignment
- `comments` - Teacher comments
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Development

### Running in Debug Mode

The application runs in debug mode by default when using `python index.py`. This enables:
- Auto-reload on code changes
- Detailed error messages
- Interactive debugger

### Database Migrations

To reset the database:

```bash
# Drop all tables and recreate
python
>>> from index import create_app
>>> from database.index import db
>>> app = create_app()
>>> with app.app_context():
...     db.drop_all()
...     db.create_all()
>>> exit()

# Re-seed the database
python seed.py
```

## Troubleshooting

### Database Connection Issues

If you see "Database connection failed":

1. Ensure PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```

2. Verify the database exists:
   ```bash
   psql -U postgres -l
   ```

3. Check credentials in `config.py` match your PostgreSQL setup

4. Test connection manually:
   ```bash
   psql -U postgres -d School_Management_System
   ```

### Port Already in Use

If port 5000 is already in use, change it in `index.py`:

```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use different port
```

### Import Errors

Make sure you're in the backend directory and all dependencies are installed:

```bash
cd backend
pip install -r requirements.txt
```

## Production Deployment

For production deployment:

1. Set `debug=False` in `index.py`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 index:app
   ```
3. Set strong `JWT_SECRET_KEY` in environment variables
4. Use environment variables for database credentials
5. Enable HTTPS
6. Set up proper logging

## License

This project is part of the School Management System.
