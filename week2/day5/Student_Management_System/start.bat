@echo off
REM Student Management System - Quick Start Script for Windows

echo ==========================================
echo Student Management System - Quick Start
echo ==========================================
echo.

REM Check if uv is installed
uv --version >nul 2>&1
if errorlevel 1 (
    echo Error: uv is not installed
    echo Please install uv: https://docs.astral.sh/uv/getting-started/installation/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed
    echo Please install Node.js 16 or higher
    pause
    exit /b 1
)

echo [OK] All prerequisites found
echo.

REM Setup Backend
echo ==========================================
echo Setting up Backend...
echo ==========================================

cd backend

REM Install dependencies with uv
echo Installing Python dependencies with uv...
uv pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo Warning: .env file not found
    echo Copying .env.example to .env...
    copy .env.example .env
    echo Please edit backend\.env with your database credentials
)

REM Ask about seeding
echo.
set /p SEED="Do you want to seed the database with test data? (y/n): "
if /i "%SEED%"=="y" (
    echo Seeding database...
    uv run seed.py
)

echo.
echo [OK] Backend setup complete
echo.

REM Setup Frontend
echo ==========================================
echo Setting up Frontend...
echo ==========================================

cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
) else (
    echo Node modules already installed
)

REM Check if .env exists
if not exist ".env" (
    echo Copying .env.example to .env...
    copy .env.example .env
)

echo.
echo [OK] Frontend setup complete
echo.

REM Start servers
echo ==========================================
echo Starting Servers...
echo ==========================================
echo.

REM Start backend in new window
cd ..\backend
start "SMS Backend" cmd /k "uv run app.py"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
cd ..\frontend
echo Starting React frontend...
echo.
echo ==========================================
echo Application is starting!
echo ==========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Test Credentials:
echo   Director: director / director123
echo   Teacher:  teacher1 / teacher123
echo   Student:  student1 / student123
echo.
echo Close both windows to stop the servers
echo.

call npm run dev
