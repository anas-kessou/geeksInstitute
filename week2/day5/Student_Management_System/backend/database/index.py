"""
Database connection configuration
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """Initialize database with Flask app"""
    db.init_app(app)
    return db

def get_db():
    """Get database instance"""
    return db
