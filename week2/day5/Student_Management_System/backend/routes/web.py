"""
Web routes for HTML interface
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash
from models.user import User
from models.course import Course
from models.enrollment import Enrollment
from models.grade import Grade
from database.index import db

web_bp = Blueprint('web', __name__)

@web_bp.route('/users')
def users_list():
    """List all users with grades for students"""
    users = User.query.all()
    
    # Calculate average grades for students
    user_data = []
    for user in users:
        user_dict = user.to_dict()
        if user.role == 'student':
            grades = Grade.query.filter_by(student_id=user.id).all()
            if grades:
                avg = sum([(g.score / g.max_score * 100) for g in grades if g.max_score > 0]) / len(grades)
                user_dict['average_grade'] = round(avg, 1)
                user_dict['total_grades'] = len(grades)
            else:
                user_dict['average_grade'] = None
                user_dict['total_grades'] = 0
        user_data.append(user_dict)
    
    return render_template('users_list.html', users=user_data)

@web_bp.route('/users/create', methods=['GET', 'POST'])
def users_create():
    """Create new user"""
    if request.method == 'POST':
        try:
            user = User(
                email=request.form['email'],
                username=request.form['username'],
                role=request.form['role'],
                first_name=request.form['first_name'],
                last_name=request.form['last_name']
            )
            user.set_password(request.form['password'])
            db.session.add(user)
            db.session.commit()
            flash('User created successfully!', 'success')
            return redirect(url_for('web.users_list'))
        except Exception as e:
            flash(f'Error creating user: {str(e)}', 'danger')
    
    return render_template('create.html', 
                         entity_type='User',
                         action_url=url_for('web.users_create'),
                         back_url=url_for('web.users_list'))

@web_bp.route('/users/<int:user_id>')
def users_detail(user_id):
    """View user details"""
    user = db.session.get(User, user_id)
    if not user:
        flash('User not found', 'danger')
        return redirect(url_for('web.users_list'))
    
    return render_template('details.html',
                         entity_type='User',
                         entity=user.to_dict(),
                         edit_url=url_for('web.users_edit', user_id=user_id),
                         delete_url=url_for('web.users_delete', user_id=user_id),
                         back_url=url_for('web.users_list'))

@web_bp.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def users_edit(user_id):
    """Edit user"""
    user = db.session.get(User, user_id)
    if not user:
        flash('User not found', 'danger')
        return redirect(url_for('web.users_list'))
    
    if request.method == 'POST':
        try:
            user.email = request.form['email']
            user.username = request.form['username']
            user.first_name = request.form['first_name']
            user.last_name = request.form['last_name']
            user.role = request.form['role']
            if request.form.get('password'):
                user.set_password(request.form['password'])
            db.session.commit()
            flash('User updated successfully!', 'success')
            return redirect(url_for('web.users_detail', user_id=user_id))
        except Exception as e:
            flash(f'Error updating user: {str(e)}', 'danger')
    
    # Get student's grades and courses if student
    grades = []
    courses = []
    if user.role == 'student':
        grades = Grade.query.filter_by(student_id=user_id).all()
        # Get ALL available courses from database
        courses = Course.query.all()
    
    return render_template('edit.html',
                         entity_type='User',
                         entity=user.to_dict(),
                         action_url=url_for('web.users_edit', user_id=user_id),
                         back_url=url_for('web.users_detail', user_id=user_id),
                         grades=grades,
                         courses=courses)

@web_bp.route('/users/<int:user_id>/delete', methods=['POST'])
def users_delete(user_id):
    """Delete user"""
    user = db.session.get(User, user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        flash('User deleted successfully!', 'success')
    return redirect(url_for('web.users_list'))

@web_bp.route('/users/<int:user_id>/add-grade', methods=['POST'])
def users_add_grade(user_id):
    """Add grade to student"""
    user = db.session.get(User, user_id)
    if not user or user.role != 'student':
        flash('Invalid student', 'danger')
        return redirect(url_for('web.users_list'))
    
    try:
        from datetime import datetime
        # Get course name for assignment
        course = db.session.get(Course, request.form['course_id'])
        assignment_name = f"{course.name} Grade" if course else "Course Grade"
        
        grade = Grade(
            student_id=user_id,
            course_id=request.form['course_id'],
            assignment_name=assignment_name,
            score=float(request.form['score']),
            max_score=float(request.form['max_score']),
            comments=request.form.get('comments', '')
        )
        db.session.add(grade)
        db.session.commit()
        flash('Grade added successfully!', 'success')
    except Exception as e:
        flash(f'Error adding grade: {str(e)}', 'danger')
    
    return redirect(url_for('web.users_edit', user_id=user_id))

@web_bp.route('/grades/<int:grade_id>/delete', methods=['POST'])
def grade_delete(grade_id):
    """Delete a grade"""
    grade = db.session.get(Grade, grade_id)
    if grade:
        student_id = grade.student_id
        db.session.delete(grade)
        db.session.commit()
        flash('Grade deleted successfully!', 'success')
        return redirect(url_for('web.users_edit', user_id=student_id))
    flash('Grade not found', 'danger')
    return redirect(url_for('web.users_list'))

@web_bp.route('/courses')
def courses_list():
    """List all courses"""
    courses = Course.query.all()
    return render_template('courses_list.html', courses=courses)

@web_bp.route('/courses/create', methods=['GET', 'POST'])
def courses_create():
    """Create new course"""
    teachers = User.query.filter_by(role='teacher').all()
    
    if request.method == 'POST':
        try:
            course = Course(
                name=request.form['name'],
                code=request.form['code'],
                description=request.form.get('description'),
                teacher_id=request.form['teacher_id'],
                grade_level=request.form.get('grade_level')
            )
            db.session.add(course)
            db.session.commit()
            flash('Course created successfully!', 'success')
            return redirect(url_for('web.courses_list'))
        except Exception as e:
            flash(f'Error creating course: {str(e)}', 'danger')
    
    return render_template('create.html',
                         entity_type='Course',
                         action_url=url_for('web.courses_create'),
                         back_url=url_for('web.courses_list'),
                         teachers=teachers)

@web_bp.route('/courses/<int:course_id>')
def courses_detail(course_id):
    """View course details"""
    course = db.session.get(Course, course_id)
    if not course:
        flash('Course not found', 'danger')
        return redirect(url_for('web.courses_list'))
    
    return render_template('details.html',
                         entity_type='Course',
                         entity=course.to_dict(),
                         edit_url=url_for('web.courses_edit', course_id=course_id),
                         delete_url=url_for('web.courses_delete', course_id=course_id),
                         back_url=url_for('web.courses_list'))

@web_bp.route('/courses/<int:course_id>/edit', methods=['GET', 'POST'])
def courses_edit(course_id):
    """Edit course"""
    course = db.session.get(Course, course_id)
    if not course:
        flash('Course not found', 'danger')
        return redirect(url_for('web.courses_list'))
    
    teachers = User.query.filter_by(role='teacher').all()
    
    if request.method == 'POST':
        try:
            course.name = request.form['name']
            course.code = request.form['code']
            course.description = request.form.get('description')
            course.teacher_id = request.form['teacher_id']
            course.grade_level = request.form.get('grade_level')
            db.session.commit()
            flash('Course updated successfully!', 'success')
            return redirect(url_for('web.courses_detail', course_id=course_id))
        except Exception as e:
            flash(f'Error updating course: {str(e)}', 'danger')
    
    return render_template('edit.html',
                         entity_type='Course',
                         entity=course.to_dict(),
                         action_url=url_for('web.courses_edit', course_id=course_id),
                         back_url=url_for('web.courses_detail', course_id=course_id),
                         teachers=teachers)

@web_bp.route('/courses/<int:course_id>/delete', methods=['POST'])
def courses_delete(course_id):
    """Delete course"""
    course = db.session.get(Course, course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        flash('Course deleted successfully!', 'success')
    return redirect(url_for('web.courses_list'))

@web_bp.route('/stats')
def stats():
    """Statistics page"""
    # Calculate statistics
    total_students = User.query.filter_by(role='student').count()
    total_teachers = User.query.filter_by(role='teacher').count()
    total_courses = Course.query.count()
    
    # Calculate average grade
    grades = Grade.query.all()
    avg_grade = 0
    if grades:
        total_percentage = sum([(g.score / g.max_score * 100) for g in grades if g.max_score > 0])
        avg_grade = round(total_percentage / len(grades), 1)
    
    # Enrollment stats
    enrollment_stats = []
    for course in Course.query.all():
        enrollment_count = Enrollment.query.filter_by(course_id=course.id).count()
        enrollment_stats.append({
            'name': course.name,
            'student_count': enrollment_count,
            'capacity_percentage': min(100, (enrollment_count / 30) * 100)  # Assuming max 30 students
        })
    
    # Grade distribution
    grade_dist = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0}
    for grade in grades:
        percentage = (grade.score / grade.max_score * 100) if grade.max_score > 0 else 0
        if percentage >= 90:
            grade_dist['A'] += 1
        elif percentage >= 80:
            grade_dist['B'] += 1
        elif percentage >= 70:
            grade_dist['C'] += 1
        elif percentage >= 60:
            grade_dist['D'] += 1
        else:
            grade_dist['F'] += 1
    
    total_grades = len(grades) if grades else 1
    grade_distribution = {
        'A': grade_dist['A'],
        'B': grade_dist['B'],
        'C': grade_dist['C'],
        'D': grade_dist['D'],
        'F': grade_dist['F'],
        'A_percent': round((grade_dist['A'] / total_grades) * 100, 1),
        'B_percent': round((grade_dist['B'] / total_grades) * 100, 1),
        'C_percent': round((grade_dist['C'] / total_grades) * 100, 1),
        'D_percent': round((grade_dist['D'] / total_grades) * 100, 1),
        'F_percent': round((grade_dist['F'] / total_grades) * 100, 1),
    }
    
    # Top students
    student_averages = {}
    for student in User.query.filter_by(role='student').all():
        student_grades = Grade.query.filter_by(student_id=student.id).all()
        if student_grades:
            avg = sum([(g.score / g.max_score * 100) for g in student_grades if g.max_score > 0]) / len(student_grades)
            student_averages[student.id] = {
                'name': f"{student.first_name} {student.last_name}",
                'average': round(avg, 1)
            }
    
    top_students = sorted(student_averages.values(), key=lambda x: x['average'], reverse=True)[:5]
    
    # Popular courses
    popular_courses = []
    for course in Course.query.all():
        enrollment_count = Enrollment.query.filter_by(course_id=course.id).count()
        popular_courses.append({
            'name': course.name,
            'teacher': f"{course.teacher.first_name} {course.teacher.last_name}",
            'enrollments': enrollment_count
        })
    popular_courses = sorted(popular_courses, key=lambda x: x['enrollments'], reverse=True)[:5]
    
    stats_data = {
        'total_students': total_students,
        'total_teachers': total_teachers,
        'total_courses': total_courses,
        'average_grade': avg_grade
    }
    
    return render_template('stats.html',
                         stats=stats_data,
                         enrollment_stats=enrollment_stats,
                         grade_distribution=grade_distribution,
                         top_students=top_students,
                         popular_courses=popular_courses)
