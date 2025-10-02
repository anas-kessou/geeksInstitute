# Student Management System (SMS)

A complete, production-ready Student Management System with role-based access control (RBAC) built with Flask, PostgreSQL, React, and TailwindCSS.

## 🎯 Features

### Authentication & Authorization
- **Secure JWT-based authentication**
- **Password hashing with bcrypt**
- **Role-based access control (RBAC)** with three roles:
  - **Director** (Admin): Full system access
  - **Teacher**: Manage own courses and student grades
  - **Student**: Read-only access to personal data

### Director Dashboard
- ✅ Create, update, and delete users (teachers/students)
- ✅ View all courses, grades, and users
- ✅ Full administrative control
- ✅ User management with role assignment

### Teacher Dashboard
- ✅ Create, update, and delete own courses
- ✅ Add, update, and delete grades for enrolled students
- ✅ View all students
- ✅ Restricted to own courses only

### Student Dashboard
- ✅ View enrolled courses
- ✅ View personal grades grouped by course
- ✅ Calculate average grades
- ✅ Read-only access (no modifications)

## 🏗️ Tech Stack

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **bcrypt** - Password hashing
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client

## 📁 Project Structure

```
/mnt/files/new/
├── backend/
│   ├── routes/
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── users.py         # User management (Director only)
│   │   ├── courses.py       # Course management
│   │   └── grades.py        # Grade management
│   ├── models.py            # Database models
│   ├── middleware.py        # Role-based authorization
│   ├── config.py            # Configuration
│   ├── app.py               # Flask application
│   ├── seed.py              # Database seeding script
│   └── requirements.txt     # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── DirectorDashboard.jsx
    │   │   ├── TeacherDashboard.jsx
    │   │   └── StudentDashboard.jsx
    │   ├── utils/
    │   │   ├── api.js       # Axios instance
    │   │   └── auth.js      # Auth utilities
    │   ├── App.jsx
    │   └── index.js
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create PostgreSQL database:**
   ```bash
   psql -U postgres
   CREATE DATABASE sms_db;
   \q
   ```

5. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/sms_db
   JWT_SECRET_KEY=your-secret-key-here
   ```

6. **Initialize database and seed data:**
   ```bash
   python seed.py
   ```

7. **Run the Flask server:**
   ```bash
   python app.py
   ```
   
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the React development server:**
   ```bash
   npm start
   ```
   
   Frontend will run on `http://localhost:3000`

## 🔐 Test Credentials

After running the seed script, use these credentials to test different roles:

### Director (Full Access)
- **Username:** `director`
- **Password:** `director123`

### Teacher 1 (Sarah Johnson)
- **Username:** `teacher1`
- **Password:** `teacher123`

### Teacher 2 (Michael Brown)
- **Username:** `teacher2`
- **Password:** `teacher123`

### Student 1 (Emily Davis)
- **Username:** `student1`
- **Password:** `student123`

### Student 2 (James Wilson)
- **Username:** `student2`
- **Password:** `student123`

### Student 3 (Olivia Martinez)
- **Username:** `student3`
- **Password:** `student123`

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure token-based authentication
3. **Role-Based Authorization**: Middleware enforces role restrictions on all endpoints
4. **Protected Routes**: Frontend routes are protected based on user roles
5. **Token Expiration**: Access tokens expire after 24 hours
6. **CORS Configuration**: Properly configured for secure cross-origin requests

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Users (Director Only)
- `GET /api/users/` - Get all users
- `POST /api/users/` - Create new user
- `GET /api/users/<id>` - Get user by ID
- `PUT /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user
- `GET /api/users/teachers` - Get all teachers
- `GET /api/users/students` - Get all students

### Courses
- `GET /api/courses/` - Get courses (role-filtered)
- `POST /api/courses/` - Create course (Director/Teacher)
- `GET /api/courses/<id>` - Get course by ID
- `PUT /api/courses/<id>` - Update course
- `DELETE /api/courses/<id>` - Delete course
- `POST /api/courses/<id>/enroll` - Enroll student
- `GET /api/courses/<id>/students` - Get course students

### Grades
- `GET /api/grades/` - Get grades (role-filtered)
- `POST /api/grades/` - Create grade (Director/Teacher)
- `GET /api/grades/student/<id>` - Get student grades
- `GET /api/grades/course/<id>` - Get course grades
- `PUT /api/grades/<id>` - Update grade
- `DELETE /api/grades/<id>` - Delete grade

## 🎨 UI Features

### Login Page
- Clean, responsive design
- Form validation
- Demo credentials displayed
- Role-based redirection after login

### Director Dashboard
- Tabbed interface (Users, Courses, Grades)
- Create user modal with role selection
- User management table with edit/delete actions
- Course cards with management options
- Comprehensive grade overview

### Teacher Dashboard
- My Courses view with create/delete options
- Grade management for enrolled students
- Student directory
- Add grade functionality per course

### Student Dashboard
- Overview with statistics cards
- Grades grouped by course
- Course enrollment list
- Average grade calculation
- Color-coded performance indicators

## 🛡️ Role-Based Rules

### Director
- ✅ Full access to all features
- ✅ Create, update, delete users
- ✅ View all courses, grades, students
- ✅ "Create User" button visible

### Teacher
- ✅ Manage own courses only
- ✅ Add/update/delete grades for own students
- ✅ View enrolled students
- ❌ Cannot manage users
- ❌ Cannot access other teachers' courses

### Student
- ✅ View personal information
- ✅ View enrolled courses
- ✅ View own grades
- ❌ Cannot modify anything
- ❌ Read-only access

## 🧪 Testing the Application

1. **Login as Director:**
   - Create new users (teachers/students)
   - Create courses
   - View all system data

2. **Login as Teacher:**
   - Create courses
   - Enroll students (need student IDs)
   - Add grades for students

3. **Login as Student:**
   - View enrolled courses
   - Check grades
   - See average performance

## 📝 Notes

- The system uses JWT tokens stored in localStorage
- Tokens expire after 24 hours
- All API requests include automatic token refresh handling
- Role restrictions are enforced both on backend and frontend
- Database relationships ensure data integrity

## 🚨 Important Security Notes

1. Change `JWT_SECRET_KEY` in production
2. Use environment variables for sensitive data
3. Enable HTTPS in production
4. Implement rate limiting for API endpoints
5. Add input sanitization for production use
6. Set up proper database backups

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Built as a demonstration of full-stack development with RBAC implementation.
