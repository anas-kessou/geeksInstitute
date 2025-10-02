"""
Main Flask application - index.py
This is the main entry point for the School Management System backend.
"""
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database.index import init_db, db

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    init_db(app)
    jwt = JWTManager(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.users import users_bp
    from routes.courses import courses_bp
    from routes.grades import grades_bp
    from routes.web import web_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(grades_bp)
    app.register_blueprint(web_bp)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'error': 'Token has expired'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'error': 'Invalid token'}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({'error': 'Authorization token is missing'}), 401
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'SMS API is running'}), 200
    
    # Root endpoint - Dashboard
    @app.route('/')
    def index():
        """Main dashboard page"""
        try:
            from models.user import User
            from models.course import Course
            from models.enrollment import Enrollment
            from models.grade import Grade
            from datetime import datetime
            
            stats = {
                'total_users': User.query.count(),
                'total_courses': Course.query.count(),
                'total_enrollments': Enrollment.query.count(),
                'total_grades': Grade.query.count()
            }
            
            # Get recent activity
            recent_activities = []
            
            # Recent users (last 5)
            recent_users = User.query.order_by(User.created_at.desc()).limit(5).all()
            for user in recent_users:
                recent_activities.append({
                    'type': 'User',
                    'type_color': 'primary',
                    'description': f'New {user.role} registered: {user.first_name} {user.last_name}',
                    'date': user.created_at.strftime('%Y-%m-%d %H:%M') if user.created_at else 'N/A'
                })
            
            # Recent grades (last 5)
            recent_grades = Grade.query.order_by(Grade.created_at.desc()).limit(5).all()
            for grade in recent_grades:
                percentage = round((grade.score / grade.max_score * 100), 1) if grade.max_score > 0 else 0
                recent_activities.append({
                    'type': 'Grade',
                    'type_color': 'success' if percentage >= 70 else 'warning',
                    'description': f'{grade.student.first_name} {grade.student.last_name} scored {percentage}% in {grade.assignment_name}',
                    'date': grade.created_at.strftime('%Y-%m-%d %H:%M') if grade.created_at else 'N/A'
                })
            
            # Recent enrollments (last 5)
            recent_enrollments = Enrollment.query.order_by(Enrollment.enrolled_at.desc()).limit(5).all()
            for enrollment in recent_enrollments:
                recent_activities.append({
                    'type': 'Enrollment',
                    'type_color': 'info',
                    'description': f'{enrollment.student.first_name} {enrollment.student.last_name} enrolled in {enrollment.course.name}',
                    'date': enrollment.enrolled_at.strftime('%Y-%m-%d %H:%M') if enrollment.enrolled_at else 'N/A'
                })
            
            # Sort by date (most recent first) and limit to 10
            recent_activities.sort(key=lambda x: x['date'], reverse=True)
            recent_activities = recent_activities[:10]
            
            return render_template('index.html', stats=stats, recent_activities=recent_activities)
        except Exception as e:
            # Fallback to JSON API response if templates fail
            return jsonify({
                'message': 'Student Management System API',
                'version': '1.0.0',
                'database': 'School_Management_System (PostgreSQL)',
                'endpoints': {
                    'health': '/api/health',
                    'auth': '/api/auth/*',
                    'users': '/api/users/*',
                    'courses': '/api/courses/*',
                    'grades': '/api/grades/*'
                },
                'error': str(e)
            }), 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        try:
            # Test database connection
            db.create_all()
            print("="*60)
            print("✓ Database tables created successfully!")
            print("✓ Connected to: School_Management_System (PostgreSQL)")
            print("✓ Database Host: localhost:5432")
            print("✓ Database User: postgres")
            print("="*60)
            print("\nServer starting on http://0.0.0.0:5000")
            print("API Documentation available at http://0.0.0.0:5000/api/health")
            print("="*60)
        except Exception as e:
            print("="*60)
            print("✗ Database connection failed!")
            print(f"✗ Error: {str(e)}")
            print("="*60)
            print("\nPlease ensure:")
            print("1. PostgreSQL is running on localhost:5432")
            print("2. Database 'School_Management_System' exists")
            print("3. User 'postgres' has correct password")
            print("="*60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
