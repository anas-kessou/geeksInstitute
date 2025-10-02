# API Documentation

Complete API reference for the Student Management System.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "director",
  "password": "director123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "director@sms.edu",
    "username": "director",
    "role": "director",
    "first_name": "John",
    "last_name": "Smith"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

### Refresh Token
**POST** `/auth/refresh`

Refresh access token using refresh token.

**Headers:**
```
Authorization: Bearer <refresh_token>
```

**Response (200 OK):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Get Current User
**GET** `/auth/me`

Get authenticated user information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "director@sms.edu",
    "username": "director",
    "role": "director",
    "first_name": "John",
    "last_name": "Smith"
  }
}
```

---

### Logout
**POST** `/auth/logout`

Logout user (client should delete token).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

## User Management (Director Only)

### Get All Users
**GET** `/users/`

Get all users in the system.

**Permissions:** Director only

**Query Parameters:**
- `role` (optional): Filter by role (director, teacher, student)

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": 1,
      "email": "director@sms.edu",
      "username": "director",
      "role": "director",
      "first_name": "John",
      "last_name": "Smith",
      "created_at": "2024-01-01T00:00:00",
      "updated_at": "2024-01-01T00:00:00"
    }
  ]
}
```

---

### Get User by ID
**GET** `/users/<user_id>`

Get specific user details.

**Permissions:** Director, Teacher

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "director@sms.edu",
    "username": "director",
    "role": "director",
    "first_name": "John",
    "last_name": "Smith"
  }
}
```

---

### Create User
**POST** `/users/`

Create a new user.

**Permissions:** Director only

**Request Body:**
```json
{
  "email": "newuser@sms.edu",
  "username": "newuser",
  "password": "password123",
  "role": "student",
  "first_name": "Jane",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 7,
    "email": "newuser@sms.edu",
    "username": "newuser",
    "role": "student",
    "first_name": "Jane",
    "last_name": "Doe"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Username already exists"
}
```

---

### Update User
**PUT** `/users/<user_id>`

Update user information.

**Permissions:** Director only

**Request Body (all fields optional):**
```json
{
  "email": "updated@sms.edu",
  "username": "updateduser",
  "password": "newpassword123",
  "role": "teacher",
  "first_name": "Jane",
  "last_name": "Smith"
}
```

**Response (200 OK):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 7,
    "email": "updated@sms.edu",
    "username": "updateduser",
    "role": "teacher",
    "first_name": "Jane",
    "last_name": "Smith"
  }
}
```

---

### Delete User
**DELETE** `/users/<user_id>`

Delete a user.

