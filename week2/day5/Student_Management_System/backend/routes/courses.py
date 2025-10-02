from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.course import Course
from models.user import User
from models.enrollment import Enrollment
from database.index import db
from middleware import role_required, get_current_user

courses_bp = Blueprint('courses', __name__, url_prefix='/api/courses')

@courses_bp.route('/', methods=['GET'])
@jwt_required()
def get_courses():
    """
    Get courses based on user role:
    - Director: all courses
    - Teacher: only their courses
    - Student: only enrolled courses
    """
    current_user = get_current_user()
    
    if current_user.role == 'director':
        courses = Course.query.all()
    elif current_user.role == 'teacher':
        courses = Course.query.filter_by(teacher_id=current_user.id).all()
    elif current_user.role == 'student':
        # Get courses the student is enrolled in
        enrollments = Enrollment.query.filter_by(student_id=current_user.id).all()
        course_ids = [e.course_id for e in enrollments]
        courses = Course.query.filter(Course.id.in_(course_ids)).all() if course_ids else []
    else:
        return jsonify({'error': 'Invalid role'}), 403
    
    return jsonify({
        'courses': [course.to_dict() for course in courses]
    }), 200


@courses_bp.route('/<int:course_id>', methods=['GET'])
@jwt_required()
def get_course(course_id):
    """
    Get course by ID with role-based access control
    """
    current_user = get_current_user()
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Check access permissions
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only view your own courses.'}), 403
    
    if current_user.role == 'student':
        enrollment = Enrollment.query.filter_by(
            student_id=current_user.id,
            course_id=course_id
        ).first()
        if not enrollment:
            return jsonify({'error': 'Access denied. You are not enrolled in this course.'}), 403
    
    return jsonify({
        'course': course.to_dict()
    }), 200


@courses_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('director', 'teacher')
def create_course(current_user):
    """
    Create new course (Director and Teacher can create)
    """
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'code', 'teacher_id']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    # Check if course code already exists
    if Course.query.filter_by(code=data['code']).first():
        return jsonify({'error': 'Course code already exists'}), 409
    
    # Verify teacher exists and has teacher role
    teacher = db.session.get(User, data['teacher_id'])
    if not teacher or teacher.role != 'teacher':
        return jsonify({'error': 'Invalid teacher ID'}), 400
    
    # Teachers can only create courses for themselves
    if current_user.role == 'teacher' and data['teacher_id'] != current_user.id:
        return jsonify({'error': 'Teachers can only create courses for themselves'}), 403
    
    # Create new course
    new_course = Course(
        name=data['name'],
        code=data['code'],
        description=data.get('description', ''),
        teacher_id=data['teacher_id'],
        grade_level=data.get('grade_level', '')
    )
    
    db.session.add(new_course)
    db.session.commit()
    
    return jsonify({
        'message': 'Course created successfully',
        'course': new_course.to_dict()
    }), 201


@courses_bp.route('/<int:course_id>', methods=['PUT'])
@jwt_required()
@role_required('director', 'teacher')
def update_course(course_id, current_user):
    """
    Update course (Director and course Teacher can update)
    """
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only update their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only update your own courses.'}), 403
    
    data = request.get_json()
    
    # Update fields if provided
    if 'name' in data:
        course.name = data['name']
    
    if 'code' in data:
        # Check if code is already taken by another course
        existing = Course.query.filter_by(code=data['code']).first()
        if existing and existing.id != course_id:
            return jsonify({'error': 'Course code already exists'}), 409
        course.code = data['code']
    
    if 'description' in data:
        course.description = data['description']
    
    if 'grade_level' in data:
        course.grade_level = data['grade_level']
    
    if 'teacher_id' in data:
        # Verify teacher exists
        teacher = db.session.get(User, data['teacher_id'])
        if not teacher or teacher.role != 'teacher':
            return jsonify({'error': 'Invalid teacher ID'}), 400
        
        # Only director can reassign courses
        if current_user.role == 'teacher':
            return jsonify({'error': 'Only directors can reassign courses'}), 403
        
        course.teacher_id = data['teacher_id']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Course updated successfully',
        'course': course.to_dict()
    }), 200


@courses_bp.route('/<int:course_id>', methods=['DELETE'])
@jwt_required()
@role_required('director', 'teacher')
def delete_course(course_id, current_user):
    """
    Delete course (Director and course Teacher can delete)
    """
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only delete their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only delete your own courses.'}), 403
    
    db.session.delete(course)
    db.session.commit()
    
    return jsonify({
        'message': 'Course deleted successfully'
    }), 200


@courses_bp.route('/<int:course_id>/enroll', methods=['POST'])
@jwt_required()
@role_required('director', 'teacher')
def enroll_student(course_id, current_user):
    """
    Enroll student in course (Director and course Teacher can enroll)
    """
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only enroll students in their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only enroll students in your own courses.'}), 403
    
    data = request.get_json()
    
    if not data.get('student_id'):
        return jsonify({'error': 'student_id is required'}), 400
    
    # Verify student exists and has student role
    student = db.session.get(User, data['student_id'])
    if not student or student.role != 'student':
        return jsonify({'error': 'Invalid student ID'}), 400
    
    # Check if already enrolled
    existing = Enrollment.query.filter_by(
        student_id=data['student_id'],
        course_id=course_id
    ).first()
    
    if existing:
        return jsonify({'error': 'Student is already enrolled in this course'}), 409
    
    # Create enrollment
    enrollment = Enrollment(
        student_id=data['student_id'],
        course_id=course_id
    )
    
    db.session.add(enrollment)
    db.session.commit()
    
    return jsonify({
        'message': 'Student enrolled successfully',
        'enrollment': enrollment.to_dict()
    }), 201


@courses_bp.route('/<int:course_id>/students', methods=['GET'])
@jwt_required()
@role_required('director', 'teacher')
def get_course_students(course_id, current_user):
    """
    Get students enrolled in a course (Director and course Teacher can access)
    """
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only view students in their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only view students in your own courses.'}), 403
    
    enrollments = Enrollment.query.filter_by(course_id=course_id).all()
    
    return jsonify({
        'students': [enrollment.student.to_dict() for enrollment in enrollments]
    }), 200
