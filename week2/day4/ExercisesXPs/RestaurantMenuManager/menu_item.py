import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="Restaurant_Menu_Manager",
        user="postgres",
        password="*******",
        host="localhost",
        port="5432"
    )
    

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price =price
    
    def save(self):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s)",
            (self.name, self.price)
        )
        conn.commit()
        cur.close()
        conn.close()
    
    def delete(self):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "DELETE FROM menu_items WHERE item_name = %s",
            (self.name,)
        )
        conn.commit()
        cur.close()
        conn.close()
    
    def update(self, new_name, new_price):
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE menu_items SET item_name = %s, item_price = %s WHERE item_name = %s",
            (new_name, new_price, self.name)
        )
        conn.commit()
        cur.close()
        conn.close()
        self.name = new_name
        self.price = new_price
    