USE soundup;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Reproducao;
DROP TABLE IF EXISTS Tem;
DROP TABLE IF EXISTS Historico;
DROP TABLE IF EXISTS Genero;
DROP TABLE IF EXISTS Possui;
DROP TABLE IF EXISTS Curte;
DROP TABLE IF EXISTS Playlist;
DROP TABLE IF EXISTS Segue;
DROP TABLE IF EXISTS Ouvinte;
DROP TABLE IF EXISTS Pertence;
DROP TABLE IF EXISTS Lanca;
DROP TABLE IF EXISTS Colabora;
DROP TABLE IF EXISTS artistas;
DROP TABLE IF EXISTS Telefone;
DROP TABLE IF EXISTS musicas;
DROP TABLE IF EXISTS albuns;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS Preferencias;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    pais VARCHAR(30),
    estado VARCHAR(30),
    cidade VARCHAR(50),
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(30) NOT NULL,
    quantSeguidores INT CHECK (quantSeguidores >= 0),
    telefone VARCHAR(15)
);

CREATE TABLE Telefone (
    id INT NOT NULL,
    telefone VARCHAR(15),
    PRIMARY KEY (id, telefone),
    FOREIGN KEY (id) REFERENCES usuarios(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (telefone REGEXP '^[0-9]{8,15}$')
);

CREATE TABLE artistas (
    id_artista INT PRIMARY KEY,
    quant_ouvintes INT NOT NULL DEFAULT 0 CHECK(quant_ouvintes >= 0),
    FOREIGN KEY (id_artista) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Colabora (
    id_artistaPrincipal INT,
    id_artistaConvidado INT,
    PRIMARY KEY (id_artistaPrincipal, id_artistaConvidado),
    FOREIGN KEY (id_artistaPrincipal) REFERENCES artistas(id_artista)
        ON DELETE CASCADE,
    FOREIGN KEY (id_artistaConvidado) REFERENCES artistas(id_artista)
        ON DELETE CASCADE
);

CREATE TABLE albuns (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    duracao INT NOT NULL,
    ano INT NOT NULL
);

CREATE TABLE musicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_album INT NULL,
    nome VARCHAR(70) NOT NULL,
    duracao INT NOT NULL CHECK (duracao > 0),
    FOREIGN KEY (id_album) REFERENCES albuns(id_album) ON DELETE SET NULL
);

CREATE TABLE Pertence (
    id_musica INT,
    id_album INT,
    PRIMARY KEY (id_musica, id_album),
    FOREIGN KEY (id_musica) REFERENCES musicas(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_album) REFERENCES albuns(id_album)
        ON DELETE CASCADE
);

CREATE TABLE Lanca (
    id_artista INT,
    id_musica INT,
    PRIMARY KEY (id_artista, id_musica),
    FOREIGN KEY (id_artista) REFERENCES artistas(id_artista)
        ON DELETE CASCADE,
    FOREIGN KEY (id_musica) REFERENCES musicas(id)
        ON DELETE CASCADE
);

CREATE TABLE Ouvinte (
    id_ouvinte INT PRIMARY KEY,
    FOREIGN KEY (id_ouvinte) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Segue (
    id_seguidor INT,
    id_seguido INT,
    PRIMARY KEY (id_seguidor, id_seguido),
    FOREIGN KEY (id_seguidor) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_seguido) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE Playlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ouvinte INT NOT NULL,
    visibilidade VARCHAR(20) NOT NULL DEFAULT 'privada'
        CHECK (visibilidade IN ('privada','publica')),
    nome VARCHAR(70) NOT NULL,
    FOREIGN KEY (id_ouvinte) REFERENCES Ouvinte(id_ouvinte)
        ON DELETE CASCADE,
    UNIQUE (id_ouvinte, nome)
);

CREATE TABLE Curte (
    id_ouvinte INT,
    id_playlist INT,
    PRIMARY KEY (id_ouvinte, id_playlist),
    FOREIGN KEY (id_ouvinte) REFERENCES Ouvinte(id_ouvinte) ON DELETE CASCADE,
    FOREIGN KEY (id_playlist) REFERENCES Playlist(id) ON DELETE CASCADE
);

CREATE TABLE Possui (
    id_musica INT,
    id_playlist INT,
    PRIMARY KEY (id_musica, id_playlist),
    FOREIGN KEY (id_musica) REFERENCES musicas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_playlist) REFERENCES Playlist(id) ON DELETE CASCADE
);

