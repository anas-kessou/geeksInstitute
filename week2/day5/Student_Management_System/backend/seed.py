"""
Seed database with example users and data
"""
from index import create_app
from database.index import db
from models.user import User
from models.course import Course
from models.enrollment import Enrollment
from models.grade import Grade

def seed_database():
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        print("Clearing existing data...")
        Grade.query.delete()
        Enrollment.query.delete()
        Course.query.delete()
        User.query.delete()
        db.session.commit()
        
        # Create Director
        print("Creating Director...")
        director = User(
            email='director@sms.edu',
            username='director',
            role='director',
            first_name='John',
            last_name='Smith'
        )
        director.set_password('director123')
        db.session.add(director)
        
        # Create Teachers
        print("Creating Teachers...")
        teacher1 = User(
            email='teacher1@sms.edu',
            username='teacher1',
            role='teacher',
            first_name='Sarah',
            last_name='Johnson'
        )
        teacher1.set_password('teacher123')
        db.session.add(teacher1)
        
        teacher2 = User(
            email='teacher2@sms.edu',
            username='teacher2',
            role='teacher',
            first_name='Michael',
            last_name='Brown'
        )
        teacher2.set_password('teacher123')
        db.session.add(teacher2)
        
        # Create Students
        print("Creating Students...")
        student1 = User(
            email='student1@sms.edu',
            username='student1',
            role='student',
            first_name='Emily',
            last_name='Davis'
        )
        student1.set_password('student123')
        db.session.add(student1)
        
        student2 = User(
            email='student2@sms.edu',
            username='student2',
            role='student',
            first_name='James',
            last_name='Wilson'
        )
        student2.set_password('student123')
        db.session.add(student2)
        
        student3 = User(
            email='student3@sms.edu',
            username='student3',
            role='student',
            first_name='Olivia',
            last_name='Martinez'
        )
        student3.set_password('student123')
        db.session.add(student3)
        
        db.session.commit()
        
        # Create Courses
        print("Creating Courses...")
        course1 = Course(
            name='Mathematics 101',
            code='MATH101',
            description='Introduction to Algebra and Geometry',
            teacher_id=teacher1.id,
            grade_level='Grade 10'
        )
        db.session.add(course1)
        
        course2 = Course(
            name='English Literature',
            code='ENG201',
            description='Classic and Modern Literature',
            teacher_id=teacher1.id,
            grade_level='Grade 10'
        )
        db.session.add(course2)
        
        course3 = Course(
            name='Physics 101',
            code='PHY101',
            description='Introduction to Physics',
            teacher_id=teacher2.id,
            grade_level='Grade 11'
        )
        db.session.add(course3)
        
        course4 = Course(
            name='Chemistry 101',
            code='CHEM101',
            description='Basic Chemistry Concepts',
            teacher_id=teacher2.id,
            grade_level='Grade 11'
        )
        db.session.add(course4)
        
        db.session.commit()
        
        # Create Enrollments
        print("Creating Enrollments...")
        enrollments = [
            Enrollment(student_id=student1.id, course_id=course1.id),
            Enrollment(student_id=student1.id, course_id=course2.id),
            Enrollment(student_id=student1.id, course_id=course3.id),
            Enrollment(student_id=student2.id, course_id=course1.id),
            Enrollment(student_id=student2.id, course_id=course3.id),
            Enrollment(student_id=student2.id, course_id=course4.id),
            Enrollment(student_id=student3.id, course_id=course2.id),
            Enrollment(student_id=student3.id, course_id=course4.id),
        ]
        
        for enrollment in enrollments:
            db.session.add(enrollment)
        
        db.session.commit()
        
        # Create Grades
        print("Creating Grades...")
        grades = [
            # Student 1 grades
            Grade(student_id=student1.id, course_id=course1.id, score=85, max_score=100, 
                  assignment_name='Midterm Exam', comments='Good work!'),
            Grade(student_id=student1.id, course_id=course1.id, score=42, max_score=50, 
                  assignment_name='Quiz 1', comments='Excellent'),
            Grade(student_id=student1.id, course_id=course2.id, score=90, max_score=100, 
                  assignment_name='Essay Assignment', comments='Outstanding analysis'),
            Grade(student_id=student1.id, course_id=course3.id, score=78, max_score=100, 
                  assignment_name='Lab Report', comments='Needs improvement'),
            
            # Student 2 grades
            Grade(student_id=student2.id, course_id=course1.id, score=92, max_score=100, 
                  assignment_name='Midterm Exam', comments='Excellent performance'),
            Grade(student_id=student2.id, course_id=course3.id, score=88, max_score=100, 
                  assignment_name='Lab Report', comments='Very good'),
            Grade(student_id=student2.id, course_id=course4.id, score=95, max_score=100, 
                  assignment_name='Final Project', comments='Outstanding work'),
            
            # Student 3 grades
            Grade(student_id=student3.id, course_id=course2.id, score=87, max_score=100, 
                  assignment_name='Essay Assignment', comments='Well written'),
            Grade(student_id=student3.id, course_id=course4.id, score=82, max_score=100, 
                  assignment_name='Final Project', comments='Good effort'),
        ]
        
        for grade in grades:
            db.session.add(grade)
        
        db.session.commit()
        
        print("\n" + "="*50)
        print("Database seeded successfully!")
        print("="*50)
        print("\nTest Credentials:")
        print("\nDirector:")
        print("  Username: director")
        print("  Password: director123")
        print("\nTeacher 1 (Sarah Johnson):")
        print("  Username: teacher1")
        print("  Password: teacher123")
        print("\nTeacher 2 (Michael Brown):")
        print("  Username: teacher2")
        print("  Password: teacher123")
        print("\nStudent 1 (Emily Davis):")
        print("  Username: student1")
        print("  Password: student123")
        print("\nStudent 2 (James Wilson):")
        print("  Username: student2")
        print("  Password: student123")
        print("\nStudent 3 (Olivia Martinez):")
        print("  Username: student3")
        print("  Password: student123")
        print("="*50)

if __name__ == '__main__':
    seed_database()
