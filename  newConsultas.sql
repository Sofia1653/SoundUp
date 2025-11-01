DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Genero;

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

