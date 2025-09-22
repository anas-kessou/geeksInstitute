
from flask import Flask, jsonify, request 


students = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 20,
        "gender": "male",
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 21,
        "gender": "female",
    },
    {
        "id": 3,
        "name": "Jim Doe",
        "email": "jim.doe@example.com",
        "age": 22,
        "gender": "male",
    },
    {
        "id": 4,
        "name": "Jill Doe",
        "email": "jill.doe@example.com",
        "age": 23,
        "gender": "female",
    },
    {
        "id": 5,
        "name": "Jack Doe",
        "email": "jack.doe@example.com",
        "age": 24,
        "gender": "male",
    }
]





app=Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return "Hello World"
@app.route('/students', methods=['GET'])
def get_students():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=5, type=int)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_students = students[start:end]
    return jsonify(students)

@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if student:
        return jsonify(student)
    return jsonify({"error": "Not found"}), 404

@app.route('/students', methods=['POST'])
def create_student():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    # si id fourni par le client → utiliser, sinon générer automatiquement
    if "id" in data:
        new_id = data["id"]
    else:
        new_id = max([s["id"] for s in students]) + 1 if students else 1

    # vérifier que l'id n'existe pas déjà
    if any(s["id"] == new_id for s in students):
        return jsonify({"error": "ID already exists"}), 400

    data["id"] = new_id
    students.append(data)
    return jsonify(data), 201


@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"error": "Not found"}), 404

    data = request.get_json()
    student.update(data)
    return jsonify(student)


@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"error": "Not found"}), 404

    students.remove(student)
    return jsonify(student)




if __name__ == '__main__':
    app.run(debug=True, port=7400)