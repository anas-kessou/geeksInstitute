# Backend Structure Diagram

## Directory Structure

```
backend/
│
├── 📄 index.py                    # Main Flask application entry point
├── 📄 config.py                   # Configuration (DB, JWT, etc.)
├── 📄 middleware.py               # Authentication & authorization
├── 📄 seed.py                     # Database seeding script
├── 📄 test_db_connection.py      # Database connection tester
├── 📄 requirements.txt            # Python dependencies
│
├── 📁 models/                     # Database Models (ORM)
│   ├── 📄 user.py                # User model (Director/Teacher/Student)
│   ├── 📄 course.py              # Course model
│   ├── 📄 enrollment.py          # Enrollment model (Student-Course)
│   └── 📄 grade.py               # Grade model (Assignments)
│
├── 📁 database/                   # Database Configuration
│   ├── 📄 index.py               # SQLAlchemy setup
│   └── 📁 seed/
│       └── 📄 index.sql          # SQL schema definition
│
├── 📁 routes/                     # API Route Handlers
│   ├── 📄 auth.py                # /api/auth/* (login, logout, etc.)
│   ├── 📄 users.py               # /api/users/* (CRUD operations)
│   ├── 📄 courses.py             # /api/courses/* (CRUD operations)
│   └── 📄 grades.py              # /api/grades/* (CRUD operations)
│
├── 📁 templates/                  # HTML Templates (Web UI)
│   ├── 📄 base.html              # Base template (layout)
│   ├── 📄 index.html             # Dashboard page
│   ├── 📄 create.html            # Create entity form
│   ├── 📄 edit.html              # Edit entity form
│   ├── 📄 details.html           # Entity details view
│   └── 📄 stats.html             # Statistics & analytics
│
└── 📁 Documentation/
    ├── 📄 README.md              # Complete API documentation
    ├── 📄 SETUP_INSTRUCTIONS.md  # Detailed setup guide
    ├── 📄 QUICK_START.md         # Quick start guide
    ├── 📄 RESTRUCTURE_SUMMARY.md # Restructure summary
    └── 📄 STRUCTURE.md           # This file
```

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│                  (Browser / Postman / curl)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      index.py                                │
│                 (Flask Application)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • CORS Configuration                                 │  │
│  │  • JWT Manager                                        │  │
│  │  • Blueprint Registration                             │  │
│  │  • Error Handlers                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    middleware.py                             │
│              (Authentication & Authorization)                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • JWT Token Validation                               │  │
│  │  • Role-Based Access Control                          │  │
│  │  • User Identity Extraction                           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       routes/                                │
│                   (API Endpoints)                            │
│  ┌──────────────┬──────────────┬──────────────┬─────────┐  │
│  │   auth.py    │   users.py   │  courses.py  │grades.py│  │
│  │              │              │              │         │  │
│  │  • Login     │  • List      │  • List      │ • List  │  │
│  │  • Refresh   │  • Create    │  • Create    │ • Create│  │
│  │  • Logout    │  • Update    │  • Update    │ • Update│  │
│  │  • Me        │  • Delete    │  • Delete    │ • Delete│  │
│  └──────────────┴──────────────┴──────────────┴─────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       models/                                │
│                  (Database Models)                           │
│  ┌──────────────┬──────────────┬──────────────┬─────────┐  │
│  │   user.py    │  course.py   │enrollment.py │ grade.py│  │
│  │              │              │              │         │  │
│  │  • User      │  • Course    │  • Enrollment│ • Grade │  │
│  │  • Auth      │  • Teacher   │  • Student   │ • Score │  │
│  │  • Role      │  • Code      │  • Course    │ • Max   │  │
│  └──────────────┴──────────────┴──────────────┴─────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   database/index.py                          │
│                  (SQLAlchemy ORM)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Database Connection                                │  │
│  │  • Session Management                                 │  │
│  │  • Query Interface                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL                              │
│              School_Management_System                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Tables:                                              │  │
│  │  • users                                              │  │
│  │  • courses                                            │  │
│  │  • enrollments                                        │  │
│  │  • grades                                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)             │
│ email               │
│ username            │
│ password_hash       │
│ role                │◄─────┐
│ first_name          │      │
│ last_name           │      │
│ created_at          │      │
│ updated_at          │      │
└─────────────────────┘      │
         │                   │
         │ teacher_id        │
         │                   │
         ▼                   │
┌─────────────────────┐      │
│      courses        │      │
├─────────────────────┤      │
│ id (PK)             │      │
│ name                │      │
│ code                │      │
│ description         │      │
│ teacher_id (FK)     │──────┘
│ grade_level         │
│ created_at          │
│ updated_at          │
└─────────────────────┘
         │
         │ course_id
         │
         ▼
