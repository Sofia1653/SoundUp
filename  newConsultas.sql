DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Genero;
DROP TABLE IF EXISTS Colabora;
DROP TABLE IF EXISTS Tem;

CREATE TABLE Album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(70) NOT NULL,
    duracao INT NOT NULL,
    CHECK (duracao > 0)
);

CREATE TABLE Genero (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(50) NOT NULL,
   descricao TEXT
);

CREATE TABLE Colabora (
    id_artistaPrincipal INT,
    id_artistaConvidado INT,
    PRIMARY KEY (id_artistaPrincipal, id_artistaConvidado),
    CONSTRAINT fk_colab_principal FOREIGN KEY (id_artistaPrincipal) REFERENCES Artista(id_artista)
        ON DELETE CASCADE,
    CONSTRAINT fk_colab_convidado FOREIGN KEY (id_artistaConvidado) REFERENCES Artista(id_artista)
        ON DELETE CASCADE
);

CREATE TABLE Tem (
    id_musica INT,
    id_genero INT,
    PRIMARY KEY (id_musica, id_genero),
    CONSTRAINT fk_tem_musica FOREIGN KEY (id_musica) REFERENCES Musica(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_tem_genero FOREIGN KEY (id_genero) REFERENCES Genero(id)
        ON DELETE CASCADE
);

INSERT INTO Album (nome, duracao) VALUES
   ('Boiadeira',3200),('CONTROVERSIA by Alok',3400),('Chromatica',3600),
   ('Todos os Cantos',2800),('Renaissance',3900),('Wasting Light',3700),
   ('Essa Boneca Tem Manual',2600),('LIVED',2000),('Flicker',2500),
   ('Cedo ou Tarde',2700),('Blonde',3100),('Cor',2200),('Heaven or Hell',2400),
   ('OK Computer',3000),('Scorpion',3300),('O Homem Tinta',1800),
   ('Slippery When Wet',2900),('Ao Vivo em Brasília',3100),('Take Me Home',3500),
   ('Arrival',2700),('Toxicity',3000),('Rumours',2900),('Definitely Maybe',3100),
   ('Born to Die',2700),('De Primeira',2000), ('This Old Dog',2520), ('Punisher',2400),
   ('Os Anjos Cantam',3180), ('Acústico Capital Inicial',3100), ('Ideologia',2000);

INSERT INTO Genero (nome, descricao) VALUES
    ('Brega','Romântico e popular brasileiro'),
    ('Pop','Música pop internacional e nacional'),
    ('Funk','Funk brasileiro'),
    ('MPB','Música Popular Brasileira'),
    ('Rock','Rock internacional e nacional'),
    ('Sertanejo','Sertanejo universitário e raiz'),
    ('R&B','Rhythm and Blues'),
    ('Eletrônica','Dance, House, EDM'),
    ('K-pop','Pop coreano'),
    ('J-pop','Pop japonês'),
    ('Bossa Nova','Estilo brasileiro de jazz e samba'),
    ('Música Clássica','Clássica/erudita'),
    ('Trilha Sonora','Soundtracks de filmes e séries'),
    ('Ópera','Música lírica'),
    ('Samba','Samba brasileiro'),
    ('Gospel','Música gospel cristã'),
    ('Forró','Forró nordestino'),
    ('Indie','Indie rock e pop alternativo'),
    ('Jazz','Jazz tradicional e moderno'),
    ('Blues','Blues norte-americano'),
    ('Hip Hop','Hip hop e rap'),
    ('Folk','Folk rock e acústico'),
    ('Rap','Rap nacional e internacional'),
    ('Fado','Estilo tradicional português'),
    ('Trap','Trap internacional e nacional');

INSERT INTO Colabora (id_artistaPrincipal, id_artistaConvidado) VALUES
    (1,5),(1,11),(2,3),(3,4),(5,11),(6,7),(7,8),(8,9),(9,1),(10,11),
    (11,5),(12,14),(13,15),(14,16),(15,17),(16,1),(17,2),(18,19),(19,20),(20,21),
    (21,22),(22,23),(23,24),(24,25),(25,26),(26,27),(27,28),(28,29),(29,30), (30,1);

INSERT INTO Tem (id_musica, id_genero) VALUES
    (1,6),(2,8),(3,2),(4,6),
    (5,2),(6,5),(7,4),(8,9),
    (9,2),(10,5),(11,7),(12,4),
    (13,21),(14,5),(15,21),(16,23),
    (17,5),(18,6),(19,2),(20,2),
    (21,5),(22,5),(23,5),(24,2),
    (25,4),(26,18),(27,18),(28,6),
    (29,4),(30,4);

