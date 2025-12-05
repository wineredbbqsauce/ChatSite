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
if [[ $EUID -ne 0]]; then
    echo -e "${RED}This script needs sudo privileges to install MariaDB${NC}"
    echo "Please run with sudo ./setup.sh"
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
    echo -e "${RED}Unsupported OS"
    exit 1
fi

# Install Node.js and npm if not present
echo ""
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    if [ "OS" == linux ]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash - apt-get install -y nodejs
    elif [ "OS" == "mac" ]; then
        if ! command -v brew &> /dev/null; then
            echo "Installing Homebrew..."
            /bin/bash -c "${curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh}"
        fi
else
    echo -e "${GREEN}✓ Node.js already installed: ${node -v}${NC}"
fi

# Install MariaDB

echo ""
echo "Installing MariaDB..."
if [ "OS" == "linux" ]; then
    apt-get update
    apt-get install -y mariadb-server mariadb-client
    systemctl start mariadb
    systemctl enable mariadb
elif [ "OS" == "mac" ]; then
    brew install mariadb
    brew services start mariadb
fi

echo -e "${GREEN}✓ MariaDB installed${NC}"

# Secure MariaDB installation and set root password
echo ""
echo "Setting up MariaDB root password..."
mysql -u root <<-EOF
ALTER USER "root"@"localhost" IDENTIFIED BY "1234";
FLUSH PRIVILEGES;
EOF

# Create database and user
echo ""
echo "Creating database and user..."
mysql -u root -p1234 <<-EOF
CREATE DATABASE IF NOT EXISTS chatsiteadb;
CREATE USER IF NOT EXISTS "user"@"localhost" IDENTIFIED BY "1234";
GRANT ALL PRIVILEGES ON chatsitedb.* TO "user"@"localhost";
FLUSH PRIVILEGES;

USE chatsitedb:

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

EOF

echo -e "${GREEN}✓ Database 'chatsitedb' created${NC}"

# Create config.env file

echo ""
echo "Create config/config.env file..."
mkdir -p config
cat > config/config.env <<-EOF
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=1234
DB_NAME=chatsitedb
PORT=25565
NODE_ENV=development
EOF

echo -e "${GREEN}✓ Configuration file created ${NC}"

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

echo ""
echo "======================================"
echo ""
echo "Database Credentials:"
echo " - Host: localhost"
echo " - User: user"
echo " - Password: 1234"
echo " - Database: chatsitedb"
echo ""
echo "To start the server, run:"
echo "cd backend"
echo "npm start"
echo ""
echo "Then visit: http// localhost:25565"
echo ""