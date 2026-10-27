CREATE DATABASE IF NOT EXISTS db_retrogames;

USE db_retrogames;

CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    plataforma VARCHAR(100) NOT NULL,
    desenvolvedora VARCHAR(150) NOT NULL,
    imagem_url TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco)
VALUES
(
    'Woody Woodpecker: Escape from Buzz Buzzard Park',
    'PlayStation 2',
    'Universal Interactive Studios',
    'https://down-br.img.susercontent.com/file/5843659e5442d6792656fa79991c5b43',
    89.90
),
(
    'Sonic the Hedgehog',
    'Mega Drive',
    'Sega',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sonic_The_Hedgehog.svg',
    19.90
),
(
    'Crash Bandicoot',
    'PlayStation 1',
    'Naughty Dog',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSuumfPBUF8JimK3JK2RUzMxGZwsfqFfJIFrTYt3Z0HHNVYQ1sEX6lWs&s=10',
    929.90
);