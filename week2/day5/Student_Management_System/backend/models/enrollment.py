"""
Enrollment model
"""
from database.index import db
from datetime import datetime

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (db.UniqueConstraint('student_id', 'course_id', name='unique_student_course'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'course_id': self.course_id,
            'student_name': f"{self.student.first_name} {self.student.last_name}" if self.student else None,
            'course_name': self.course.name if self.course else None,
            'enrolled_at': self.enrolled_at.isoformat() if self.enrolled_at else None
        }
