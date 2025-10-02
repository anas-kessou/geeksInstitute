# Testing Guide

Complete guide for testing all features of the Student Management System.

## Prerequisites

Ensure the application is running:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Database seeded with test data

## Test Credentials

```
Director:  username: director  | password: director123
Teacher 1: username: teacher1  | password: teacher123
Teacher 2: username: teacher2  | password: teacher123
Student 1: username: student1  | password: student123
Student 2: username: student2  | password: student123
Student 3: username: student3  | password: student123
```

---

## Test Scenario 1: Director Full Access

### 1.1 Login as Director
1. Navigate to `http://localhost:3000`
2. Enter username: `director`
3. Enter password: `director123`
4. Click "Sign in"
5. **Expected**: Redirect to `/director-dashboard`

### 1.2 User Management
1. Click "Users" tab
2. **Expected**: See list of all users (6 users)
3. Click "Create User" button
4. Fill form:
   - First Name: `Test`
   - Last Name: `Student`
   - Email: `teststudent@sms.edu`
   - Username: `teststudent`
   - Password: `test123`
   - Role: `Student`
5. Click "Create"
6. **Expected**: Success message, user appears in table
7. Click "Edit" on the new user
8. Change first name to `Updated`
9. Click "Update"
10. **Expected**: Success message, name updated
11. Click "Delete" on the new user
12. Confirm deletion
13. **Expected**: User removed from table

### 1.3 Course Management
1. Click "Courses" tab
2. **Expected**: See all courses (4 courses)
3. Click "Create Course" button
4. Fill form:
   - Course Name: `Test Course`
   - Course Code: `TEST101`
   - Description: `Test Description`
   - Teacher ID: `2` (Sarah Johnson)
   - Grade Level: `Grade 10`
5. Click "Create"
6. **Expected**: Success message, course appears
7. Click "Delete" on test course
8. Confirm deletion
9. **Expected**: Course removed

### 1.4 Grade Management
1. Click "Grades" tab
2. **Expected**: See all grades (9 grades)
3. Verify grades show:
   - Student names
   - Course names
   - Scores and percentages
   - Color-coded performance
4. Click "Delete" on any grade
5. Confirm deletion
6. **Expected**: Grade removed

### 1.5 Logout
1. Click "Logout" button
2. **Expected**: Redirect to login page

---

## Test Scenario 2: Teacher Restricted Access

### 2.1 Login as Teacher
1. Navigate to `http://localhost:3000`
2. Enter username: `teacher1`
3. Enter password: `teacher123`
4. Click "Sign in"
5. **Expected**: Redirect to `/teacher-dashboard`

### 2.2 View My Courses
1. **Expected**: See "My Courses" tab active
2. **Expected**: See 2 courses (MATH101, ENG201)
3. Verify course cards show:
   - Course name and code
   - Description
   - Grade level
   - "Add Grade" and "Delete" buttons

### 2.3 Create Course
1. Click "Create Course" button
2. Fill form:
   - Course Name: `Teacher Test Course`
   - Course Code: `TTC101`
   - Description: `Test`
   - Grade Level: `Grade 11`
3. Click "Create"
4. **Expected**: Success message, course appears
5. **Note**: Teacher ID is automatically set to current teacher

### 2.4 Add Grade
1. Click "Add Grade" on MATH101 course
2. Fill form:
   - Student ID: `4` (Emily Davis)
   - Assignment Name: `Test Assignment`
   - Score: `88`
   - Max Score: `100`
   - Comments: `Good work`
3. Click "Add Grade"
4. **Expected**: Success message

### 2.5 View Grades
1. Click "Grades" tab
2. **Expected**: See grades only for teacher's courses
3. Verify grade table shows:
   - Student names
   - Course names
   - Assignment names
   - Scores and percentages
   - Delete button

### 2.6 Delete Grade
1. Click "Delete" on the test grade
2. Confirm deletion
3. **Expected**: Grade removed

### 2.7 View Students
1. Click "Students" tab
2. **Expected**: See all students in the system
3. Verify student cards show:
   - Student initials
   - Full name
   - Email
   - Username

### 2.8 Delete Course
1. Click "My Courses" tab
2. Click "Delete" on test course (TTC101)
3. Confirm deletion
4. **Expected**: Course removed

### 2.9 Test Access Restriction
1. Try to access `/director-dashboard` directly
2. **Expected**: Redirect back to `/teacher-dashboard`

### 2.10 Logout
1. Click "Logout" button
2. **Expected**: Redirect to login page

---

## Test Scenario 3: Student Read-Only Access

