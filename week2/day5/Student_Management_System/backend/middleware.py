from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models.user import User
from database.index import db

def role_required(*allowed_roles):
    """
    Decorator to restrict access based on user roles.
    Usage: @role_required('director', 'teacher')
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            user = db.session.get(User, current_user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            if user.role not in allowed_roles:
                return jsonify({'error': 'Access denied. Insufficient permissions.'}), 403
            
            return fn(*args, **kwargs, current_user=user)
        return wrapper
    return decorator


def get_current_user():
    """Helper function to get current authenticated user"""
    verify_jwt_in_request()
    current_user_id = get_jwt_identity()
    return db.session.get(User, current_user_id)
