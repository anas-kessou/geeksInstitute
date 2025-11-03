# Quick Setup Guide

Follow these steps to get the Student Management System running on your local machine.

## Step 1: Install Prerequisites

### Install PostgreSQL
**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

### Install Python 3.8+
Check if Python is installed:
```bash
python --version
# or
python3 --version
```

If not installed, download from [python.org](https://www.python.org/downloads/)

### Install Node.js 16+
Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

## Step 2: Setup Database

1. **Access PostgreSQL:**
```bash
sudo -u postgres psql
# or on Windows: psql -U postgres
```

2. **Create database:**
```sql
CREATE DATABASE sms_db;
\q
```

## Step 3: Backend Setup

1. **Navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# Activate on Linux/Mac:
source venv/bin/activate

# Activate on Windows:
venv\Scripts\activate
```

3. **Install Python packages:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` file:
```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/sms_db
JWT_SECRET_KEY=change-this-to-a-random-secret-key
FLASK_ENV=development
```

5. **Seed the database:**
```bash
python seed.py
```

You should see output with test credentials.

6. **Start the backend server:**
```bash
python app.py
```

Backend should now be running on `http://localhost:5000`

## Step 4: Frontend Setup

**Open a new terminal window/tab**

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Install Node packages:**
```bash
npm install
```

This may take a few minutes.

3. **Configure environment:**
```bash
cp .env.example .env
```

The default `.env` should work:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the frontend server:**
```bash
npm start
```

Frontend should automatically open at `http://localhost:3000`

## Step 5: Test the Application

### Login with Test Accounts

**Director (Full Access):**
- Username: `director`
- Password: `director123`

**Teacher:**
- Username: `teacher1`
- Password: `teacher123`

**Student:**
- Username: `student1`
- Password: `student123`

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
# or change port in app.py
```

**Database connection error:**
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `.env`
- Ensure database `sms_db` exists

**Module not found errors:**
```bash
pip install -r requirements.txt --upgrade
```

### Frontend Issues

**Port 3000 already in use:**
- The app will ask if you want to use another port (usually 3001)
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

**npm install fails:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**API connection errors:**
- Ensure backend is running on port 5000
- Check `.env` has correct `REACT_APP_API_URL`
- Check browser console for CORS errors

### Database Issues

**Reset database:**
```bash
# In backend directory with venv activated
python seed.py
```

This will clear and re-seed all data.

## Next Steps

1. **Explore Director Dashboard:**
   - Create new users
   - Manage courses
   - View all grades

2. **Test Teacher Features:**
   - Create courses
   - Add grades for students

3. **Check Student View:**
   - View enrolled courses
   - Check grades and averages

## Production Deployment

For production deployment:

1. **Change JWT secret key** to a strong random value
2. **Use production database** (not localhost)
3. **Enable HTTPS**
4. **Set FLASK_ENV=production**
5. **Build React app:** `npm run build`
6. **Use production server** (gunicorn, nginx)
7. **Set up proper logging**
8. **Configure database backups**

## Support

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all prerequisites are installed
3. Ensure ports 5000 and 3000 are available
4. Check database connection settings

## Architecture Overview

```
┌─────────────────┐
│   React App     │  Port 3000
│  (Frontend)     │
└────────┬────────┘
         │ HTTP/HTTPS
         │ (Axios)
         ▼
┌─────────────────┐
│   Flask API     │  Port 5000
│   (Backend)     │
└────────┬────────┘
         │ SQLAlchemy
         ▼
┌─────────────────┐
│  PostgreSQL DB  │  Port 5432
│   (Database)    │
└─────────────────┘
```

## Key Features Checklist

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Role-Based Access Control
- ✅ Director: Full CRUD operations
- ✅ Teacher: Course & grade management
- ✅ Student: Read-only access
- ✅ Responsive UI with TailwindCSS
- ✅ Protected routes
- ✅ Role-based redirection
- ✅ Seeded test data

Enjoy using the Student Management System! 🎓
