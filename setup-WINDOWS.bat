@echo off
echo ======================================
echo ChatSite Installation Script (Windows)
echo ======================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo This script needs to run as Admin
    echo Right-Click setup-WINDOWS.bat and select "Run As Administrator"
    pause
    exit /b 1
)

REM Check if Node.js is installed
echo Checking Node.js installation...
node -v >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js not found. please install Node.js from https://nodejs.org/¨
    echo After installing, run this script again.
    pause
    exit /b 1
) else (
    echo ✓ Node.js is installed
)

REM Check if MariaDB is installed
echo .
echo Checking MariaDB installation...
where mysql >nul 2>&1
if %errorLevel% neq 0 (
    echo MariaDB not found.
    echo Please download and install MariaDB from:
    echo https://mariadb.org/download
    echo.
    echo During installation:
    echo    1. Set root password to: 1234
    echo    2. Enable "Use UTF8 as default server character set"
    echo    3. Install as Windows Service
    echo.
    echo After Insalling MariaDB, run this script again.
    pause
    exit /b 1
) else (
    echo ✓ MariaDB is installed
)

REM Create Database and Tables
echo.
echo Creating Database and Tables...
mysql -u root -p1234 < "%~dp0setup-db.sql"
if %errorLevel% neq 0 (
    echo Failed to create database. Please check your MariaDB root password.
    pause
    exit /b 1
)
echo ✓ Database created

REM Create config.env file
echo.
echo Creating config\config.env file...
if not exist config mkdir config
(
    echo DB_HOST=localhost
    echo DB_USER=user
    echo DB_PASSWORD=1234
    echo DB_NAME=chatsitedb
    echo PORT=25565
    echo NODE_ENV=development
) > config\config.env
echo ✓ Configuration file created

REM Install backend dependencies
echo.
echo Installing backend dependencies...
cd backend
call npm install
if %errorLevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd frontend
call npm install react-scripts@5.0.1 --save
call npm install
if %errorLevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

REM Build frontend
echo.
echo Building frontend...
cd frontend
call npm run Build
if %errorLevel% neq 0 (
    echo Failed to build frontend
    pause
    exit /b 1
)
cd ..

echo.
echo ======================================
echo Installation Complete!
echo ======================================
echo .
echo Database Credentials:
echo    - Host: localhost
echo    - User: user
echo    - Password: 1234
echo    - Database: chatsitedb
echo.
echo To Start the server, run:
echo    cd backend
echo    npm start
echo.
echo Then visit: http://localhost:25565
echo.
pause