### 3.1 Login as Student
1. Navigate to `http://localhost:3000`
2. Enter username: `student1`
3. Enter password: `student123`
4. Click "Sign in"
5. **Expected**: Redirect to `/student-dashboard`

### 3.2 View Overview
1. **Expected**: See "Overview" tab active
2. Verify statistics cards show:
   - Enrolled Courses: `3`
   - Total Assignments: `4`
   - Average Grade: Calculated percentage
3. **Expected**: See grades grouped by course
4. Verify each course section shows:
   - Course name
   - Course average
   - List of assignments with scores
   - Teacher comments

### 3.3 View Courses
1. Click "My Courses" tab
2. **Expected**: See 3 enrolled courses
3. Verify course cards show:
   - Course name and code
   - Description
   - Teacher name
   - Grade level
4. **Expected**: No edit or delete buttons

### 3.4 View All Grades
1. Click "All Grades" tab
2. **Expected**: See table with 4 grades
3. Verify table shows:
   - Course names
   - Assignment names
   - Scores (e.g., 85/100)
   - Percentages with color coding
   - Teacher comments
4. **Expected**: No delete or edit buttons

### 3.5 Test Access Restriction
1. Try to access `/director-dashboard` directly
2. **Expected**: Redirect back to `/student-dashboard`
3. Try to access `/teacher-dashboard` directly
4. **Expected**: Redirect back to `/student-dashboard`

### 3.6 Logout
1. Click "Logout" button
2. **Expected**: Redirect to login page

---

## Test Scenario 4: Authentication & Security

### 4.1 Invalid Login
1. Navigate to `http://localhost:3000`
2. Enter username: `invalid`
3. Enter password: `wrong`
4. Click "Sign in"
5. **Expected**: Error message "Invalid credentials"

### 4.2 Empty Fields
1. Leave username empty
2. Enter password: `test`
3. Click "Sign in"
4. **Expected**: Error message "Please enter both username and password"

### 4.3 Protected Routes
1. Without logging in, try to access:
   - `/director-dashboard`
   - `/teacher-dashboard`
   - `/student-dashboard`
2. **Expected**: Redirect to `/` (login page)

### 4.4 Token Persistence
1. Login as any user
2. Refresh the page
3. **Expected**: Still logged in, dashboard loads

### 4.5 Logout Functionality
1. Login as any user
2. Click "Logout"
3. Try to go back to dashboard
4. **Expected**: Redirect to login page

---

## Test Scenario 5: Role-Based UI Elements

### 5.1 Director UI
1. Login as director
2. **Expected UI Elements**:
   - ✅ "Create User" button visible
   - ✅ "Create Course" button visible
   - ✅ Edit/Delete buttons on users
   - ✅ Delete buttons on courses
   - ✅ Delete buttons on grades
   - ✅ All tabs accessible

### 5.2 Teacher UI
1. Login as teacher
2. **Expected UI Elements**:
   - ❌ No "Create User" button
   - ✅ "Create Course" button visible
   - ✅ "Add Grade" button on courses
   - ✅ Delete buttons on own courses
   - ✅ Delete buttons on grades
   - ✅ Three tabs: Courses, Grades, Students

### 5.3 Student UI
1. Login as student
2. **Expected UI Elements**:
   - ❌ No create buttons
   - ❌ No edit buttons
   - ❌ No delete buttons
   - ✅ Read-only views
   - ✅ Three tabs: Overview, Courses, Grades

---

## Test Scenario 6: Data Validation

### 6.1 User Creation Validation (Director)
1. Login as director
2. Click "Create User"
3. Try to submit with empty fields
4. **Expected**: HTML5 validation prevents submission
5. Try duplicate username
6. **Expected**: Error "Username already exists"
7. Try duplicate email
8. **Expected**: Error "Email already exists"

### 6.2 Course Creation Validation
1. Login as teacher or director
2. Click "Create Course"
3. Try duplicate course code
4. **Expected**: Error "Course code already exists"
5. Try invalid teacher ID
6. **Expected**: Error "Invalid teacher ID"

### 6.3 Grade Creation Validation
1. Login as teacher
2. Try to add grade for non-enrolled student
3. **Expected**: Error "Student is not enrolled in this course"

---

## Test Scenario 7: Performance & UX

### 7.1 Loading States
1. Login and navigate between tabs
2. **Expected**: Loading spinner appears briefly
3. **Expected**: Smooth transitions

### 7.2 Success Messages
1. Perform any create/update/delete operation
2. **Expected**: Green success message appears
3. **Expected**: Message auto-dismisses or persists appropriately

