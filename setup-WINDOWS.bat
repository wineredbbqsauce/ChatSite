@echo off
echo ======================================
echo ChatSite Installation Script (Windows)
echo ======================================
echo.

REM ... (keep the admin check and Node.js check the same)

REM Create database and tables
echo.
echo Creating database and user...
mysql -u root -p1234 < "%~dp0setup-db.sql"
if %errorLevel% neq 0 (
    echo Failed to create database. Please check your MariaDB root password.
    pause
    exit /b 1
)
echo ✓ Database and user created

REM Create config.env file
echo.
echo Creating config\config.env file...
if not exist config mkdir config
(
echo DB_HOST=localhost
echo DB_USER=user
echo DB_PASSWORD=password
echo DB_NAME=chatsitedb
echo PORT=25565
echo NODE_ENV=development
) > config\config.env
echo ✓ Configuration file created

REM ... (rest of the script stays the same)

echo.
echo MariaDB Root Credentials (for admin tasks only):
echo   - User: root
echo   - Password: 1234
echo.
echo Application Database Credentials:
echo   - Host: localhost
echo   - User: user
echo   - Password: password
echo   - Database: chatsitedb
echo.
echo SECURITY NOTE: The 'user' account has limited privileges
echo and can only access the 'chatsitedb' database.
echo.