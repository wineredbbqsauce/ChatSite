-- Create database
CREATE DATABASE IF NOT EXISTS chatsitedb;

-- Create user
CREATE USER IF NOT EXISTS "user"@"localhost" IDENTIFIED BY "password";
GRANT ALL PRIVILEGES ON chatsitedb.* TO "user"@"localhost";
FLUSH PRIVILEGES;

-- Use the database
USE chatsitedb

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    if INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test user (optional)
-- Password is "test123" hashed with bcrypt
-- INSERT INTO users (name, username, password) VALUES
-- ('Test User', 'testuser', '$2a$10$YourHashedPasswordHere');