### 7.3 Error Messages
1. Perform invalid operation
2. **Expected**: Red error message appears
3. **Expected**: Clear, descriptive error text

### 7.4 Confirmation Dialogs
1. Click any delete button
2. **Expected**: Browser confirmation dialog
3. Click "Cancel"
4. **Expected**: No deletion occurs
5. Click delete again and confirm
6. **Expected**: Item deleted

### 7.5 Modal Behavior
1. Open any create/edit modal
2. Click "Cancel"
3. **Expected**: Modal closes, no changes
4. Open modal again and submit
5. **Expected**: Modal auto-closes after success

---

## Test Scenario 8: Responsive Design

### 8.1 Desktop View (1920x1080)
1. Open application in full screen
2. **Expected**: 
   - Wide layout utilized
   - 3-column grid for cards
   - Full tables visible

### 8.2 Tablet View (768x1024)
1. Resize browser to tablet size
2. **Expected**:
   - 2-column grid for cards
   - Tables remain scrollable
   - Navigation intact

### 8.3 Mobile View (375x667)
1. Resize browser to mobile size
2. **Expected**:
   - Single column layout
   - Stacked cards
   - Horizontal scroll on tables
   - Touch-friendly buttons

---

## Test Scenario 9: API Testing (Optional)

### 9.1 Using cURL or Postman

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "director", "password": "director123"}'
```

**Get Users (with token):**
```bash
curl -X GET http://localhost:5000/api/users/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Create User:**
```bash
curl -X POST http://localhost:5000/api/users/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@sms.edu",
    "username": "apitest",
    "password": "test123",
    "role": "student",
    "first_name": "API",
    "last_name": "Test"
  }'
```

---

## Test Scenario 10: Edge Cases

### 10.1 Long Text Handling
1. Create user with very long name (50+ characters)
2. **Expected**: Text truncates or wraps appropriately

### 10.2 Special Characters
1. Create user with special characters in name
2. **Expected**: Handles correctly

### 10.3 Concurrent Operations
1. Open two browser windows
2. Login as director in both
3. Delete user in one window
4. Try to edit same user in other window
5. **Expected**: Appropriate error handling

### 10.4 Network Errors
1. Stop backend server
2. Try to perform any operation
3. **Expected**: Error message displayed
4. Restart backend
5. **Expected**: Operations work again

---

## Checklist: All Features Tested

### Authentication ✅
- [x] Login with valid credentials
- [x] Login with invalid credentials
- [x] Logout functionality
- [x] Token persistence
- [x] Protected routes

### Director Features ✅
- [x] View all users
- [x] Create user
- [x] Update user
- [x] Delete user
- [x] View all courses
- [x] Create course
- [x] Delete course
- [x] View all grades
- [x] Delete grade

### Teacher Features ✅
- [x] View own courses
- [x] Create course
- [x] Delete own course
- [x] Add grade
- [x] View grades for own courses
- [x] Delete grade
- [x] View all students

### Student Features ✅
- [x] View enrolled courses
- [x] View own grades
- [x] View grade statistics
- [x] Calculate averages
- [x] Read-only access

### UI/UX ✅
- [x] Responsive design
- [x] Loading states
- [x] Success messages
- [x] Error messages
- [x] Confirmation dialogs
- [x] Modal behavior
- [x] Color coding
- [x] Navigation

### Security ✅
- [x] Role-based access
- [x] Protected API endpoints
- [x] Token validation
- [x] Password hashing
- [x] CORS configuration

---

## Bug Report Template

If you find any issues during testing:

```
**Bug Title**: Brief description

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happened

**User Role**: Director/Teacher/Student

**Browser**: Chrome/Firefox/Safari

**Screenshots**: (if applicable)
```

---

## Test Results Summary

After completing all tests, document:

- ✅ **Passed Tests**: List working features
- ❌ **Failed Tests**: List any issues found
- ⚠️ **Warnings**: List minor issues or improvements
- 📝 **Notes**: Additional observations

---

## Automated Testing (Future Enhancement)

For production deployment, consider implementing:
- Unit tests (Jest, pytest)
- Integration tests
- End-to-end tests (Cypress, Selenium)
- API tests (Postman collections)
- Load testing
- Security testing

---

## Performance Benchmarks

Expected performance:
- Login: < 1 second
- Page load: < 2 seconds
- API calls: < 500ms
- Database queries: < 100ms

---

## Conclusion

This testing guide covers all major features and user scenarios. Complete all tests to ensure the application works as expected before deployment.

**Happy Testing! 🧪**
