# Backend Setup Instructions

Complete guide to set up and run the School Management System backend.

## Quick Start

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Test database connection
python test_db_connection.py

# 4. Seed database with sample data
python seed.py

# 5. Start the server
python index.py
```

## Detailed Setup

### Step 1: PostgreSQL Setup

#### Install PostgreSQL (if not already installed)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Switch to postgres user (Linux/Mac)
sudo -u postgres psql

# Or connect directly (if password is set)
psql -U postgres

# In psql prompt, create the database
CREATE DATABASE "School_Management_System";

# Verify database was created
\l

# Exit psql
\q
```

#### Set Password (if needed)

```bash
# In psql
ALTER USER postgres PASSWORD 'vji47cf8';
```

### Step 2: Python Environment Setup

#### Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

**Dependencies include:**
- Flask 3.0.0 - Web framework
- Flask-SQLAlchemy 3.1.1 - ORM for database
- Flask-CORS 4.0.0 - Cross-Origin Resource Sharing
- Flask-JWT-Extended 4.6.0 - JWT authentication
- psycopg2-binary 2.9.9 - PostgreSQL adapter
- python-dotenv 1.0.0 - Environment variables
- bcrypt 4.1.2 - Password hashing
- email-validator 2.1.0 - Email validation

### Step 3: Configuration

The database configuration is already set in `config.py`:

```python
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:vji47cf8@localhost:5432/School_Management_System'
```

**To customize:**

1. Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/School_Management_System
JWT_SECRET_KEY=your-secret-key-change-this-in-production
```

2. The application will automatically use these environment variables.

### Step 4: Test Database Connection

```bash
python test_db_connection.py
```

**Expected output:**
```
======================================================================
Testing PostgreSQL Database Connection
======================================================================
✓ Successfully connected to PostgreSQL database
✓ Database: School_Management_System
✓ Host: localhost:5432
✓ User: postgres

Current Database Statistics:
----------------------------------------------------------------------
  Users:       0
  Courses:     0
  Enrollments: 0
  Grades:      0

⚠ Database is empty. Run 'python seed.py' to populate with sample data.

======================================================================
✓ Database connection test PASSED
======================================================================
```

### Step 5: Initialize Database Schema

The database tables will be automatically created when you first run the application:

```bash
python index.py
```

**Or manually create tables:**

```bash
python
>>> from index import create_app
>>> from database.index import db
>>> app = create_app()
>>> with app.app_context():
...     db.create_all()
...     print("Tables created!")
>>> exit()
```

### Step 6: Seed Database (Optional but Recommended)

```bash
python seed.py
```

This creates sample data:

**Users:**
- 1 Director (director/director123)
- 2 Teachers (teacher1/teacher123, teacher2/teacher123)
- 3 Students (student1/student123, student2/student123, student3/student123)

**Courses:**
- Mathematics 101
- English Literature
- Physics 101
- Chemistry 101

**Plus enrollments and grades for testing**

### Step 7: Start the Server

```bash
python index.py
```

**Expected output:**
```
============================================================
✓ Database tables created successfully!
✓ Connected to: School_Management_System (PostgreSQL)
✓ Database Host: localhost:5432
✓ Database User: postgres
============================================================

Server starting on http://0.0.0.0:5000
API Documentation available at http://0.0.0.0:5000/api/health
============================================================
 * Serving Flask app 'index'
 * Debug mode: on
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.x.x:5000
```

### Step 8: Test the API

#### Using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"director","password":"director123"}'

# Get users (requires token from login)
curl http://localhost:5000/api/users/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Using browser:

1. Open http://localhost:5000 - Dashboard
2. Open http://localhost:5000/api/health - Health check

#### Using Postman or similar:

Import the following endpoints:
- POST http://localhost:5000/api/auth/login
- GET http://localhost:5000/api/users/
- GET http://localhost:5000/api/courses/
- GET http://localhost:5000/api/grades/

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if not running
sudo systemctl start postgresql

# Verify database exists
psql -U postgres -l | grep School_Management_System
```

### Issue: "Port 5000 already in use"

**Solution:**
Edit `index.py` and change the port:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Issue: "ModuleNotFoundError"

**Solution:**
```bash
# Ensure you're in the backend directory
cd backend

# Reinstall dependencies
pip install -r requirements.txt

# If using virtual environment, make sure it's activated
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### Issue: "psycopg2 installation fails"

**Solution:**
```bash
# Install PostgreSQL development files
# Ubuntu/Debian:
sudo apt-get install libpq-dev python3-dev

# macOS:
brew install postgresql

# Then reinstall
pip install psycopg2-binary
```

### Issue: "Authentication failed for user postgres"

**Solution:**
```bash
# Reset postgres password
sudo -u postgres psql
ALTER USER postgres PASSWORD 'vji47cf8';
\q

# Update config.py with correct password
```

### Issue: "Database does not exist"

**Solution:**
```bash
# Create the database
psql -U postgres -c 'CREATE DATABASE "School_Management_System";'

# Verify
psql -U postgres -l
```

## Verification Checklist

- [ ] PostgreSQL is installed and running
- [ ] Database "School_Management_System" exists
- [ ] Python 3.8+ is installed
- [ ] All dependencies are installed (`pip list`)
- [ ] Database connection test passes (`python test_db_connection.py`)
- [ ] Database is seeded with sample data (`python seed.py`)
- [ ] Server starts without errors (`python index.py`)
- [ ] Health check endpoint responds (`curl http://localhost:5000/api/health`)
- [ ] Login endpoint works (`curl -X POST http://localhost:5000/api/auth/login ...`)

## Next Steps

1. **Test the API** - Use Postman or curl to test all endpoints
2. **Connect Frontend** - Update frontend to point to `http://localhost:5000`
3. **Review Documentation** - Check `README.md` for API documentation
4. **Customize** - Modify models, routes, or templates as needed

## Additional Resources

- **Flask Documentation:** https://flask.palletsprojects.com/
- **SQLAlchemy Documentation:** https://docs.sqlalchemy.org/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **JWT Documentation:** https://jwt.io/

## Support

If you encounter issues not covered here:

1. Check the console output for error messages
2. Review the `config.py` file for correct settings
3. Verify PostgreSQL logs: `/var/log/postgresql/`
4. Ensure all ports are available (5000 for Flask, 5432 for PostgreSQL)
