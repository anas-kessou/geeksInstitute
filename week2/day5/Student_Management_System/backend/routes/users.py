from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.user import User
from database.index import db
from middleware import role_required

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('director')
def get_all_users(current_user):
    """
    Get all users (Director only)
    """
    role_filter = request.args.get('role')
    
    query = User.query
    if role_filter:
        query = query.filter_by(role=role_filter)
    
    users = query.all()
    
    return jsonify({
        'users': [user.to_dict() for user in users]
    }), 200


@users_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
@role_required('director', 'teacher')
def get_user(user_id, current_user):
    """
    Get user by ID (Director and Teacher can access)
    """
    user = db.session.get(User, user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': user.to_dict()
    }), 200


@users_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('director')
def create_user(current_user):
    """
    Create new user (Director only)
    """
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'username', 'password', 'role', 'first_name', 'last_name']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    # Validate role
    if data['role'] not in ['director', 'teacher', 'student']:
        return jsonify({'error': 'Invalid role. Must be director, teacher, or student'}), 400
    
    # Check if username or email already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409
    
    # Create new user
    new_user = User(
        email=data['email'],
        username=data['username'],
        role=data['role'],
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'User created successfully',
        'user': new_user.to_dict()
    }), 201


@users_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
@role_required('director')
def update_user(user_id, current_user):
    """
    Update user (Director only)
    """
    user = db.session.get(User, user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    # Update fields if provided
    if 'email' in data:
        # Check if email is already taken by another user
        existing = User.query.filter_by(email=data['email']).first()
        if existing and existing.id != user_id:
            return jsonify({'error': 'Email already exists'}), 409
        user.email = data['email']
    
    if 'username' in data:
        # Check if username is already taken by another user
        existing = User.query.filter_by(username=data['username']).first()
        if existing and existing.id != user_id:
            return jsonify({'error': 'Username already exists'}), 409
        user.username = data['username']
    
    if 'password' in data:
        user.set_password(data['password'])
    
    if 'role' in data:
        if data['role'] not in ['director', 'teacher', 'student']:
            return jsonify({'error': 'Invalid role'}), 400
        user.role = data['role']
    
    if 'first_name' in data:
        user.first_name = data['first_name']
    
    if 'last_name' in data:
        user.last_name = data['last_name']
    
    db.session.commit()
    
    return jsonify({
        'message': 'User updated successfully',
        'user': user.to_dict()
    }), 200


@users_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
@role_required('director')
def delete_user(user_id, current_user):
    """
    Delete user (Director only)
    """
    user = db.session.get(User, user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Prevent deleting yourself
    if user.id == current_user.id:
        return jsonify({'error': 'Cannot delete your own account'}), 400
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({
        'message': 'User deleted successfully'
    }), 200


@users_bp.route('/teachers', methods=['GET'])
@jwt_required()
@role_required('director', 'teacher', 'student')
def get_teachers(current_user):
    """
    Get all teachers (accessible by all roles)
    """
    teachers = User.query.filter_by(role='teacher').all()
    
    return jsonify({
        'teachers': [teacher.to_dict() for teacher in teachers]
    }), 200


@users_bp.route('/students', methods=['GET'])
@jwt_required()
@role_required('director', 'teacher')
def get_students(current_user):
    """
    Get all students (Director and Teacher can access)
    """
    students = User.query.filter_by(role='student').all()
    
    return jsonify({
        'students': [student.to_dict() for student in students]
    }), 200
