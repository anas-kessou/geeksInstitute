# Quick Start Guide

## Prerequisites
- PostgreSQL installed and running
- Python 3.8+ installed
- Database `School_Management_System` created

## Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Create Database
```bash
psql -U postgres -c 'CREATE DATABASE "School_Management_System";'
```

### 3. Test Connection
```bash
python test_db_connection.py
```

### 4. Seed Database
```bash
python seed.py
```

### 5. Start Server
```bash
python index.py
```

## Access

- **Dashboard:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health
- **API Base:** http://localhost:5000/api/

## Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"director","password":"director123"}'
```

## Test Credentials

| Username | Password | Role |
|----------|----------|------|
| director | director123 | Director |
| teacher1 | teacher123 | Teacher |
| student1 | student123 | Student |

## Common Commands

```bash
# Test database connection
python test_db_connection.py

# Seed database
python seed.py

# Start server
python index.py

# Reset database
python
>>> from index import create_app
>>> from database.index import db
>>> app = create_app()
>>> with app.app_context():
...     db.drop_all()
...     db.create_all()
>>> exit()
```

## Troubleshooting

### Database connection failed?
```bash
sudo systemctl start postgresql
psql -U postgres -c 'CREATE DATABASE "School_Management_System";'
```

### Port 5000 in use?
Edit `index.py`, change port to 5001

### Module not found?
```bash
pip install -r requirements.txt
```

## Documentation

- **Full Setup:** `SETUP_INSTRUCTIONS.md`
- **API Docs:** `README.md`
- **Summary:** `RESTRUCTURE_SUMMARY.md`

## Database Configuration

```
Host: localhost
Port: 5432
Database: School_Management_System
Username: postgres
Password: vji47cf8
```

Configured in `config.py` and matches `.vscode/settings.json`
