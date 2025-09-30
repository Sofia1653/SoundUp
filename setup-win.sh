# SoundUp - Windows PowerShell Setup Script
# Run this script as Administrator

# Colors for output
function Write-Success { Write-Host "✅ $args" -ForegroundColor Green }
function Write-Error-Custom { Write-Host "❌ $args" -ForegroundColor Red }
function Write-Info { Write-Host "ℹ️  $args" -ForegroundColor Yellow }

Write-Host "🎵 ==========================================" -ForegroundColor Cyan
Write-Host "   SoundUp - Setup Script for Windows" -ForegroundColor Cyan
Write-Host "=========================================== 🎵" -ForegroundColor Cyan
Write-Host ""

# ====================================
# Database configuration
# ====================================
$DB_NAME = "soundup"
$DB_USER = "root"
$DB_PASS = "root"

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Error-Custom "This script must be run as Administrator!"
    Write-Info "Right-click on PowerShell and select 'Run as Administrator'"
    pause
    exit
}

# 1. Check and install Chocolatey
Write-Host "📦 Checking Chocolatey package manager..." -ForegroundColor White
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Info "Chocolatey not found. Installing..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-Success "Chocolatey installed"

    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
} else {
    Write-Success "Chocolatey already installed"
}
Write-Host ""

# 2. Check and install MySQL
Write-Host "🗄️  Checking MySQL..." -ForegroundColor White
if (-not (Get-Command mysql.exe -ErrorAction SilentlyContinue)) {
    Write-Info "MySQL not found. Installing..."
    choco install mysql -y

    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Success "MySQL installed"
    Write-Info "MySQL has been installed. You may need to restart your terminal."
} else {
    Write-Success "MySQL already installed"
}
Write-Host ""

# 3. Check and install Java
Write-Host "☕ Checking Java..." -ForegroundColor White
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Info "Java not found. Installing OpenJDK 17..."
    choco install openjdk17 -y

    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Success "Java installed"
} else {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Success "Java already installed ($javaVersion)"
}
Write-Host ""

# 4. Check and install Node.js
Write-Host "📗 Checking Node.js..." -ForegroundColor White
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Info "Node.js not found. Installing..."
    choco install nodejs -y

    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Success "Node.js installed"
} else {
    $nodeVersion = node -v
    Write-Success "Node.js already installed ($nodeVersion)"
}
Write-Host ""

# 5. Check and install Maven
Write-Host "🔨 Checking Maven..." -ForegroundColor White
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Info "Maven not found. Installing..."
    choco install maven -y

    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Success "Maven installed"
} else {
    $mavenVersion = mvn -v | Select-Object -First 1
    Write-Success "Maven already installed ($mavenVersion)"
}
Write-Host ""

# 6. Start MySQL service
Write-Host "🚀 Starting MySQL service..." -ForegroundColor White
try {
    $service = Get-Service -Name MySQL* -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($service) {
        if ($service.Status -ne 'Running') {
            Start-Service -Name $service.Name -ErrorAction Stop
            Write-Success "MySQL service started"
        } else {
            Write-Success "MySQL service already running"
        }
    } else {
        Write-Info "MySQL service not found. Attempting to start manually..."
        # Try to start MySQL manually
        net start MySQL
        Write-Success "MySQL service started"
    }
} catch {
    Write-Error-Custom "Failed to start MySQL service: $_"
    Write-Info "Please start MySQL manually from Services or MySQL Workbench"
}
Write-Host ""

# 7. Wait for MySQL to be ready
Write-Host "⏳ Waiting for MySQL to be ready..." -ForegroundColor White
Start-Sleep -Seconds 5

# Test MySQL connection
$maxAttempts = 10
$attempt = 0
$connected = $false

while (-not $connected -and $attempt -lt $maxAttempts) {
    try {
        $result = mysql -u $DB_USER -p$DB_PASS -e "SELECT 1" 2>&1
        if ($LASTEXITCODE -eq 0) {
            $connected = $true
            Write-Success "MySQL is ready"
        } else {
            throw "Connection failed"
        }
    } catch {
        $attempt++
        Write-Info "Waiting for MySQL to accept connections... (Attempt $attempt/$maxAttempts)"
        Start-Sleep -Seconds 2
    }
}

if (-not $connected) {
    Write-Error-Custom "Could not connect to MySQL. Please check your installation."
    Write-Info "Try connecting manually: mysql -u $DB_USER -p$DB_PASS"
    pause
    exit
}
Write-Host ""

