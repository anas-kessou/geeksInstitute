import psycopg2
from menu_item import get_connection

class MenuManager:
    @classmethod
    def get_by_name(cls, item_name):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT item_name, item_price FROM menu_items WHERE item_name = %s", (item_name,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return {"name": row[0], "price": row[1]}
        return None

    @classmethod
    def all_items(cls):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT item_name, item_price FROM menu_items")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [{"name": r[0], "price": r[1]} for r in rows]
