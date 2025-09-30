INSERT INTO Usuario (nome, pais, estado, cidade, email, senha, quant_seguidores, telefone) VALUES
('Ana Castela','Brazil','Mato Grosso do Sul','Amambai','ana@example.com','pw1111',20000000,'551199111111'),
('Alok','Brazil','Distrito Federal','Brasilia','alok@example.com','pw2222',15000000,'551199111112'),
('Lady Gaga','USA','New York','NYC','gaga@example.com','pw3333',50000000,'551199111113'),
('Marilia Mendonça','Brazil','Goias','Goiania','marilia@example.com','pw4444',30000000,'551199111114'),
('Beyonce','USA','Texas','Houston','beyonce@example.com','pw5555',60000000,'551199111115'),
('Foo Fighters','USA','Washington','Seattle','foof@example.com','pw6666',35000000,'551199111116'),
('Vanessa da Mata','Brazil','Mato Grosso','Cuiaba','vanessa@example.com','pw7777',5000000,'551199111117'),
('ONEUS','Korea','Seoul','Seoul','oneus@example.com','pw8888',7000000,'551199111118'),
('Niall Horan','Ireland','Westmeath','Mullingar','niall@example.com','pw9999',12000000,'551199111119'),
('NX Zero','Brazil','Sao Paulo','Sao Paulo','nxzero@example.com','pw1000',8000000,'551199111120'),
('Frank Ocean','USA','California','Long Beach','frank@example.com','pw1111',9000000,'551199111121'),
('Anavitoria','Brazil','Tocantins','Araguaina','anavitoria@example.com','pw1212',6000000,'551199111122'),
('Don Toliver','USA','Texas','Houston','don@example.com','pw1312',5000000,'551199111123'),
('Radiohead','UK','England','Oxford','radiohead@example.com','pw1414',15000000,'551199111124'),
('Drake','Canada','Ontario','Toronto','drake@example.com','pw1515',47000000,'551199111125'),
('Kamaitachi','Brazil','Sao Paulo','Sao Paulo','kamaitachi@example.com','pw1616',2000000,'551199111126'),
('Bon Jovi','USA','New Jersey','Sayreville','bonjovi@example.com','pw1717',25000000,'551199111127'),
('Henrique e Juliano','Brazil','Goias','Palmeiras de Goias','henriquejuliano@example.com','pw1818',10000000,'551199111128'),
('One Direction','UK','England','London','1d@example.com','pw1919',35000000,'551199111129'),
('ABBA','Sweden','Stockholm','Stockholm','abba@example.com','pw2020',30000000,'551199111130'),
('System of a Down','USA','California','Glendale','soad@example.com','pw2121',20000000,'551199111131'),
('Fleetwood Mac','UK','England','London','fleetwood@example.com','pw2222',18000000,'551199111132'),
('Oasis','UK','England','Manchester','oasis@example.com','pw2323',22000000,'551199111133'),
('Lana Del Rey','USA','New York','NYC','lana@example.com','pw2424',26000000,'551199111134'),
('Marina Sena','Brazil','Minas Gerais','Taiobeiras','marina@example.com','pw2525',2000000,'551199111135'),
('Mac Demarco','Canada','British Columbia','Duncan','mac@example.com','pw2626',4000000,'551199111136'),
('Phoebe Bridgers','USA','California','Los Angeles','phoebe@example.com','pw2727',5000000,'551199111137'),
('Jorge e Mateus','Brazil','Goias','Itumbiara','jorgeemateus@example.com','pw2828',12000000,'551199111138'),
('Capital Inicial','Brazil','Distrito Federal','Brasilia','capitalinicial@example.com','pw2929',7000000,'551199111139'),
('Cazuza','Brazil','Rio de Janeiro','Rio','cazuza@example.com','pw3030',5000000,'551199111140');

select * from Usuario;

INSERT INTO Telefone (id, telefone) VALUES
(1,'551199111111'),(2,'551199111112'),(3,'551199111113'),(4,'551199111114'),(5,'551199111115'),
(6,'551199111116'),(7,'551199111117'),(8,'551199111118'),(9,'551199111119'),(10,'551199111120'),
(11,'551199111121'),(12,'551199111122'),(13,'551199111123'),(14,'551199111124'),(15,'551199111125'),
(16,'551199111126'),(17,'551199111127'),(18,'551199111128'),(19,'551199111129'),(20,'551199111130'),
(21,'551199111131'),(22,'551199111132'),(23,'551199111133'),(24,'551199111134'),(25,'551199111135'),
(26,'551199111136'),(27,'551199111137'),(28,'551199111138'),(29,'551199111139'), (30, '558199111140');

INSERT INTO Artista (id_artista, quant_ouvintes) VALUES
(1,20000000),(2,15000000),(3,50000000),(4,30000000),(5,60000000),
(6,35000000),(7,5000000),(8,7000000),(9,12000000),(10,8000000),
(11,9000000),(12,6000000),(13,5000000),(14,15000000),(15,47000000),
(16,2000000),(17,25000000),(18,10000000),(19,35000000),(20,30000000),
(21,20000000),(22,18000000),(23,22000000),(24,26000000),(25,2000000),(26,31000000),
(27,9500000),(28,17000000),(29,22500000),(30,46000000);

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