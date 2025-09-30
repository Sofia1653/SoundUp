#!/bin/bash

# SoundUp - macOS/Linux Setup Script
# This script will install dependencies and set up the database

set -e  # Exit on any error

echo "🎵 =========================================="
echo "   SoundUp - Setup Script for macOS/Linux"
echo "========================================== 🎵"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database configuration
DB_NAME="soundup"
DB_USER="root"
DB_PASS="root"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if running on macOS or Linux
OS_TYPE=$(uname -s)
print_info "Detected OS: $OS_TYPE"
echo ""

# 1. Check and install Homebrew (macOS only)
if [[ "$OS_TYPE" == "Darwin" ]]; then
    echo "📦 Checking Homebrew..."
    if ! command -v brew &> /dev/null; then
        print_info "Homebrew not found. Installing..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        print_success "Homebrew installed"
    else
        print_success "Homebrew already installed"
    fi
    echo ""
fi

# 2. Check and install MySQL
echo "🗄️  Checking MySQL..."
if ! command -v mysql &> /dev/null; then
    print_info "MySQL not found. Installing..."

    if [[ "$OS_TYPE" == "Darwin" ]]; then
        brew install mysql
    elif [[ "$OS_TYPE" == "Linux" ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y mysql-server mysql-client
        elif command -v yum &> /dev/null; then
            sudo yum install -y mysql-server mysql
        else
            print_error "Unsupported Linux distribution. Please install MySQL manually."
            exit 1
        fi
    fi
    print_success "MySQL installed"
else
    print_success "MySQL already installed"
fi
echo ""

# 3. Check and install Java
echo "☕ Checking Java..."
if ! command -v java &> /dev/null; then
    print_info "Java not found. Installing OpenJDK 17..."

    if [[ "$OS_TYPE" == "Darwin" ]]; then
        brew install openjdk@17
        echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
    elif [[ "$OS_TYPE" == "Linux" ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get install -y openjdk-17-jdk
        elif command -v yum &> /dev/null; then
            sudo yum install -y java-17-openjdk java-17-openjdk-devel
        fi
    fi
    print_success "Java installed"
else
    print_success "Java already installed ($(java -version 2>&1 | head -n 1))"
fi
echo ""

# 4. Check and install Node.js
echo "📗 Checking Node.js..."
if ! command -v node &> /dev/null; then
    print_info "Node.js not found. Installing..."

    if [[ "$OS_TYPE" == "Darwin" ]]; then
        brew install node
    elif [[ "$OS_TYPE" == "Linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    print_success "Node.js installed"
else
    print_success "Node.js already installed ($(node -v))"
fi
echo ""

# 5. Check and install Maven
echo "🔨 Checking Maven..."
if ! command -v mvn &> /dev/null; then
    print_info "Maven not found. Installing..."

    if [[ "$OS_TYPE" == "Darwin" ]]; then
        brew install maven
    elif [[ "$OS_TYPE" == "Linux" ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get install -y maven
        elif command -v yum &> /dev/null; then
            sudo yum install -y maven
        fi
    fi
    print_success "Maven installed"
else
    print_success "Maven already installed ($(mvn -v | head -n 1))"
fi
echo ""

# 6. Start MySQL service
echo "🚀 Starting MySQL service..."
if [[ "$OS_TYPE" == "Darwin" ]]; then
    brew services start mysql
elif [[ "$OS_TYPE" == "Linux" ]]; then
    sudo systemctl start mysql || sudo service mysql start
fi
print_success "MySQL service started"
echo ""

# 7. Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 5

# Test MySQL connection
until mysql -u $DB_USER -p$DB_PASS -e "SELECT 1" &> /dev/null; do
    print_info "Waiting for MySQL to accept connections..."
    sleep 2
done
print_success "MySQL is ready"
echo ""

# 8. Create database
echo "🗄️  Setting up database '$DB_NAME'..."
mysql -u $DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null || {
    # If password fails, try without password
    print_info "Trying to connect without password..."
    mysql -u $DB_USER -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
    DB_PASS=""
}
print_success "Database '$DB_NAME' created"
echo ""

# 9. Create tables and insert data
echo "📋 Creating tables and inserting sample data..."
mysql -u $DB_USER ${DB_PASS:+-p$DB_PASS} $DB_NAME <<'SQLEOF'
-- Create usuarios table
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create versao table
CREATE TABLE IF NOT EXISTS versao (
    id_versao INT AUTO_INCREMENT PRIMARY KEY,
    versao INT NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

-- Create artistas table
CREATE TABLE IF NOT EXISTS artistas (
    id_artista INT PRIMARY KEY,
    quant_ouvintes INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_artista_usuario FOREIGN KEY (id_artista) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK(quant_ouvintes >= 0)
);

-- Create musicas table
CREATE TABLE IF NOT EXISTS musicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_versao INT,
    nome VARCHAR(70) NOT NULL,
    duracao INT NOT NULL,
    id_artista INT,
    arquivo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_musica_versao FOREIGN KEY (id_versao) REFERENCES versao(id_versao)
        ON DELETE SET NULL,
    CONSTRAINT fk_musica_artista FOREIGN KEY (id_artista) REFERENCES artistas(id_artista)
        ON DELETE CASCADE,
    CHECK (duracao > 0)
);

-- Modify musicas table to allow NULL for id_versao
ALTER TABLE musicas MODIFY id_versao INT NULL;

-- Insert sample data
INSERT IGNORE INTO usuarios (id, nome, email, senha) VALUES
    (1, 'Admin User', 'admin@soundup.com', 'admin123'),
    (2, 'Test Artist', 'artist@soundup.com', 'artist123'),
    (3, 'Music Lover', 'user@soundup.com', 'user123');

INSERT IGNORE INTO artistas (id_artista, quant_ouvintes) VALUES
    (2, 1500),
    (1, 500);

INSERT IGNORE INTO versao (versao, descricao) VALUES
    (1, 'Original Version'),
    (2, 'Remix Version'),
    (3, 'Acoustic Version'),
    (4, 'Live Version');

INSERT IGNORE INTO musicas (nome, duracao, id_artista, id_versao) VALUES
    ('Summer Vibes', 180, 2, 1),
    ('Night Drive', 240, 2, 1),
    ('Acoustic Dreams', 200, 1, 3);
SQLEOF

print_success "Database schema created and data inserted"
echo ""

# 10. Verify installation
echo "🔍 Verifying installation..."
mysql -u $DB_USER ${DB_PASS:+-p$DB_PASS} $DB_NAME -e "SHOW TABLES;"
echo ""

# Summary
echo ""
echo "🎉 =========================================="
echo "   Setup Complete!"
echo "========================================== 🎉"
echo ""
echo "Database Information:"
echo "  • Database: $DB_NAME"
echo "  • User: $DB_USER"
echo "  • Password: $DB_PASS"
echo "  • Host: localhost"
echo "  • Port: 3306"
echo ""
echo "Next Steps:"
echo "  1. Navigate to backend folder: cd backend"
echo "  2. Run Spring Boot: ./mvnw spring-boot:run"
echo "  3. Navigate to frontend: cd frontend/soundup"
echo "  4. Install dependencies: npm install"
echo "  5. Start React app: npm start"
echo ""
print_success "SoundUp is ready to use! 🎵"