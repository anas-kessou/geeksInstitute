from flask import Flask, jsonify, request
from flask_cors import CORS
from database import index as db
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'anaskessou'  
CORS(app, supports_credentials=True)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id, email):
        self.id = id
        self.email = email

@login_manager.user_loader
def load_user(user_id):
    user_data = db.get_one('student', user_id)
    if user_data:
        return User(id=user_data['id'], email=user_data['email'])
    return None

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    hashed_password = generate_password_hash(password)
    data['password'] = hashed_password

    try:
        new_student = db.create_student(data)
        return jsonify(new_student), 201
    except Exception as e:
        return jsonify({"message": "Registration failed", "error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user_data = db.get_one_by_email('student', email)

    if user_data and check_password_hash(user_data['password'], password):
        user = User(id=user_data['id'], email=user_data['email'])
        login_user(user)
        return jsonify({"message": "Login successful", "user": {"id": user.id, "email": user.email}})
    
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"})

@app.route("/@me")
@login_required
def get_current_user():
    return jsonify({"id": current_user.id, "email": current_user.email})

@app.route("/")
def home():
    return jsonify({"message": "API is running"})

# --- Students --- #
@app.route("/students", methods=["GET", "POST"])
def handle_students():
    if request.method == "POST":
        data = request.json
        new_student = db.create_student(data)
        return jsonify(new_student), 201
    else:
        students = db.get_all('student')
        return jsonify(students)

@app.route("/students/<int:id>", methods=["GET", "PUT", "DELETE"])
def handle_student(id):
    if request.method == "GET":
        student = db.get_one('student', id)
        if student is None:
            return jsonify({"message": "Student not found"}), 404
        return jsonify(student)
    elif request.method == "PUT":
        data = request.json
        updated_student = db.update_student(id, data)
        if updated_student is None:
            return jsonify({"message": "Student not found"}), 404
        return jsonify(updated_student)
    elif request.method == "DELETE":
        deleted_student = db.delete_student(id)
        if deleted_student is None:
            return jsonify({"message": "Student not found"}), 404
        return jsonify({"message": "Student deleted successfully"})

# --- Teachers --- #
@app.route("/teachers", methods=["GET", "POST"])
def handle_teachers():
    if request.method == "POST":
        data = request.json
        new_teacher = db.create_teacher(data)
        return jsonify(new_teacher), 201
    else:
        teachers = db.get_all('teacher')
        return jsonify(teachers)

@app.route("/teachers/<int:id>", methods=["GET", "PUT", "DELETE"])
def handle_teacher(id):
    if request.method == "GET":
        teacher = db.get_one('teacher', id)
        if teacher is None:
            return jsonify({"message": "Teacher not found"}), 404
        return jsonify(teacher)
    elif request.method == "PUT":
        data = request.json
        updated_teacher = db.update_teacher(id, data)
        if updated_teacher is None:
            return jsonify({"message": "Teacher not found"}), 404
        return jsonify(updated_teacher)
    elif request.method == "DELETE":
        deleted_teacher = db.delete_teacher(id)
        if deleted_teacher is None:
            return jsonify({"message": "Teacher not found"}), 404
        return jsonify({"message": "Teacher deleted successfully"})

# --- Courses --- #
@app.route("/courses", methods=["GET", "POST"])
def handle_courses():
    if request.method == "POST":
        data = request.json
        new_course = db.create_course(data)
        return jsonify(new_course), 201
    else:
        courses = db.get_all('course')
        return jsonify(courses)

@app.route("/courses/<int:id>", methods=["GET", "PUT", "DELETE"])
def handle_course(id):
    if request.method == "GET":
        course = db.get_one('course', id)
        if course is None:
            return jsonify({"message": "Course not found"}), 404
        return jsonify(course)
    elif request.method == "PUT":
        data = request.json
        updated_course = db.update_course(id, data)
        if updated_course is None:
            return jsonify({"message": "Course not found"}), 404
        return jsonify(updated_course)
    elif request.method == "DELETE":
        deleted_course = db.delete_course(id)
        if deleted_course is None:
            return jsonify({"message": "Course not found"}), 404
        return jsonify({"message": "Course deleted successfully"})

# --- Grades --- #
@app.route("/grades", methods=["GET", "POST"])
def handle_grades():
    if request.method == "POST":
        data = request.json
        new_grade = db.create_grade(data)
        return jsonify(new_grade), 201
    else:
        grades = db.get_all('grade')
        return jsonify(grades)

@app.route("/grades/<int:id>", methods=["GET", "PUT", "DELETE"])
def handle_grade(id):
    if request.method == "GET":
        grade = db.get_one('grade', id)
        if grade is None:
            return jsonify({"message": "Grade not found"}), 404
        return jsonify(grade)
    elif request.method == "PUT":
        data = request.json
        updated_grade = db.update_grade(id, data)
        if updated_grade is None:
            return jsonify({"message": "Grade not found"}), 404
        return jsonify(updated_grade)
    elif request.method == "DELETE":
        deleted_grade = db.delete_grade(id)
        if deleted_grade is None:
            return jsonify({"message": "Grade not found"}), 404
        return jsonify({"message": "Grade deleted successfully"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
