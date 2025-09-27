import psycopg2
from psycopg2.extras import RealDictCursor
import contextlib

# Database connection details
DB_CONFIG = {
    "dbname": "School_Management_System",
    "user": "postgres",
    "password": "vji47cf8",
    "host": "localhost",
    "port": "5432"
}

@contextlib.contextmanager
def get_db_connection():
    """Manages a database connection for a single operation."""
    conn = psycopg2.connect(**DB_CONFIG)
    try:
        yield conn
    finally:
        conn.close()

def get_all(table_name):
    """Fetches all records from a given table."""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"SELECT * FROM {table_name} ORDER BY id ASC")
            return cur.fetchall()

def get_one(table_name, id):
    """Fetches a single record by ID."""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"SELECT * FROM {table_name} WHERE id = %s", (id,))
            return cur.fetchone()

def get_one_by_email(table_name, email):
    """Fetches a single record by email."""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"SELECT * FROM {table_name} WHERE email = %s", (email,))
            return cur.fetchone()

# --- Student Functions --- #
def create_student(data):
    """Creates a new student record."""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'INSERT INTO student (name, email, phone, grade, "dateOfBirth", address) VALUES (%(name)s, %(email)s, %(phone)s, %(grade)s, %(dateOfBirth)s, %(address)s) RETURNING *',
                data
            )
            new_student = cur.fetchone()
            conn.commit()
            return new_student

def update_student(id, data):
    """Updates an existing student record."""
    data['id'] = id
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'UPDATE student SET name=%(name)s, email=%(email)s, phone=%(phone)s, grade=%(grade)s, "dateOfBirth"=%(dateOfBirth)s, address=%(address)s WHERE id=%(id)s RETURNING *',
                data
            )
            updated_student = cur.fetchone()
            conn.commit()
            return updated_student

def delete_student(id):
    """Deletes a student record."""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("DELETE FROM student WHERE id = %s RETURNING *", (id,))
            deleted_student = cur.fetchone()
            conn.commit()
            return deleted_student

# --- Teacher Functions --- #
def create_teacher(data):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'INSERT INTO teacher (name, email, phone, subject, experience, department) VALUES (%(name)s, %(email)s, %(phone)s, %(subject)s, %(experience)s, %(department)s) RETURNING *',
                data
            )
            new_teacher = cur.fetchone()
            conn.commit()
            return new_teacher

def update_teacher(id, data):
    data['id'] = id
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'UPDATE teacher SET name=%(name)s, email=%(email)s, phone=%(phone)s, subject=%(subject)s, experience=%(experience)s, department=%(department)s WHERE id=%(id)s RETURNING *',
                data
            )
            updated_teacher = cur.fetchone()
            conn.commit()
            return updated_teacher

def delete_teacher(id):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("DELETE FROM teacher WHERE id = %s RETURNING *", (id,))
            deleted_teacher = cur.fetchone()
            conn.commit()
            return deleted_teacher

# --- Course Functions --- #
def create_course(data):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'INSERT INTO course (title, code, teacher, students, schedule, description) VALUES (%(title)s, %(code)s, %(teacher)s, %(students)s, %(schedule)s, %(description)s) RETURNING *',
                data
            )
            new_course = cur.fetchone()
            conn.commit()
            return new_course

def update_course(id, data):
    data['id'] = id
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'UPDATE course SET title=%(title)s, code=%(code)s, teacher=%(teacher)s, students=%(students)s, schedule=%(schedule)s, description=%(description)s WHERE id=%(id)s RETURNING *',
                data
            )
            updated_course = cur.fetchone()
            conn.commit()
            return updated_course

def delete_course(id):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("DELETE FROM course WHERE id = %s RETURNING *", (id,))
            deleted_course = cur.fetchone()
            conn.commit()
            return deleted_course

# --- Grade Functions --- #
def create_grade(data):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'INSERT INTO grade (student, course, grade, score, date, type) VALUES (%(student)s, %(course)s, %(grade)s, %(score)s, %(date)s, %(type)s) RETURNING *',
                data
            )
            new_grade = cur.fetchone()
            conn.commit()
            return new_grade

def update_grade(id, data):
    data['id'] = id
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'UPDATE grade SET student=%(student)s, course=%(course)s, grade=%(grade)s, score=%(score)s, date=%(date)s, type=%(type)s WHERE id=%(id)s RETURNING *',
                data
            )
            updated_grade = cur.fetchone()
            conn.commit()
            return updated_grade

def delete_grade(id):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("DELETE FROM grade WHERE id = %s RETURNING *", (id,))
            deleted_grade = cur.fetchone()
            conn.commit()
            return deleted_grade
