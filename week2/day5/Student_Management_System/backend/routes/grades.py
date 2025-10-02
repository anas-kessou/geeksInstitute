from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.grade import Grade
from models.course import Course
from models.user import User
from models.enrollment import Enrollment
from database.index import db
from middleware import role_required, get_current_user

grades_bp = Blueprint('grades', __name__, url_prefix='/api/grades')

@grades_bp.route('/', methods=['GET'])
@jwt_required()
def get_grades():
    """
    Get grades based on user role:
    - Director: all grades
    - Teacher: grades for their courses
    - Student: only their own grades
    """
    current_user = get_current_user()
    
    if current_user.role == 'director':
        grades = Grade.query.all()
    elif current_user.role == 'teacher':
        # Get grades for courses taught by this teacher
        course_ids = [c.id for c in Course.query.filter_by(teacher_id=current_user.id).all()]
        grades = Grade.query.filter(Grade.course_id.in_(course_ids)).all() if course_ids else []
    elif current_user.role == 'student':
        grades = Grade.query.filter_by(student_id=current_user.id).all()
    else:
        return jsonify({'error': 'Invalid role'}), 403
    
    return jsonify({
        'grades': [grade.to_dict() for grade in grades]
    }), 200


@grades_bp.route('/student/<int:student_id>', methods=['GET'])
@jwt_required()
def get_student_grades(student_id):
    """
    Get grades for a specific student
    """
    current_user = get_current_user()
    
    # Students can only view their own grades
    if current_user.role == 'student' and current_user.id != student_id:
        return jsonify({'error': 'Access denied. You can only view your own grades.'}), 403
    
    # Teachers can only view grades for students in their courses
    if current_user.role == 'teacher':
        teacher_course_ids = [c.id for c in Course.query.filter_by(teacher_id=current_user.id).all()]
        grades = Grade.query.filter(
            Grade.student_id == student_id,
            Grade.course_id.in_(teacher_course_ids)
        ).all() if teacher_course_ids else []
    else:
        grades = Grade.query.filter_by(student_id=student_id).all()
    
    return jsonify({
        'grades': [grade.to_dict() for grade in grades]
    }), 200


@grades_bp.route('/course/<int:course_id>', methods=['GET'])
@jwt_required()
@role_required('director', 'teacher')
def get_course_grades(course_id, current_user):
    """
    Get all grades for a specific course (Director and course Teacher only)
    """
    course = db.session.get(Course, course_id)
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only view grades for their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only view grades for your own courses.'}), 403
    
    grades = Grade.query.filter_by(course_id=course_id).all()
    
    return jsonify({
        'grades': [grade.to_dict() for grade in grades]
    }), 200


@grades_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('director', 'teacher')
def create_grade(current_user):
    """
    Create new grade (Director and course Teacher can create)
    """
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['student_id', 'course_id', 'score', 'assignment_name']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    # Verify course exists
    course = db.session.get(Course, data['course_id'])
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Teachers can only add grades for their own courses
    if current_user.role == 'teacher' and course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only add grades for your own courses.'}), 403
    
    # Verify student exists and is enrolled in the course
    student = db.session.get(User, data['student_id'])
    if not student or student.role != 'student':
        return jsonify({'error': 'Invalid student ID'}), 400
    
    enrollment = Enrollment.query.filter_by(
        student_id=data['student_id'],
        course_id=data['course_id']
    ).first()
    
    if not enrollment:
        return jsonify({'error': 'Student is not enrolled in this course'}), 400
    
    # Create new grade
    new_grade = Grade(
        student_id=data['student_id'],
        course_id=data['course_id'],
        score=float(data['score']),
        max_score=float(data.get('max_score', 100.0)),
        assignment_name=data['assignment_name'],
        comments=data.get('comments', '')
    )
    
    db.session.add(new_grade)
    db.session.commit()
    
    return jsonify({
        'message': 'Grade created successfully',
        'grade': new_grade.to_dict()
    }), 201


@grades_bp.route('/<int:grade_id>', methods=['PUT'])
@jwt_required()
@role_required('director', 'teacher')
def update_grade(grade_id, current_user):
    """
    Update grade (Director and course Teacher can update)
    """
    grade = db.session.get(Grade, grade_id)
    
    if not grade:
        return jsonify({'error': 'Grade not found'}), 404
    
    # Teachers can only update grades for their own courses
    if current_user.role == 'teacher' and grade.course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only update grades for your own courses.'}), 403
    
    data = request.get_json()
    
    # Update fields if provided
    if 'score' in data:
        grade.score = float(data['score'])
    
    if 'max_score' in data:
        grade.max_score = float(data['max_score'])
    
    if 'assignment_name' in data:
        grade.assignment_name = data['assignment_name']
    
    if 'comments' in data:
        grade.comments = data['comments']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Grade updated successfully',
        'grade': grade.to_dict()
    }), 200


@grades_bp.route('/<int:grade_id>', methods=['DELETE'])
@jwt_required()
@role_required('director', 'teacher')
def delete_grade(grade_id, current_user):
    """
    Delete grade (Director and course Teacher can delete)
    """
    grade = db.session.get(Grade, grade_id)
    
    if not grade:
        return jsonify({'error': 'Grade not found'}), 404
    
    # Teachers can only delete grades for their own courses
    if current_user.role == 'teacher' and grade.course.teacher_id != current_user.id:
        return jsonify({'error': 'Access denied. You can only delete grades for your own courses.'}), 403
    
    db.session.delete(grade)
    db.session.commit()
    
    return jsonify({
        'message': 'Grade deleted successfully'
    }), 200
