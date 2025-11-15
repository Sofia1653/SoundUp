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
    CHECK (quantSeguidores >= 0)
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

CREATE TABLE Ouvinte (
    id_ouvinte INT PRIMARY KEY,
    CONSTRAINT fk_ouvinte_usuario FOREIGN KEY (id_ouvinte) REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Playlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ouvinte INT NOT NULL,
    visibilidade VARCHAR(20) NOT NULL DEFAULT 'privada',
    nome VARCHAR(70) NOT NULL,
    CONSTRAINT fk_playlist_ouvinte FOREIGN KEY (id_ouvinte) REFERENCES Ouvinte(id_ouvinte)
        ON DELETE CASCADE,
    UNIQUE (id_ouvinte, nome),
    CHECK (visibilidade IN ('privada', 'publica'))
);

CREATE TABLE Possui (
    id_musica INT,
    id_playlist INT,
    PRIMARY KEY (id_musica, id_playlist),
    CONSTRAINT fk_possui_musica FOREIGN KEY (id_musica) REFERENCES Musica(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_possui_playlist FOREIGN KEY (id_playlist) REFERENCES Playlist(id)
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

-- Insert data
INSERT INTO usuarios (nome, pais, estado, cidade, email, senha, quantSeguidores, telefone) VALUES
('Ana Castela','Brazil','MS','Amambai','ana@example.com','pw1111',20000000,'551199111111'),
('Alok','Brazil','DF','Brasilia','alok@example.com','pw2222',15000000,'551199111112'),
('Lady Gaga','USA','NY','NYC','gaga@example.com','pw3333',50000000,'551199111113'),
('Marilia Mendonça','Brazil','GO','Goiania','marilia@example.com','pw4444',30000000,'551199111114'),
('Beyonce','USA','TX','Houston','beyonce@example.com','pw5555',60000000,'551199111115'),
('Foo Fighters','USA','WA','Seattle','foof@example.com','pw6666',35000000,'551199111116'),
('Vanessa da Mata','Brazil','MT','Cuiaba','vanessa@example.com','pw7777',5000000,'551199111117'),
('ONEUS','Korea','Seoul','Seoul','oneus@example.com','pw8888',7000000,'551199111118'),
('Niall Horan','Ireland','Westmeath','Mullingar','niall@example.com','pw9999',12000000,'551199111119'),
('NX Zero','Brazil','SP','Sao Paulo','nxzero@example.com','pw1000',8000000,'551199111120'),
('Frank Ocean','USA','CA','Long Beach','frank@example.com','pw1111',9000000,'551199111121'),
('Anavitoria','Brazil','TO','Araguaina','anavitoria@example.com','pw1212',6000000,'551199111122'),
('Don Toliver','USA','TX','Houston','don@example.com','pw1312',5000000,'551199111123'),
('Radiohead','UK','ENG','Oxford','radiohead@example.com','pw1414',15000000,'551199111124'),
('Drake','Canada','ON','Toronto','drake@example.com','pw1515',47000000,'551199111125'),
('Kamaitachi','Brazil','SP','Sao Paulo','kamaitachi@example.com','pw1616',2000000,'551199111126'),
('Bon Jovi','USA','NJ','Sayreville','bonjovi@example.com','pw1717',25000000,'551199111127'),
('Henrique e Juliano','Brazil','GO','Palmeiras de Goias','henriquejuliano@example.com','pw1818',10000000,'551199111128'),
('One Direction','UK','ENG','London','1d@example.com','pw1919',35000000,'551199111129'),
('ABBA','Sweden','ST','Stockholm','abba@example.com','pw2020',30000000,'551199111130'),
('System of a Down','USA','CA','Glendale','soad@example.com','pw2121',20000000,'551199111131'),
('Fleetwood Mac','UK','ENG','London','fleetwood@example.com','pw2222',18000000,'551199111132'),
('Oasis','UK','ENG','Manchester','oasis@example.com','pw2323',22000000,'551199111133'),
('Lana Del Rey','USA','NY','NYC','lana@example.com','pw2424',26000000,'551199111134'),
('Marina Sena','Brazil','MG','Taiobeiras','marina@example.com','pw2525',2000000,'551199111135'),
('Mac Demarco','Canada','BC','Duncan','mac@example.com','pw2626',4000000,'551199111136'),
('Phoebe Bridgers','USA','CA','Los Angeles','phoebe@example.com','pw2727',5000000,'551199111137'),
('Jorge e Mateus','Brazil','GO','Itumbiara','jorgeemateus@example.com','pw2828',12000000,'551199111138'),
('Capital Inicial','Brazil','DF','Brasilia','capitalinicial@example.com','pw2929',7000000,'551199111139'),
('Cazuza','Brazil','RJ','Rio','cazuza@example.com','pw3030',5000000,'551199111140');

INSERT INTO Artista (id_artista, quant_ouvintes) VALUES
(1,20000000),(2,15000000),(3,50000000),(4,30000000),(5,60000000),
(6,35000000),(7,5000000),(8,7000000),(9,12000000),(10,8000000),
(11,9000000),(12,6000000),(13,5000000),(14,15000000),(15,47000000),
(16,2000000),(17,25000000),(18,10000000),(19,35000000),(20,30000000),
(21,20000000),(22,18000000),(23,22000000),(24,26000000),(25,2000000),(26,31000000),
(27,9500000),(28,17000000),(29,22500000),(30,46000000);

INSERT INTO Colabora (id_artistaPrincipal, id_artistaConvidado) VALUES
(1,5),(1,11),(2,3),(3,4),(5,11),(6,7),(7,8),(8,9),(9,1),(10,11),
(11,5),(12,14),(13,15),(14,16),(15,17),(16,1),(17,2),(18,19),(19,20),(20,21),
(21,22),(22,23),(23,24),(24,25),(25,26),(26,27),(27,28),(28,29),(29,30), (30,1);

INSERT INTO Versao (versao, descricao) VALUES
(1,'Original'),(1,'Original'),(2,'Acoustic'),(1,'Original'),(1,'Original'),(1,'Original'),
(1,'Original'),(2,'Remix'),(1,'Original'),(1,'Original'),(3,'Live'),(1,'Original'),
(2,'Deluxe'),(1,'Original'),(1,'Original'),(1,'Original'),(1,'Original'),(1,'Original'),
(1,'Original'),(1,'Original'),(1,'Original'),(2,'Unplugged'),(1,'Original'),(1,'Original'),
(1,'Original'),(1,'Original'),(1,'Original'),(2,'Remix'),(1,'Original'),(1,'Original');

INSERT INTO Musica (id_versao, nome, duracao) VALUES
(1,'Pipoco','180'),(1,'Hear Me Now','210'),(1,'Rain on Me','200'),
(1,'Infiel','230'),(1,'Break My Soul','220'),(1,'Everlong','250'),
(1,'Ai Ai Ai','190'),(1,'LUNA','205'),(1,'Slow Hands','210'),
(1,'Cedo ou Tarde','240'),(1,'Nikes','260'),(1,'Trevo','230'),
(1,'After Party','200'),(1,'Karma Police','240'),(1,'God''s Plan','220'),
(1,'Teu Silêncio','200'),(1,'Livin'' on a Prayer','250'),
(1,'Flor e o Beija-Flor','210'),(1,'What Makes You Beautiful','230'),
(1,'Dancing Queen','220'),(1,'Chop Suey!','210'),(1,'Dreams','260'),
(1,'Wonderwall','240'),(1,'Summertime Sadness','230'),
(1,'Por Supuesto','200'),(1, 'Moonlight on the River',420),
(1,'Kyoto',180),(1,'Os Anjos Cantam',180),(1,'Primeiros Erros',240),
(1,'Faz Parte do Meu Show',180);

INSERT INTO Lanca (id_artista, id_musica) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),
(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),
(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30);

INSERT INTO Ouvinte (id_ouvinte) VALUES
    (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
    (11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
    (21),(22),(23),(24),(25),(26),(27),(28),(29),(30);

INSERT INTO Playlist (id_ouvinte, visibilidade, nome) VALUES
    (1,'publica','Taylor Hits'),(2,'publica','Bad Bunny Mix'),(3,'publica','Drake Favs'),(4,'publica','Weeknd Night'),
    (5,'publica','Bruno Grooves'),(6,'publica','Kendrick Flow'),(7,'publica','SZA Chill'),(8,'publica','Rosé Pop'),
    (9,'publica','BLACKPINK Bangers'),(10,'publica','Billie Mellow'),(11,'publica','Ed Loves'),(12,'publica','Adele Ballads'),
    (13,'publica','Rihanna Vibes'),(14,'publica','Coldplay Moods'),(15,'publica','KarolG Hits'),(16,'publica','Bieber Mix'),
    (17,'publica','Ariana Top'),(18,'privada','Fan Playlist 1'),(19,'privada','Fan Playlist 2'),(20,'privada','Fan Playlist 3'),
    (21,'privada','Indie 1'),(22,'privada','Indie 2'),(23,'publica','Producer Mix'),(24,'publica','Label Best'),
    (25,'privada','UserA List'),(26,'privada','UserB List'),(27,'privada','UserC List'),(28,'privada','UserD List'),
    (29,'publica','Collabs'), (30, 'privada', 'Favoritas');

INSERT INTO Possui (id_musica, id_playlist) VALUES
    (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),
    (11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),
    (21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29), (30,30);

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
