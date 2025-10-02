#!/usr/bin/env python3
"""
Test database connection to PostgreSQL
"""
import sys
from index import create_app
from database.index import db
from models.user import User
from models.course import Course
from models.enrollment import Enrollment
from models.grade import Grade

def test_connection():
    """Test database connection and display information"""
    print("="*70)
    print("Testing PostgreSQL Database Connection")
    print("="*70)
    
    app = create_app()
    
    with app.app_context():
        try:
            # Test connection by creating tables
            db.create_all()
            print("✓ Successfully connected to PostgreSQL database")
            print(f"✓ Database: School_Management_System")
            print(f"✓ Host: localhost:5432")
            print(f"✓ User: postgres")
            print()
            
            # Check existing data
            print("Current Database Statistics:")
            print("-" * 70)
            
            user_count = User.query.count()
            course_count = Course.query.count()
            enrollment_count = Enrollment.query.count()
            grade_count = Grade.query.count()
            
            print(f"  Users:       {user_count}")
            print(f"  Courses:     {course_count}")
            print(f"  Enrollments: {enrollment_count}")
            print(f"  Grades:      {grade_count}")
            print()
            
            if user_count == 0:
                print("⚠ Database is empty. Run 'python seed.py' to populate with sample data.")
            else:
                print("✓ Database contains data")
                
                # Show user breakdown
                directors = User.query.filter_by(role='director').count()
                teachers = User.query.filter_by(role='teacher').count()
                students = User.query.filter_by(role='student').count()
                
                print()
                print("User Breakdown:")
                print(f"  Directors: {directors}")
                print(f"  Teachers:  {teachers}")
                print(f"  Students:  {students}")
            
            print()
            print("="*70)
            print("✓ Database connection test PASSED")
            print("="*70)
            return True
            
        except Exception as e:
            print()
            print("="*70)
            print("✗ Database connection test FAILED")
            print("="*70)
            print(f"\nError: {str(e)}")
            print()
            print("Troubleshooting steps:")
            print("1. Ensure PostgreSQL is running:")
            print("   sudo systemctl status postgresql")
            print()
            print("2. Verify database exists:")
            print("   psql -U postgres -l")
            print()
            print("3. Create database if needed:")
            print("   psql -U postgres -c 'CREATE DATABASE \"School_Management_System\";'")
            print()
            print("4. Check credentials in config.py")
            print("="*70)
            return False

if __name__ == '__main__':
    success = test_connection()
    sys.exit(0 if success else 1)