┌─────────────────────┐      ┌─────────────────────┐
│   enrollments       │      │       grades        │
├─────────────────────┤      ├─────────────────────┤
│ id (PK)             │      │ id (PK)             │
│ student_id (FK)     │◄─────│ student_id (FK)     │
│ course_id (FK)      │      │ course_id (FK)      │
│ enrolled_at         │      │ score               │
└─────────────────────┘      │ max_score           │
                             │ assignment_name     │
                             │ comments            │
                             │ created_at          │
                             │ updated_at          │
                             └─────────────────────┘
```

## API Request Flow

```
1. Client Request
   │
   ├─→ POST /api/auth/login
   │   └─→ auth.py → User.query → JWT Token
   │
   ├─→ GET /api/users/ (with JWT)
   │   └─→ middleware.py (validate JWT)
   │       └─→ users.py → User.query → JSON Response
   │
   ├─→ POST /api/courses/ (with JWT)
   │   └─→ middleware.py (validate JWT + role)
   │       └─→ courses.py → Course.create → JSON Response
   │
   └─→ GET /api/grades/student/1 (with JWT)
       └─→ middleware.py (validate JWT)
           └─→ grades.py → Grade.query → JSON Response
```

## Authentication Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /api/auth/login
     │    {username, password}
     ▼
┌─────────────┐
│  auth.py    │
└─────┬───────┘
      │
      │ 2. Verify credentials
      ▼
┌─────────────┐
│  User.query │
└─────┬───────┘
      │
      │ 3. Generate JWT
      ▼
┌─────────────┐
│ JWT Manager │
└─────┬───────┘
      │
      │ 4. Return token
      ▼
┌──────────┐
│  Client  │ (stores token)
└────┬─────┘
     │
     │ 5. Subsequent requests
     │    Authorization: Bearer <token>
     ▼
┌─────────────┐
│ middleware  │
└─────┬───────┘
      │
      │ 6. Validate token & role
      ▼
┌─────────────┐
│   routes    │ (process request)
└─────────────┘
```

## Role-Based Access

```
┌─────────────────────────────────────────────────────────┐
│                        Director                          │
│  • Full access to all endpoints                         │
│  • Create/Update/Delete users                           │
│  • Create/Update/Delete courses                         │
│  • View all grades                                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                        Teacher                           │
│  • View students and other teachers                     │
│  • Update courses they teach                            │
│  • Create/Update/Delete grades for their courses        │
│  • View enrollments in their courses                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                        Student                           │
│  • View their own profile                               │
│  • View their enrolled courses                          │
│  • View their own grades                                │
│  • View teachers                                        │
└─────────────────────────────────────────────────────────┘
```

## Configuration

```
config.py
├── DATABASE_URL
│   └── postgresql://postgres:vji47cf8@localhost:5432/School_Management_System
│
├── JWT_SECRET_KEY
│   └── dev-secret-key-change-in-production
│
├── JWT_ACCESS_TOKEN_EXPIRES
│   └── 24 hours
│
└── JWT_REFRESH_TOKEN_EXPIRES
    └── 30 days
```

## Key Features

### ✅ Security
- JWT authentication
- Password hashing (bcrypt)
- Role-based access control
- Protected endpoints

### ✅ Database
- PostgreSQL with SQLAlchemy
- Proper relationships
- Cascade deletes
- Indexes for performance

### ✅ API
- RESTful design
- JSON responses
- Error handling
- CORS support

### ✅ Web Interface
- Bootstrap 5 UI
- Responsive design
- Dashboard
- CRUD forms

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                     Backend Stack                        │
├─────────────────────────────────────────────────────────┤
│  Framework:        Flask 3.0.0                          │
│  Database:         PostgreSQL 12+                       │
│  ORM:              SQLAlchemy 3.1.1                     │
│  Authentication:   JWT (Flask-JWT-Extended 4.6.0)       │
│  Password Hash:    bcrypt 4.1.2                         │
│  CORS:             Flask-CORS 4.0.0                     │
│  DB Driver:        psycopg2-binary 2.9.9                │
│  Environment:      python-dotenv 1.0.0                  │
│  Validation:       email-validator 2.1.0                │
└─────────────────────────────────────────────────────────┘
```

## Summary

The backend is structured as a modular Flask application with:
- Clear separation of concerns
- RESTful API design
- Secure authentication
- Role-based authorization
- PostgreSQL database
- Comprehensive documentation
- Easy to maintain and extend