**Permissions:** Director only

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Cannot delete your own account"
}
```

---

### Get All Teachers
**GET** `/users/teachers`

Get all users with teacher role.

**Permissions:** All authenticated users

**Response (200 OK):**
```json
{
  "teachers": [
    {
      "id": 2,
      "email": "teacher1@sms.edu",
      "username": "teacher1",
      "role": "teacher",
      "first_name": "Sarah",
      "last_name": "Johnson"
    }
  ]
}
```

---

### Get All Students
**GET** `/users/students`

Get all users with student role.

**Permissions:** Director, Teacher

**Response (200 OK):**
```json
{
  "students": [
    {
      "id": 4,
      "email": "student1@sms.edu",
      "username": "student1",
      "role": "student",
      "first_name": "Emily",
      "last_name": "Davis"
    }
  ]
}
```

---

## Course Management

### Get Courses
**GET** `/courses/`

Get courses based on user role:
- **Director**: All courses
- **Teacher**: Only their courses
- **Student**: Only enrolled courses

**Permissions:** All authenticated users

**Response (200 OK):**
```json
{
  "courses": [
    {
      "id": 1,
      "name": "Mathematics 101",
      "code": "MATH101",
      "description": "Introduction to Algebra and Geometry",
      "teacher_id": 2,
      "teacher_name": "Sarah Johnson",
      "grade_level": "Grade 10",
      "created_at": "2024-01-01T00:00:00",
      "updated_at": "2024-01-01T00:00:00"
    }
  ]
}
```

---

### Get Course by ID
**GET** `/courses/<course_id>`

Get specific course details.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only
- Student: Enrolled courses only

**Response (200 OK):**
```json
{
  "course": {
    "id": 1,
    "name": "Mathematics 101",
    "code": "MATH101",
    "description": "Introduction to Algebra and Geometry",
    "teacher_id": 2,
    "teacher_name": "Sarah Johnson",
    "grade_level": "Grade 10"
  }
}
```

---

### Create Course
**POST** `/courses/`

Create a new course.

**Permissions:** Director, Teacher

**Request Body:**
```json
{
  "name": "Physics 101",
  "code": "PHY101",
  "description": "Introduction to Physics",
  "teacher_id": 2,
  "grade_level": "Grade 11"
}
```

**Note:** Teachers can only create courses for themselves (teacher_id must match their ID).

**Response (201 Created):**
```json
{
  "message": "Course created successfully",
  "course": {
    "id": 5,
    "name": "Physics 101",
    "code": "PHY101",
    "description": "Introduction to Physics",
    "teacher_id": 2,
    "teacher_name": "Sarah Johnson",
    "grade_level": "Grade 11"
  }
}
```

---

### Update Course
**PUT** `/courses/<course_id>`

Update course information.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Request Body (all fields optional):**
```json
{
  "name": "Advanced Physics",
  "code": "PHY201",
  "description": "Advanced Physics Topics",
  "grade_level": "Grade 12",
  "teacher_id": 3
}
```

**Note:** Only directors can reassign courses to different teachers.

**Response (200 OK):**
```json
{
  "message": "Course updated successfully",
  "course": {
    "id": 5,
    "name": "Advanced Physics",
    "code": "PHY201",
    "description": "Advanced Physics Topics",
    "teacher_id": 2,
    "teacher_name": "Sarah Johnson",
    "grade_level": "Grade 12"
  }
}
```

---

### Delete Course
**DELETE** `/courses/<course_id>`

Delete a course.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Response (200 OK):**
```json
{
  "message": "Course deleted successfully"
}
```

---

### Enroll Student in Course
**POST** `/courses/<course_id>/enroll`

Enroll a student in a course.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Request Body:**
```json
{
  "student_id": 4
}
```

**Response (201 Created):**
```json
{
  "message": "Student enrolled successfully",
  "enrollment": {
    "id": 1,
    "student_id": 4,
    "course_id": 1,
    "student_name": "Emily Davis",
    "course_name": "Mathematics 101",
    "enrolled_at": "2024-01-01T00:00:00"
  }
}
```

---

### Get Course Students
**GET** `/courses/<course_id>/students`

Get all students enrolled in a course.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Response (200 OK):**
```json
{
  "students": [
    {
      "id": 4,
      "email": "student1@sms.edu",
      "username": "student1",
      "role": "student",
      "first_name": "Emily",
      "last_name": "Davis"
    }
  ]
}
```

---

## Grade Management

### Get Grades
**GET** `/grades/`

Get grades based on user role:
- **Director**: All grades
- **Teacher**: Grades for their courses
- **Student**: Only their own grades

**Permissions:** All authenticated users

**Response (200 OK):**
```json
{
  "grades": [
    {
      "id": 1,
      "student_id": 4,
      "student_name": "Emily Davis",
      "course_id": 1,
      "course_name": "Mathematics 101",
      "score": 85,
      "max_score": 100,
      "percentage": 85.0,
      "assignment_name": "Midterm Exam",
      "comments": "Good work!",
      "created_at": "2024-01-01T00:00:00",
      "updated_at": "2024-01-01T00:00:00"
    }
  ]
}
```

---

### Get Student Grades
**GET** `/grades/student/<student_id>`

Get all grades for a specific student.

**Permissions:** 
- Director: All students
- Teacher: Students in their courses
- Student: Own grades only

**Response (200 OK):**
```json
{
  "grades": [
    {
      "id": 1,
      "student_id": 4,
      "student_name": "Emily Davis",
      "course_id": 1,
      "course_name": "Mathematics 101",
      "score": 85,
      "max_score": 100,
      "percentage": 85.0,
      "assignment_name": "Midterm Exam",
      "comments": "Good work!"
    }
  ]
}
```

---

### Get Course Grades
**GET** `/grades/course/<course_id>`

Get all grades for a specific course.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Response (200 OK):**
```json
{
  "grades": [
    {
      "id": 1,
      "student_id": 4,
      "student_name": "Emily Davis",
      "course_id": 1,
      "course_name": "Mathematics 101",
      "score": 85,
      "max_score": 100,
      "percentage": 85.0,
      "assignment_name": "Midterm Exam",
      "comments": "Good work!"
    }
  ]
}
```

---

### Create Grade
**POST** `/grades/`

Add a new grade for a student.

**Permissions:** 
- Director: All courses
- Teacher: Own courses only

**Request Body:**
```json
{
  "student_id": 4,
  "course_id": 1,
  "score": 92,
  "max_score": 100,
  "assignment_name": "Final Exam",
  "comments": "Excellent performance!"
}
```

**Response (201 Created):**
```json
{
  "message": "Grade created successfully",
  "grade": {
    "id": 10,
    "student_id": 4,
    "student_name": "Emily Davis",
    "course_id": 1,
    "course_name": "Mathematics 101",
    "score": 92,
    "max_score": 100,
    "percentage": 92.0,
    "assignment_name": "Final Exam",
    "comments": "Excellent performance!"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Student is not enrolled in this course"
}
```

---

### Update Grade
**PUT** `/grades/<grade_id>`

Update an existing grade.

**Permissions:** 
- Director: All grades
- Teacher: Grades in own courses only

**Request Body (all fields optional):**
```json
{
  "score": 95,
  "max_score": 100,
  "assignment_name": "Final Exam (Revised)",
  "comments": "Outstanding work!"
}
```

**Response (200 OK):**
```json
{
  "message": "Grade updated successfully",
  "grade": {
    "id": 10,
    "student_id": 4,
    "student_name": "Emily Davis",
    "course_id": 1,
    "course_name": "Mathematics 101",
    "score": 95,
    "max_score": 100,
    "percentage": 95.0,
    "assignment_name": "Final Exam (Revised)",
    "comments": "Outstanding work!"
  }
}
```

---

### Delete Grade
**DELETE** `/grades/<grade_id>`

Delete a grade.

**Permissions:** 
- Director: All grades
- Teacher: Grades in own courses only

**Response (200 OK):**
```json
{
  "message": "Grade deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authorization token is missing"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied. Insufficient permissions."
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Example Usage with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "director", "password": "director123"}'
```

### Get All Users (with token)
```bash
curl -X GET http://localhost:5000/api/users/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Create User
```bash
curl -X POST http://localhost:5000/api/users/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newstudent@sms.edu",
    "username": "newstudent",
    "password": "password123",
    "role": "student",
    "first_name": "New",
    "last_name": "Student"
  }'
```

### Create Course
```bash
curl -X POST http://localhost:5000/api/courses/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Biology 101",
    "code": "BIO101",
    "description": "Introduction to Biology",
    "teacher_id": 2,
    "grade_level": "Grade 10"
  }'
```

### Add Grade
```bash
curl -X POST http://localhost:5000/api/grades/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 4,
    "course_id": 1,
    "score": 88,
    "max_score": 100,
    "assignment_name": "Quiz 1",
    "comments": "Good effort"
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing rate limiting to prevent abuse.

## Pagination

Currently all endpoints return full result sets. For production with large datasets, implement pagination.

## Versioning

Current API version: v1 (implicit)

For future versions, consider using URL versioning: `/api/v2/...`
