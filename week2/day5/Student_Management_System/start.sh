#!/bin/bash

# Student Management System - Quick Start Script
# This script sets up and runs both backend and frontend

echo "=========================================="
echo "Student Management System - Quick Start"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo -e "${RED}Error: uv is not installed${NC}"
    echo "Please install uv: curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 16 or higher"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}Error: PostgreSQL is not installed${NC}"
    echo "Please install PostgreSQL"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites found${NC}"
echo ""

# Setup Backend
echo "=========================================="
echo "Setting up Backend..."
echo "=========================================="

cd backend

# Install dependencies with uv
echo "Installing Python dependencies with uv..."
uv pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Warning: .env file not found${NC}"
    echo "Copying .env.example to .env..."
    cp .env.example .env
    echo -e "${YELLOW}Please edit backend/.env with your database credentials${NC}"
fi

# Check if database is seeded
echo ""
read -p "Do you want to seed the database with test data? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Seeding database..."
    uv run seed.py
fi

echo ""
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Setup Frontend
echo "=========================================="
echo "Setting up Frontend..."
echo "=========================================="

cd ../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "Node modules already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
fi

echo ""
echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Start servers
echo "=========================================="
echo "Starting Servers..."
echo "=========================================="
echo ""

# Start backend in background
cd ../backend
echo "Starting Flask backend on http://localhost:5000..."
uv run app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
cd ../frontend
echo "Starting React frontend on http://localhost:3000..."
echo ""
echo -e "${GREEN}=========================================="
echo "Application is starting!"
echo "==========================================${NC}"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Test Credentials:"
echo "  Director: director / director123"
echo "  Teacher:  teacher1 / teacher123"
echo "  Student:  student1 / student123"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Start frontend (this will block)
npm run dev

# Cleanup: Kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null
