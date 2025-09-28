# Multi-stage Dockerfile for SoundUp Full-Stack Application
# Stage 1: Build React Frontend
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/soundup/package*.json ./
COPY frontend/soundup/yarn.lock* ./

# Install frontend dependencies
RUN npm install

# Copy frontend source
COPY frontend/soundup/ ./

# Build React application
RUN npm run build

# Stage 2: Build Spring Boot Backend
FROM maven:3.8.6-openjdk-17 as backend-build

WORKDIR /app/backend

# Copy Maven files
COPY backend/pom.xml ./
COPY backend/src ./src

# Build Spring Boot application
RUN mvn clean package -DskipTests

# Stage 3: Database Setup
FROM mysql:8.0 as database

# Set MySQL environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=soundup
ENV MYSQL_USER=soundup_user
ENV MYSQL_PASSWORD=soundup_pass

# Copy database initialization scripts
COPY <<EOF /docker-entrypoint-initdb.d/01-init.sql
-- SoundUp Database Schema
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS versao (
    id_versao INT AUTO_INCREMENT PRIMARY KEY,
    versao INT NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS artistas (
    id_artista INT PRIMARY KEY,
    quant_ouvintes INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_artista_usuario FOREIGN KEY (id_artista) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK(quant_ouvintes >= 0)
);

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

-- Display created tables and data
SHOW TABLES;
SELECT 'Sample data inserted successfully!' as status;
EOF

# Stage 4: Production Runtime
FROM openjdk:17-jdk-slim as production

# Install system dependencies
RUN apt-get update && apt-get install -y \
    mysql-client \
    curl \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy built Spring Boot JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy built React application
COPY --from=frontend-build /app/frontend/build /var/www/html

# Configure Nginx for React frontend
COPY <<EOF /etc/nginx/sites-available/soundup
server {
    listen 80;
    server_name localhost;
    root /var/www/html;
    index index.html;

    # Handle React routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to Spring Boot
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Handle static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

RUN ln -s /etc/nginx/sites-available/soundup /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default

# Create database connection scripts
COPY <<EOF /app/scripts/db-setup.sh
#!/bin/bash

# Database connection variables
DB_HOST=\${DB_HOST:-mysql-db}
DB_PORT=\${DB_PORT:-3306}
DB_NAME=\${DB_NAME:-soundup}
DB_USER=\${DB_USER:-root}
DB_PASS=\${DB_PASS:-root}

echo "Waiting for database connection at \$DB_HOST:\$DB_PORT..."

# Wait for database to be ready
until mysql -h"\$DB_HOST" -P"\$DB_PORT" -u"\$DB_USER" -p"\$DB_PASS" -e "SELECT 1" >/dev/null 2>&1; do
    echo "Database not ready, waiting..."
    sleep 3
done

echo "✅ Database connection established!"
echo "Database: \$DB_NAME at \$DB_HOST:\$DB_PORT"

# Test database tables
echo "Verifying database tables..."
mysql -h"\$DB_HOST" -P"\$DB_PORT" -u"\$DB_USER" -p"\$DB_PASS" "\$DB_NAME" -e "SHOW TABLES;"

echo "✅ Database setup verification complete!"
EOF

# Create platform-specific setup scripts
COPY <<EOF /app/scripts/setup-mac.sh
#!/bin/bash

echo "🎵 SoundUp - macOS Setup Script"

DB_NAME="soundup"
DB_USER="root"
DB_PASS="root"

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found. Installing Homebrew..."
    /bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Check for MySQL
if ! command -v mysql &> /dev/null; then
    echo "📦 Installing MySQL via Homebrew..."
    brew install mysql
fi

# Check for Java
if ! command -v java &> /dev/null; then
    echo "📦 Installing OpenJDK 17 via Homebrew..."
    brew install openjdk@17
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js via Homebrew..."
    brew install node
fi

echo "🚀 Starting MySQL service..."
brew services start mysql

echo "⏳ Waiting for MySQL to start..."
sleep 5

echo "🗄️  Creating database '\$DB_NAME'..."
mysql -u \$DB_USER -p\$DB_PASS -e "CREATE DATABASE IF NOT EXISTS \$DB_NAME;"

echo "✅ macOS setup completed!"
echo "🎵 SoundUp is ready to run!"
EOF

COPY <<EOF /app/scripts/setup-win.ps1
# SoundUp - Windows PowerShell Setup Script

\$DB_NAME = "soundup"
\$DB_USER = "root"
\$DB_PASS = "root"

Write-Output "🎵 SoundUp - Windows Setup Script"

# Check if Chocolatey is installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Output "📦 Installing Chocolatey package manager..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Check if MySQL is installed
if (-not (Get-Command mysql.exe -ErrorAction SilentlyContinue)) {
    Write-Output "📦 Installing MySQL..."
    choco install mysql -y
    Write-Output "Please restart your PowerShell session after installation."
}

# Check if Java is installed
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Output "📦 Installing OpenJDK 17..."
    choco install openjdk17 -y
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Output "📦 Installing Node.js..."
    choco install nodejs -y
}

Write-Output "🚀 Starting MySQL service..."
Start-Service -Name MySQL -ErrorAction SilentlyContinue

Start-Sleep -Seconds 5

Write-Output "🗄️  Creating database '\$DB_NAME'..."
& mysql -u \$DB_USER -p\$DB_PASS -e "CREATE DATABASE IF NOT EXISTS \$DB_NAME;"

Write-Output "✅ Windows setup completed!"
Write-Output "🎵 SoundUp is ready to run!"
EOF

# Make scripts executable
RUN chmod +x /app/scripts/db-setup.sh /app/scripts/setup-mac.sh

# Configure Supervisor to manage multiple services
COPY <<EOF /etc/supervisor/conf.d/soundup.conf
[supervisord]
nodaemon=true
user=root

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/var/log/nginx.log
stderr_logfile=/var/log/nginx_error.log

[program:springboot]
command=java -jar /app/app.jar
directory=/app
autostart=true
autorestart=true
stdout_logfile=/var/log/springboot.log
stderr_logfile=/var/log/springboot_error.log
environment=SPRING_PROFILES_ACTIVE="docker"
EOF

# Create application.yml for Docker environment
COPY <<EOF /app/application-docker.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://\${DB_HOST:mysql-db}:\${DB_PORT:3306}/\${DB_NAME:soundup}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: \${DB_USER:root}
    password: \${DB_PASS:root}
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

logging:
  level:
    com.soundup: INFO
    org.springframework: WARN
EOF

# Expose ports
EXPOSE 80 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:80 && curl -f http://localhost:8080/actuator/health || exit 1

# Create startup script
COPY <<EOF /app/startup.sh
#!/bin/bash

echo "🎵 Starting SoundUp Full-Stack Application..."

# Wait for database if specified
if [ -n "\$DB_HOST" ] && [ "\$DB_HOST" != "localhost" ]; then
    echo "🔗 Connecting to external database..."
    /app/scripts/db-setup.sh
fi

echo "🚀 Starting services with Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
EOF

RUN chmod +x /app/startup.sh

# Set default environment variables
ENV SPRING_PROFILES_ACTIVE=docker
ENV DB_HOST=mysql-db
ENV DB_PORT=3306
ENV DB_NAME=soundup
ENV DB_USER=root
ENV DB_PASS=root

CMD ["/app/startup.sh"]