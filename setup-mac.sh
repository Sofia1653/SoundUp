```bash
#!/bin/bash

# =========================================
# SoundUp - Setup Script for macOS/Linux
# =========================================

DB_NAME="soundup"
DB_USER="root"
DB_PASS="root"

# Colors
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
NC="\033[0m" # No Color

write_success() { echo -e "${GREEN}✅ $1${NC}"; }
write_error() { echo -e "${RED}❌ $1${NC}"; }
write_info() { echo -e "${YELLOW}ℹ️  $1${NC}"; }

echo -e "${CYAN}🎵 =========================================="
echo -e "   SoundUp - Setup Script for macOS/Linux"
echo -e "=========================================== 🎵${NC}"
echo ""

# ====================================
# 1. Check and install Homebrew
# ====================================
if ! command -v brew &>/dev/null; then
  write_info "Homebrew not found. Installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  write_success "Homebrew installed"
else
  write_success "Homebrew already installed"
fi
echo ""

# ====================================
# 2. Check and install MySQL
# ====================================
if ! command -v mysql &>/dev/null; then
  write_info "MySQL not found. Installing..."
  brew install mysql
  brew services start mysql
  write_success "MySQL installed"
else
  write_success "MySQL already installed"
  brew services start mysql
fi
echo ""

# ====================================
# 3. Check and install Java
# ====================================
if ! command -v java &>/dev/null; then
  write_info "Java not found. Installing OpenJDK 17..."
  brew install openjdk@17
  echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  write_success "Java installed"
else
  JAVA_VERSION=$(java -version 2>&1 | head -n 1)
  write_success "Java already installed ($JAVA_VERSION)"
fi
echo ""

# ====================================
# 4. Check and install Node.js
# ====================================
if ! command -v node &>/dev/null; then
  write_info "Node.js not found. Installing..."
  brew install node
  write_success "Node.js installed"
else
  NODE_VERSION=$(node -v)
  write_success "Node.js already installed ($NODE_VERSION)"
fi
echo ""

# ====================================
# 5. Check and install Maven
# ====================================
if ! command -v mvn &>/dev/null; then
  write_info "Maven not found. Installing..."
  brew install maven
  write_success "Maven installed"
else
  MAVEN_VERSION=$(mvn -v | head -n 1)
  write_success "Maven already installed ($MAVEN_VERSION)"
fi
echo ""

# ====================================
# 6. Start MySQL service
# ====================================
write_info "Starting MySQL service..."
brew services start mysql
sleep 3
write_success "MySQL service started"
echo ""

# ====================================
# 7. Wait for MySQL to be ready
# ====================================
write_info "Waiting for MySQL to be ready..."
MAX_ATTEMPTS=10
ATTEMPT=0
CONNECTED=false

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  mysql -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1" &>/dev/null
  if [ $? -eq 0 ]; then
    CONNECTED=true
    break
  else
    ATTEMPT=$((ATTEMPT+1))
    write_info "Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 2
  fi
done

if [ "$CONNECTED" = true ]; then
  write_success "MySQL is ready"
else
  write_error "Could not connect to MySQL. Please check your installation."
  exit 1
fi
echo ""

# ====================================
# 8. Create database
# ====================================
write_info "Creating database '$DB_NAME'..."
mysql -u"$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" &>/dev/null
if [ $? -eq 0 ]; then
  write_success "Database '$DB_NAME' created"
else
  write_error "Failed to create database"
  exit 1
fi
echo ""

# ====================================
# 9. Load database schema
# ====================================
SQL_FILE="init-db.sql"

if [ -f "$SQL_FILE" ]; then
  write_info "Found $SQL_FILE - Loading schema..."
  mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$SQL_FILE"
  if [ $? -eq 0 ]; then
    write_success "Database schema loaded from $SQL_FILE"
  else
    write_error "Error loading SQL file"
  fi
else
  write_error "SQL file not found: $SQL_FILE"
  write_info "Creating basic database structure as fallback..."

  FALLBACK_SQL=$(cat <<'EOF'
CREATE TABLE IF NOT EXISTS versao (
    id_versao INT AUTO_INCREMENT PRIMARY KEY,
    versao INT NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS musicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_versao INT NULL,
    nome VARCHAR(70) NOT NULL,
    duracao INT NOT NULL,
    CONSTRAINT fk_musica_versao FOREIGN KEY (id_versao) REFERENCES versao(id_versao) ON DELETE SET NULL,
    CHECK (duracao > 0)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(30) NOT NULL,
    CHECK(CHAR_LENGTH(senha) >= 6)
);

CREATE TABLE IF NOT EXISTS artistas (
    id_artista INT PRIMARY KEY,
    quant_ouvintes INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_artista_usuario FOREIGN KEY (id_artista) REFERENCES usuarios(id) ON DELETE CASCADE,
    CHECK(quant_ouvintes >= 0)
);
EOF
)

  echo "$FALLBACK_SQL" | mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME"
  if [ $? -eq 0 ]; then
    write_success "Basic database structure created"
    write_info "⚠️  For full schema with sample data, please add 'init-db.sql'"
  else
    write_error "Failed to create fallback schema"
  fi
fi
echo ""

# ====================================
# 10. Verify installation
# ====================================
write_info "Verifying installation..."
mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "SHOW TABLES;"
echo ""

# ====================================
# 11. Install Frontend Dependencies
# ====================================
if [ -d "frontend/soundup" ]; then
  write_info "Found frontend directory, installing npm packages..."
  pushd frontend/soundup >/dev/null
  npm install
  npm install @mui/material @emotion/react @emotion/styled
  npm install react-router-dom
  npm install axios
  npm install chart.js react-chartjs-2
  popd >/dev/null
  write_success "All frontend dependencies installed"
else
  write_info "Frontend directory not found at 'frontend/soundup'"
  write_info "Skipping frontend dependency installation"
fi
echo ""

# ====================================
# Summary
# ====================================
echo -e "${GREEN}🎉 =========================================="
echo -e "   Setup Complete!"
echo -e "=========================================== 🎉${NC}"
echo ""
echo -e "${CYAN}Database Information:${NC}"
echo "  • Database: $DB_NAME"
echo "  • User: $DB_USER"
echo "  • Password: $DB_PASS"
echo "  • Host: localhost"
echo "  • Port: 3306"
echo ""
echo -e "${CYAN}Installed Frontend Packages:${NC}"
echo "  • Material-UI (@mui/material)"
echo "  • React Router (react-router-dom)"
echo "  • Axios (axios)"
echo "  • Chart.js (chart.js, react-chartjs-2)"
echo ""
echo -e "${CYAN}Next Steps:${NC}"
echo "  1. cd backend"
echo "  2. ./mvnw spring-boot:run"
echo "  3. cd frontend/soundup"
echo "  4. npm start"
echo ""
write_info "Place your SQL file as 'init-db.sql' in the root directory"
write_info "The script will automatically load it on next run!"
write_success "SoundUp is ready to use! 🎵"
echo ""
```