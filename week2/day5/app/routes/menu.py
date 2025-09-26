from flask import Blueprint , jsonify , request , url_for , redirect
import psycopg2


menu_bp = Blueprint("menu", __name__)

DataBase = {
    "dbname": "my_dataBase",
    "user": "postgres",
    "password": "*********",
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    return psycopg2.connect(DataBase)




@menu_bp.route("/")
def get_menu():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Menu_Items ORDER BY item_id;")
    items = cur.fetchall()
    cur.close()
    conn.close()
    result = [{"id": i[0], "name": i[1], "price": i[2]} for i in items]
    return jsonify(result)

@menu_bp.route("/<int:item_id>")
def get_item(item_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Menu_Items WHERE item_id = %s" , (item_id,))
    item = cur.fetchone()
    cur.close()
    conn.close()
    if item:
        return jsonify({"id": item[0], "name": item[1], "price": item[2]})
    return jsonify({"error": "Item not found"})


@menu_bp.route("/add" , methods=["POST" , "GET"])
def add_item():
    if request.method == "POST":
        item_name = request.form["item_name"]
        item_price = request.form["item_price"]
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO Menu_Items (item_name , item_price) VALUES (%s , %s)" , (item_name , item_price))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for("menu.get_menu"))
    return f"Item '{name}' added successfully!"


@menu_bp.route("/delete/<int:item_id>")
def delete_item(item_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM Menu_Items WHERE item_id = %s" , (item_id,))
    conn.commit()
    cur.close()
    conn.close()
    return f"Item with ID {item_id} deleted successfully!"
    

@menu_bp.route("/update/>int:item_id>" , methods=["POST" , "GET"])
def update_item(item_id):
    if request.method == "POST":
        item_name = request.form["item_name"]
        item_price = request.form["item_price"]
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("UPDATE Menu_Items SET item_name = %s , item_price = %s WHERE item_id = %s" , (item_name , item_price , item_id))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for("menu.get_menu"))
    return f"Item '{name}' updated successfully!"




