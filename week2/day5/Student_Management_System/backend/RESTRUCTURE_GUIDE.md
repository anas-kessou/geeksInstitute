# Backend Restructure Guide

The backend has been restructured to follow the required format and connect to your PostgreSQL database.

## 📁 New Structure

```
backend/
├── index.py                      # Main Flask application (entry point)
├── config.py                     # Configuration with your database
├── middleware.py                 # Role-based authorization
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
│
├── models/                       # Database models (separated)
│   ├── user.py                   # User model
│   ├── course.py                 # Course model
│   ├── enrollment.py             # Enrollment model
│   └── grade.py                  # Grade model
│
├── database/                     # Database connection
│   ├── index.py                  # Database initialization
│   └── seed/
│       ├── index.sql             # Database schema (SQL)
│       └── seed_data.py          # Seed script (Python)
│
└── routes/                       # API routes
    ├── auth.py                   # Authentication endpoints
    ├── users.py                  # User management
    ├── courses.py                # Course management
    └── grades.py                 # Grade management
```

## 🔗 Database Connection

**Database Name**: `School_Management_System`  
**Host**: `localhost`  
**Port**: `5432`  
**Username**: `postgres`  
**Password**: `vji47cf8`

This is configured in `config.py` and `.env.example`.

## 🚀 Setup Instructions

### 1. Create Database (if not exists)

```bash
psql -U postgres
CREATE DATABASE "School_Management_System";
\q
```

### 2. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run Database Schema (Optional - SQL approach)

```bash
psql -U postgres -d School_Management_System -f database/seed/index.sql
```

### 4. Seed Database with Python

```bash
# From backend directory
python database/seed/seed_data.py
```

### 5. Start the Server

```bash
python index.py
```

The server will run on `http://localhost:5000`

## 📝 Key Changes

### 1. Main Entry Point
- **Old**: `app.py`
- **New**: `index.py`

### 2. Models
- **Old**: Single `models.py` file
- **New**: Separate files in `models/` directory
  - `models/user.py`
  - `models/course.py`
  - `models/enrollment.py`
  - `models/grade.py`

### 3. Database
- **Old**: Direct import from models
- **New**: Centralized in `database/index.py`
- **Schema**: SQL file at `database/seed/index.sql`
- **Seeding**: Python script at `database/seed/seed_data.py`

### 4. Configuration
- **Database**: Updated to use `School_Management_System`
- **Credentials**: Your PostgreSQL credentials configured

## 🔄 Import Changes

All files have been updated to use the new structure:

**Old imports:**
```python
from models import User, Course, Grade, db
```

**New imports:**
```python
from models.user import User
from models.course import Course
from models.grade import Grade
from database.index import db
```

## 🧪 Testing

### 1. Check Database Connection

```bash
python index.py
```

Should output: "Connected to: School_Management_System database"

### 2. Test API

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status": "healthy", "message": "SMS API is running"}`

### 3. Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "director", "password": "director123"}'
```

## 📊 Database Tables

The following tables will be created:

1. **users** - User accounts (director, teacher, student)
2. **courses** - Course information
3. **enrollments** - Student-course relationships
4. **grades** - Grade records

## 🔐 Test Credentials

After seeding, use these credentials:

- **Director**: `director` / `director123`
- **Teacher 1**: `teacher1` / `teacher123`
- **Teacher 2**: `teacher2` / `teacher123`
- **Student 1**: `student1` / `student123`
- **Student 2**: `student2` / `student123`
- **Student 3**: `student3` / `student123`

## ⚠️ Important Notes

1. **Old Files**: The old `app.py`, `models.py`, and `seed.py` are still in the backend directory but are no longer used. You can delete them if desired.

2. **Database Name**: Make sure the database `School_Management_System` exists in PostgreSQL.

3. **Password**: The password `vji47cf8` is hardcoded in the configuration. For production, use environment variables.

4. **Frontend**: The frontend still works without changes - it connects to the same API endpoints.

## 🔧 Troubleshooting

### Database Connection Error

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U postgres -d School_Management_System
```

### Import Errors

Make sure you're running from the `backend` directory:
```bash
cd backend
python index.py
```

### Module Not Found

Reinstall dependencies:
```bash
pip install -r requirements.txt
```

## ✅ Verification Checklist

- [ ] Database `School_Management_System` exists
- [ ] Dependencies installed
- [ ] Database seeded successfully
- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Login endpoint works
- [ ] Frontend can connect to backend

## 🎯 Next Steps

1. Run `python index.py` to start the server
2. Run the frontend with `npm start`
3. Test login with provided credentials
4. Verify all features work as expected

The restructure is complete and follows your required format!
