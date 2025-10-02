# System Architecture

Visual representation of the Student Management System architecture.

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 3000)               │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  Login   │  │ Director │  │ Teacher  │           │  │
│  │  │   Page   │  │Dashboard │  │Dashboard │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │ Student  │  │  Navbar  │  │Protected │           │  │
│  │  │Dashboard │  │Component │  │  Route   │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS (Axios)
                            │ JSON + JWT Token
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Flask Backend (Port 5000)                │  │
│  │                                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │           API Routes (Blueprints)              │  │  │
│  │  │                                                 │  │  │
│  │  │  /api/auth/*    - Authentication               │  │  │
│  │  │  /api/users/*   - User Management              │  │  │
│  │  │  /api/courses/* - Course Management            │  │  │
│  │  │  /api/grades/*  - Grade Management             │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │              Middleware Layer                   │  │  │
│  │  │                                                 │  │  │
│  │  │  - JWT Verification                            │  │  │
│  │  │  - Role-Based Authorization                    │  │  │
│  │  │  - CORS Handling                               │  │  │
│  │  │  - Error Handling                              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │              Business Logic                     │  │  │
│  │  │                                                 │  │  │
│  │  │  - User Management                             │  │  │
│  │  │  - Course Management                           │  │  │
│  │  │  - Grade Calculation                           │  │  │
│  │  │  - Enrollment Logic                            │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQLAlchemy ORM
                            │ SQL Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           PostgreSQL Database (Port 5432)             │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  users   │  │ courses  │  │  grades  │           │  │
│  │  │  table   │  │  table   │  │  table   │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  │                                                        │  │
│  │  ┌──────────┐                                         │  │
│  │  │enrollment│                                         │  │
│  │  │  table   │                                         │  │
│  │  └──────────┘                                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Enter credentials
     ▼
┌──────────────┐
│  Login Page  │
└──────┬───────┘
       │ 2. POST /api/auth/login
       ▼
┌─────────────────┐
│  Flask Backend  │
└────────┬────────┘
         │ 3. Verify credentials
         │ 4. Hash password check
         ▼
┌─────────────────┐
│   PostgreSQL    │
└────────┬────────┘
         │ 5. Return user data
         ▼
┌─────────────────┐
│  Flask Backend  │
│  - Generate JWT │
│  - Create token │
└────────┬────────┘
         │ 6. Return token + user
         ▼
┌──────────────┐
│  Login Page  │
│  - Store token│
│  - Store user │
└──────┬───────┘
       │ 7. Redirect based on role
       ▼
┌─────────────────┐
│   Dashboard     │
│  (Role-based)   │
└─────────────────┘
```

### Protected API Request Flow

```
┌──────────────┐
│  Dashboard   │
└──────┬───────┘
       │ 1. User action (e.g., get users)
       ▼
┌──────────────┐
│  Axios API   │
│  - Add token │
└──────┬───────┘
       │ 2. GET /api/users/
       │    Authorization: Bearer <token>
       ▼
┌─────────────────┐
│  Flask Backend  │
│  - JWT Verify   │
└────────┬────────┘
         │ 3. Verify token
         │ 4. Check role
         ▼
┌─────────────────┐
│   Middleware    │
│  - Decode JWT   │
│  - Get user ID  │
│  - Check role   │
└────────┬────────┘
         │ 5. If authorized
         ▼
┌─────────────────┐
│  Route Handler  │
│  - Query DB     │
└────────┬────────┘
         │ 6. Fetch data
         ▼
┌─────────────────┐
│   PostgreSQL    │
└────────┬────────┘
         │ 7. Return data
         ▼
┌─────────────────┐
│  Route Handler  │
│  - Format JSON  │
└────────┬────────┘
         │ 8. Return response
         ▼
┌──────────────┐
│  Dashboard   │
│  - Update UI │
└──────────────┘
```

---

## 🗂️ Database Schema

```
┌─────────────────────────────────────┐
│              users                   │
├─────────────────────────────────────┤
│ id (PK)                             │
│ email (UNIQUE)                      │
│ username (UNIQUE)                   │
│ password_hash                       │
│ role (director/teacher/student)     │
│ first_name                          │
│ last_name                           │
│ created_at                          │
│ updated_at                          │
└──────────┬──────────────────────────┘
           │
           │ 1:N (teacher)
           ▼
┌─────────────────────────────────────┐
│             courses                  │
├─────────────────────────────────────┤
│ id (PK)                             │
│ name                                │
│ code (UNIQUE)                       │
│ description                         │
│ teacher_id (FK → users.id)          │
│ grade_level                         │
│ created_at                          │
│ updated_at                          │
└──────────┬──────────────────────────┘
           │
           │ 1:N
           ▼
┌─────────────────────────────────────┐
│             grades                   │
├─────────────────────────────────────┤
│ id (PK)                             │
│ student_id (FK → users.id)          │
│ course_id (FK → courses.id)         │
│ score                               │
│ max_score                           │
│ assignment_name                     │
│ comments                            │
│ created_at                          │
│ updated_at                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           enrollments                │
├─────────────────────────────────────┤
│ id (PK)                             │
│ student_id (FK → users.id)          │
│ course_id (FK → courses.id)         │
│ enrolled_at                         │
│ UNIQUE(student_id, course_id)       │
└─────────────────────────────────────┘
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
└─────────────────────────────────────────────────────────┘

Layer 1: Frontend Protection
┌─────────────────────────────────────┐
│  - Protected Routes                 │
│  - Role-based UI rendering          │
│  - Token storage (localStorage)     │
│  - Automatic logout on expiration   │
└─────────────────────────────────────┘
                  │
                  ▼
Layer 2: Network Security
┌─────────────────────────────────────┐
│  - HTTPS (production)               │
│  - CORS configuration               │
│  - JWT in Authorization header      │
└─────────────────────────────────────┘
                  │
                  ▼
Layer 3: Backend Authentication
┌─────────────────────────────────────┐
│  - JWT verification                 │
│  - Token expiration check           │
│  - User identity extraction         │
└─────────────────────────────────────┘
                  │
                  ▼
Layer 4: Authorization
┌─────────────────────────────────────┐
│  - Role-based middleware            │
│  - Permission checking              │
│  - Resource ownership validation    │
└─────────────────────────────────────┘
                  │
                  ▼
Layer 5: Data Security
┌─────────────────────────────────────┐
│  - Password hashing (bcrypt)        │
│  - SQL injection prevention (ORM)   │
│  - Input validation                 │
│  - Prepared statements              │
└─────────────────────────────────────┘
```

---

## 🎭 Role-Based Access Matrix

```
┌──────────────┬──────────┬──────────┬──────────┐
│   Resource   │ Director │ Teacher  │ Student  │
├──────────────┼──────────┼──────────┼──────────┤
│ Users        │          │          │          │
│  - View All  │    ✅    │    ❌    │    ❌    │
│  - Create    │    ✅    │    ❌    │    ❌    │
│  - Update    │    ✅    │    ❌    │    ❌    │
│  - Delete    │    ✅    │    ❌    │    ❌    │
├──────────────┼──────────┼──────────┼──────────┤
│ Courses      │          │          │          │
│  - View All  │    ✅    │    ❌    │    ❌    │
│  - View Own  │    ✅    │    ✅    │    ✅    │
│  - Create    │    ✅    │    ✅    │    ❌    │
│  - Update    │    ✅    │   Own    │    ❌    │
│  - Delete    │    ✅    │   Own    │    ❌    │
├──────────────┼──────────┼──────────┼──────────┤
│ Grades       │          │          │          │
│  - View All  │    ✅    │    ❌    │    ❌    │
│  - View Own  │    ✅    │   Course │    ✅    │
│  - Create    │    ✅    │   Course │    ❌    │
│  - Update    │    ✅    │   Course │    ❌    │
│  - Delete    │    ✅    │   Course │    ❌    │
├──────────────┼──────────┼──────────┼──────────┤
│ Students     │          │          │          │
│  - View All  │    ✅    │    ✅    │    ❌    │
│  - View Self │    ✅    │    ✅    │    ✅    │
└──────────────┴──────────┴──────────┴──────────┘

Legend:
✅ = Full access
Own = Only own resources
Course = Only for own courses
❌ = No access
```

---

## 📦 Component Hierarchy

### Frontend Component Tree

```
App
│
├── Router
│   │
│   ├── Route: / (Public)
│   │   └── Login
│   │       ├── LoginForm
│   │       └── DemoCredentials
│   │
│   ├── Route: /director-dashboard (Protected: director)
│   │   └── ProtectedRoute
│   │       └── DirectorDashboard
│   │           ├── Navbar
│   │           ├── TabNavigation
│   │           ├── UsersTab
│   │           │   ├── UserTable
│   │           │   └── CreateUserModal
│   │           ├── CoursesTab
│   │           │   ├── CourseCards
│   │           │   └── CreateCourseModal
│   │           └── GradesTab
│   │               └── GradeTable
│   │
│   ├── Route: /teacher-dashboard (Protected: teacher)
│   │   └── ProtectedRoute
│   │       └── TeacherDashboard
│   │           ├── Navbar
│   │           ├── TabNavigation
│   │           ├── CoursesTab
│   │           │   ├── CourseCards
│   │           │   └── CreateCourseModal
│   │           ├── GradesTab
│   │           │   ├── GradeTable
│   │           │   └── AddGradeModal
│   │           └── StudentsTab
│   │               └── StudentCards
│   │
│   └── Route: /student-dashboard (Protected: student)
│       └── ProtectedRoute
│           └── StudentDashboard
│               ├── Navbar
│               ├── StatisticsCards
│               ├── TabNavigation
│               ├── OverviewTab
│               │   └── GradesByCourse
│               ├── CoursesTab
│               │   └── CourseCards
│               └── GradesTab
│                   └── GradeTable
```

---

## 🔄 State Management

```
┌─────────────────────────────────────┐
│        Application State             │
└─────────────────────────────────────┘

Global State (localStorage)
┌─────────────────────────────────────┐
│  - access_token (JWT)               │
│  - user (object)                    │
│    - id                             │
│    - email                          │
│    - username                       │
│    - role                           │
│    - first_name                     │
│    - last_name                      │
└─────────────────────────────────────┘

Component State (React useState)
┌─────────────────────────────────────┐
│  Dashboard Components:              │
│    - activeTab                      │
│    - users / courses / grades       │
│    - loading                        │
│    - error                          │
│    - success                        │
│    - showModal                      │
│    - formData                       │
└─────────────────────────────────────┘
```

---

## 🌐 API Communication

```
Frontend                Backend               Database
   │                       │                     │
   │  1. Login Request     │                     │
   ├──────────────────────>│                     │
   │                       │  2. Query User      │
   │                       ├────────────────────>│
   │                       │  3. User Data       │
   │                       │<────────────────────┤
   │  4. JWT + User        │                     │
   │<──────────────────────┤                     │
   │                       │                     │
   │  5. API Request       │                     │
   │     + JWT Token       │                     │
   ├──────────────────────>│                     │
   │                       │  6. Verify Token    │
   │                       │  7. Check Role      │
   │                       │  8. Query Data      │
   │                       ├────────────────────>│
   │                       │  9. Return Data     │
   │                       │<────────────────────┤
   │  10. JSON Response    │                     │
   │<──────────────────────┤                     │
   │                       │                     │
```

---

## 🚀 Deployment Architecture

### Development Environment
```
┌─────────────────────────────────────┐
│  Developer Machine                   │
│                                     │
│  ┌─────────────┐  ┌─────────────┐  │
│  │   React     │  │   Flask     │  │
│  │   :3000     │  │   :5000     │  │
│  └─────────────┘  └─────────────┘  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   PostgreSQL :5432          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Production Environment (Recommended)
```
┌─────────────────────────────────────────────┐
│              Load Balancer                   │
│              (Nginx/Apache)                  │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐    ┌───────────────┐
│  Static Files │    │  API Server   │
│  (React Build)│    │  (Gunicorn)   │
│  Port 80/443  │    │  Port 8000    │
└───────────────┘    └───────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   PostgreSQL   │
                    │   Port 5432    │
                    └────────────────┘
```

---

## 📊 Performance Considerations

```
┌─────────────────────────────────────────────┐
│           Performance Optimizations          │
└─────────────────────────────────────────────┘

Frontend:
  - React component optimization
  - Lazy loading (ready for implementation)
  - Code splitting potential
  - Axios request caching

Backend:
  - SQLAlchemy query optimization
  - Database connection pooling
  - JWT token caching
  - Efficient ORM queries

Database:
  - Indexed foreign keys
  - Optimized relationships
  - Connection pooling
  - Query optimization
```

---

## 🔧 Technology Stack Summary

```
┌─────────────────────────────────────────────┐
│              Frontend Stack                  │
├─────────────────────────────────────────────┤
│  React 18.2.0                               │
│  React Router DOM 6.20.0                    │
│  Axios 1.6.2                                │
│  TailwindCSS 3.3.5                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              Backend Stack                   │
├─────────────────────────────────────────────┤
│  Flask 3.0.0                                │
│  Flask-SQLAlchemy 3.1.1                     │
│  Flask-JWT-Extended 4.6.0                   │
│  Flask-CORS 4.0.0                           │
│  bcrypt 4.1.2                               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              Database                        │
├─────────────────────────────────────────────┤
│  PostgreSQL 12+                             │
│  psycopg2-binary 2.9.9                      │
└─────────────────────────────────────────────┘
```

---

This architecture provides a scalable, secure, and maintainable foundation for the Student Management System.