CREATE TABLE Genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE Historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_inicio DATETIME,
    hora_fim DATETIME,
    CHECK (hora_fim IS NULL OR hora_fim >= hora_inicio)
);

CREATE TABLE Tem (
    id_musica INT,
    id_genero INT,
    PRIMARY KEY (id_musica, id_genero),
    FOREIGN KEY (id_musica) REFERENCES musicas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES Genero(id) ON DELETE CASCADE
);

CREATE TABLE Reproducao (
    id_historico INT,
    id_ouvinte INT,
    id_musica INT,
    data_hora DATETIME NOT NULL,
    PRIMARY KEY (id_historico, id_ouvinte, id_musica, data_hora),
    FOREIGN KEY (id_historico) REFERENCES Historico(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ouvinte) REFERENCES Ouvinte(id_ouvinte) ON DELETE CASCADE,
    FOREIGN KEY (id_musica) REFERENCES musicas(id) ON DELETE CASCADE
);

CREATE TABLE Preferencias (
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

INSERT INTO artistas (id_artista, quant_ouvintes) VALUES
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

INSERT INTO albuns (nome, duracao, ano) VALUES
    ('Album Pipoco',180,2022),
    ('Album Hear Me Now',210,2017),
    ('Album Rain on Me',200,2020),
    ('Album Infiel',230,2016),
    ('Album Break My Soul',220,2022),
    ('Album Everlong',250,1997),
    ('Album Ai Ai Ai',190,2006),
    ('Album LUNA',205,2023),
    ('Album Slow Hands',210,2017),
    ('Album Cedo ou Tarde',240,2008),
    ('Album Nikes',260,2016),
    ('Album Trevo',230,2016),
    ('Album After Party',200,2021),
    ('Album Karma Police',240,1997),
    ('Album God''s Plan',220,2018),
    ('Album Teu Silencio',200,2015),
    ('Album Livin on a Prayer',250,1986),
    ('Album Flor e o Beija-Flor',210,2017),
    ('Album What Makes You Beautiful',230,2011),
    ('Album Dancing Queen',220,1976),
    ('Album Chop Suey',210,2001),
    ('Album Dreams',260,1977),
    ('Album Wonderwall',240,1995),
    ('Album Summertime Sadness',230,2012),
    ('Album Por Supuesto',200,2021),
    ('Album Moonlight on the River',420,2017),
    ('Album Kyoto',180,2020),
    ('Album Os Anjos Cantam',180,2015),
    ('Album Primeiros Erros',240,1989),
    ('Album Faz Parte do Meu Show',180,1988);

INSERT INTO musicas (id_album, nome, duracao) VALUES
    (1,'Pipoco',180),
    (2,'Hear Me Now',210),
    (3,'Rain on Me',200),
    (4,'Infiel',230),
    (5,'Break My Soul',220),
    (6,'Everlong',250),
    (7,'Ai Ai Ai',190),
    (8,'LUNA',205),
    (9,'Slow Hands',210),
    (10,'Cedo ou Tarde',240),
    (11,'Nikes',260),
    (12,'Trevo',230),
    (13,'After Party',200),
    (14,'Karma Police',240),
    (15,'God''s Plan',220),
    (16,'Teu Silêncio',200),
    (17,'Livin'' on a Prayer',250),
    (18,'Flor e o Beija-Flor',210),
    (19,'What Makes You Beautiful',230),
    (20,'Dancing Queen',220),
    (21,'Chop Suey!',210),
    (22,'Dreams',260),
    (23,'Wonderwall',240),
    (24,'Summertime Sadness',230),
    (25,'Por Supuesto',200),
    (26,'Moonlight on the River',420),
    (27,'Kyoto',180),
    (28,'Os Anjos Cantam',180),
    (29,'Primeiros Erros',240),
    (30,'Faz Parte do Meu Show',180);

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
SELECT COUNT(*) as total_lancamentos FROM Lanca;
SELECT COUNT(*) as total_preferencias FROM Preferencias;
SELECT '========================================' as '';
SELECT '' as '';
