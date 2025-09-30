USE soundup;

-- Drop existing tables if they exist (for clean setup)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Lanca;
DROP TABLE IF EXISTS Preferencias;
DROP TABLE IF EXISTS artistas;
DROP TABLE IF EXISTS musicas;
DROP TABLE IF EXISTS versao;
DROP TABLE IF EXISTS usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- Create versao table first (since musicas references it)
CREATE TABLE versao (
    id_versao INT AUTO_INCREMENT PRIMARY KEY,
    versao INT NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

-- Create musicas table (correct table name)
CREATE TABLE musicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_versao INT NULL,
    nome VARCHAR(70) NOT NULL,
    duracao INT NOT NULL,
    CONSTRAINT fk_musica_versao FOREIGN KEY (id_versao) REFERENCES versao(id_versao)
        ON DELETE SET NULL,
    CHECK (duracao > 0)
);

-- Create usuarios table
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    pais VARCHAR(30),
    estado VARCHAR(30),
    cidade VARCHAR(50),
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    quantSeguidores INTEGER,
    telefone VARCHAR(15),
    UNIQUE (email),
    CHECK (quantSeguidores >= 0),
    CHECK(CHAR_LENGTH(senha) >= 6)
);

-- Create artistas table (assuming usuarios table already exists)
CREATE TABLE artistas (
    id_artista INT PRIMARY KEY,
    quant_ouvintes INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_artista_usuario FOREIGN KEY (id_artista) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK(quant_ouvintes >= 0)
);

-- Create Lanca table with CORRECT table references
CREATE TABLE Lanca (
    id_artista INT,
    id_musica INT,
    PRIMARY KEY (id_artista, id_musica),
    CONSTRAINT fk_lanca_artista FOREIGN KEY (id_artista) REFERENCES artistas(id_artista)
        ON DELETE CASCADE,
    CONSTRAINT fk_lanca_musica FOREIGN KEY (id_musica) REFERENCES musicas(id)
        ON DELETE CASCADE
);

-- Create Preferencias table
CREATE TABLE IF NOT EXISTS Preferencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    todos_dias VARCHAR(50),
    plataforma VARCHAR(100),
    tipo_playlist VARCHAR(100),
    media_horas VARCHAR(50),
    humor VARCHAR(100),
    horario_dia VARCHAR(50),
    concentracao VARCHAR(100),
    locomocao VARCHAR(100),
    tipo_musica VARCHAR(200),
    musica_dormir VARCHAR(50),
    momentos_vida VARCHAR(200),
    motivacao VARCHAR(200),
    polemicas VARCHAR(100)
);

-- Optional: Add indexes for better performance
CREATE INDEX idx_lanca_artista ON Lanca(id_artista);
CREATE INDEX idx_lanca_musica ON Lanca(id_musica);
CREATE INDEX idx_musicas_nome ON musicas(nome);
CREATE INDEX idx_artistas_ouvintes ON artistas(quant_ouvintes);

-- Insert sample data for testing

-- Insert versoes
INSERT INTO versao (versao, descricao) VALUES 
    (1, 'Original Version'),
    (2, 'Remix Version'),
    (3, 'Acoustic Version'),
    (4, 'Live Version'),
    (5, 'Extended Version');

-- Insert usuarios
INSERT INTO usuarios (nome, pais, estado, cidade, email, senha, quantSeguidores, telefone) VALUES 
    ('João Silva', 'Brasil', 'São Paulo', 'São Paulo', 'joao.silva@soundup.com', 'senha123', 1500, '11987654321'),
    ('Maria Santos', 'Brasil', 'Rio de Janeiro', 'Rio de Janeiro', 'maria.santos@soundup.com', 'senha456', 2500, '21987654321'),
    ('Pedro Costa', 'Brasil', 'Minas Gerais', 'Belo Horizonte', 'pedro.costa@soundup.com', 'senha789', 500, '31987654321'),
    ('Ana Lima', 'Brasil', 'Pernambuco', 'Recife', 'ana.lima@soundup.com', 'senha321', 800, '81987654321'),
    ('Carlos Oliveira', 'Brasil', 'Bahia', 'Salvador', 'carlos.oliveira@soundup.com', 'senha654', 3000, '71987654321');

-- Insert artistas (ids must match usuarios)
INSERT INTO artistas (id_artista, quant_ouvintes) VALUES 
    (1, 15000),
    (2, 25000),
    (5, 50000);

-- Insert musicas
INSERT INTO musicas (nome, duracao, id_versao) VALUES 
    ('Verão Brasileiro', 180, 1),
    ('Noite na Cidade', 240, 1),
    ('Sonhos Acústicos', 200, 3),
    ('Ritmo Digital', 195, 1),
    ('Batida do Coração', 220, 2),
    ('Amanhecer', 165, 3),
    ('Pulso Eletrônico', 210, 1),
    ('Melodia do Vento', 190, 1),
    ('Céu Estrelado', 235, 4),
    ('Caminho das Águas', 175, 1);

-- Insert Lanca (artista-musica relationships)
INSERT INTO Lanca (id_artista, id_musica) VALUES 
    (1, 1),  -- João Silva - Verão Brasileiro
    (1, 2),  -- João Silva - Noite na Cidade
    (1, 3),  -- João Silva - Sonhos Acústicos
    (1, 6),  -- João Silva - Amanhecer
    (1, 8),  -- João Silva - Melodia do Vento
    (2, 4),  -- Maria Santos - Ritmo Digital
    (2, 5),  -- Maria Santos - Batida do Coração
    (2, 7),  -- Maria Santos - Pulso Eletrônico
    (5, 9),  -- Carlos Oliveira - Céu Estrelado
    (5, 10); -- Carlos Oliveira - Caminho das Águas

-- Insert sample Preferencias
INSERT INTO Preferencias (
    todos_dias, plataforma, tipo_playlist, media_horas, humor, 
    horario_dia, concentracao, locomocao, tipo_musica, musica_dormir,
    momentos_vida, motivacao, polemicas
) VALUES 
    ('Sim', 'Spotify', 'Personalizadas', '3-5 horas', 'Feliz', 
     'Manhã', 'Sim', 'Carro', 'Pop, Rock', 'Não',
     'Trabalho, Exercício', 'Produtividade', 'Não'),
    ('Sim', 'YouTube Music', 'Top Hits', '1-3 horas', 'Relaxado', 
     'Tarde', 'Às vezes', 'Transporte Público', 'MPB, Jazz', 'Sim',
     'Lazer, Estudo', 'Relaxamento', 'Neutro'),
    ('Não', 'Apple Music', 'Descobertas', '5+ horas', 'Animado', 
     'Noite', 'Sim', 'Caminhando', 'Eletrônica, Hip Hop', 'Não',
     'Festa, Trabalho', 'Energia', 'Sim');

-- Display summary
SELECT '========================================' as '';
SELECT 'Database initialized successfully!' as status;
SELECT '========================================' as '';
SELECT '' as '';
SELECT 'Summary:' as '';
SELECT COUNT(*) as total_usuarios FROM usuarios;
SELECT COUNT(*) as total_artistas FROM artistas;
SELECT COUNT(*) as total_musicas FROM musicas;
SELECT COUNT(*) as total_versoes FROM versao;
SELECT COUNT(*) as total_lancamentos FROM Lanca;
SELECT COUNT(*) as total_preferencias FROM Preferencias;
SELECT '========================================' as '';
SELECT '' as '';