# 8. Create database
Write-Host "🗄️  Setting up database '$DB_NAME'..." -ForegroundColor White
try {
    mysql -u $DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Database '$DB_NAME' created"
    } else {
        # Try without password
        Write-Info "Trying to connect without password..."
        mysql -u $DB_USER -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>&1 | Out-Null
        $DB_PASS = ""
        Write-Success "Database '$DB_NAME' created"
    }
} catch {
    Write-Error-Custom "Failed to create database: $_"
    pause
    exit
}
Write-Host ""

# 9. Load database schema from SQL file
Write-Host "📁 Loading database schema..." -ForegroundColor White
$sqlFile = "init-db.sql"

if (Test-Path $sqlFile) {
    Write-Info "Found $sqlFile - Loading database schema and data..."
    if ($DB_PASS) {
        Get-Content $sqlFile | mysql -u $DB_USER -p$DB_PASS $DB_NAME 2>&1 | Out-Null
    } else {
        Get-Content $sqlFile | mysql -u $DB_USER $DB_NAME 2>&1 | Out-Null
    }

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Database schema loaded from $sqlFile"
    } else {
        Write-Error-Custom "Error loading SQL file"
    }
} else {
    Write-Error-Custom "SQL file not found: $sqlFile"
    Write-Info "Please make sure 'init-db.sql' is in the same directory as this script"
    Write-Info "You can download it from the project repository"
    Write-Host ""
    Write-Info "Creating basic database structure as fallback..."

    # Minimal fallback schema
    $fallbackSql = @"
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
"@

    $tempFile = "$env:TEMP\soundup_fallback.sql"
    $fallbackSql | Out-File -FilePath $tempFile -Encoding UTF8

    if ($DB_PASS) {
        mysql -u $DB_USER -p$DB_PASS $DB_NAME < $tempFile 2>&1 | Out-Null
    } else {
        mysql -u $DB_USER $DB_NAME < $tempFile 2>&1 | Out-Null
    }

    Remove-Item $tempFile -Force
    Write-Success "Basic database structure created"
    Write-Info "⚠️  For full schema with sample data, please add 'init-db.sql' file"
}
Write-Host ""

# 10. Verify installation
Write-Host "🔍 Verifying installation..." -ForegroundColor White
if ($DB_PASS) {
    mysql -u $DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES;"
} else {
    mysql -u $DB_USER $DB_NAME -e "SHOW TABLES;"
}
Write-Host ""

# 11. Install Frontend Dependencies
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor White
if (Test-Path "frontend\soundup") {
    Write-Info "Found frontend directory, installing npm packages..."
    Push-Location frontend\soundup

    # Install base dependencies
    Write-Info "Installing React dependencies..."
    npm install

    # Install Material-UI
    Write-Info "Installing Material-UI..."
    npm install @mui/material @emotion/react @emotion/styled

    # Install React Router
    Write-Info "Installing React Router..."
    npm install react-router-dom

    # Install Axios
    Write-Info "Installing Axios..."
    npm install axios

    # Install Chart.js
    Write-Info "Installing Chart.js..."
    npm install chart.js react-chartjs-2

    Pop-Location
    Write-Success "All frontend dependencies installed"
} else {
    Write-Info "Frontend directory not found at 'frontend\soundup'"
    Write-Info "Skipping frontend dependency installation"
}
Write-Host ""

# Summary
Write-Host ""
Write-Host "🎉 ==========================================" -ForegroundColor Green
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "=========================================== 🎉" -ForegroundColor Green
Write-Host ""
Write-Host "Database Information:" -ForegroundColor Cyan
Write-Host "  • Database: $DB_NAME"
Write-Host "  • User: $DB_USER"
Write-Host "  • Password: $DB_PASS"
Write-Host "  • Host: localhost"
Write-Host "  • Port: 3306"
Write-Host ""
Write-Host "Installed Frontend Packages:" -ForegroundColor Cyan
Write-Host "  • Material-UI (@mui/material)"
Write-Host "  • React Router (react-router-dom)"
Write-Host "  • Axios (axios)"
Write-Host "  • Chart.js (chart.js, react-chartjs-2)"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Navigate to backend folder: cd backend"
Write-Host "  2. Run Spring Boot: .\mvnw.cmd spring-boot:run"
Write-Host "  3. Open a new terminal and navigate to frontend: cd frontend\soundup"
Write-Host "  4. Start React app: npm start"
Write-Host ""
Write-Host "💡 Tip: Place your SQL file as 'init-db.sql' in the root directory" -ForegroundColor Yellow
Write-Host "   The script will automatically load it on next run!" -ForegroundColor Yellow
Write-Host ""
Write-Success "SoundUp is ready to use! 🎵"
Write-Host ""

pause