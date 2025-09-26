from flask import Flask
from routes.menu import menu_bp

app = Flask(__name__)

# Register Blueprint
app.register_blueprint(menu_bp,url_prefix="/menu")

if __name__ == "__main__":
    app.run(debug=True )
