#!/bin/bash

echo "======================================"
echo "ChatSite Installation Script"
echo "======================================"
echo ""

# Colors for output
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Colour

# Check if running as root for MariaDB installation
if [[ $EUID -ne 0 ]]; then
    echo -e "${RED}This script needs sudo privileges to install MariaDB${NC}"
    echo "Please run with: sudo ./setup-LINUX-MAC.sh"
    exit 1
fi

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Detected: Linux"
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Detected: macOS"
    OS="mac"
else
    echo -e "${RED}Unsupported OS${NC}"
    exit 1
fi

# Install Node.js and npm if not present
echo ""
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    if [ "$OS" == "linux" ]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    elif [ "$OS" == "mac" ]; then
        if ! command -v brew &> /dev/null; then
            echo "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install node
    fi
else
    echo -e "${GREEN}✓ Node.js already installed: $(node -v)${NC}"
fi

# Install MariaDB
echo ""
echo "Installing MariaDB..."
if [ "$OS" == "linux" ]; then
    apt-get update
    apt-get install -y mariadb-server mariadb-client
    systemctl start mariadb
    systemctl enable mariadb
elif [ "$OS" == "mac" ]; then
    brew install mariadb
    brew services start mariadb
fi

echo -e "${GREEN}✓ MariaDB installed${NC}"

# Secure MariaDB installation and set root password
echo ""
echo "Setting up MariaDB root password..."
mysql -u root <<-EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '1234';
FLUSH PRIVILEGES;
EOF

# Create database and application user
echo ""
echo "Creating database and application user..."
mysql -u root -p1234 <<-EOF
-- Create database
CREATE DATABASE IF NOT EXISTS chatsitedb;

-- Create application user 'user' with password 'password'
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges ONLY on chatsitedb (not all databases)
GRANT SELECT, INSERT, UPDATE, DELETE ON chatsitedb.* TO 'user'@'localhost';

-- Do NOT grant root-level privileges
FLUSH PRIVILEGES;

-- Switch to the database
USE chatsitedb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

EOF

echo -e "${GREEN}✓ Database 'chatsitedb' and user 'user' created${NC}"

# Create config.env file
echo ""
echo "Creating config/config.env file..."
mkdir -p config
cat > config/config.env <<-EOF
HOST=0.0.0.0
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=chatsitedb
PORT=25565
NODE_ENV=development
EOF

echo -e "${GREEN}✓ Configuration file created${NC}"

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install react-scripts@5.0.1 --save
npm install
cd ..

# Build frontend
echo ""
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Install bcrypt
echo ""
echo "Installing bcrypt..."
npm install bcrypt

echo ""
echo "======================================"
echo -e "${GREEN}Installation Complete!${NC}"
echo "======================================"
echo ""
echo "MariaDB Root Credentials (for admin tasks only):"
echo "  - User: root"
echo "  - Password: 1234"
echo ""
echo "Application Database Credentials:"
echo "  - Host: localhost"
echo "  - User: user"
echo "  - Password: password"
echo "  - Database: chatsitedb"
echo ""
echo "SECURITY NOTE: The 'user' account has limited privileges"
echo "and can only access the 'chatsitedb' database."
echo ""
echo "To start the server, run:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Then visit: http://localhost:25565"
echo ""