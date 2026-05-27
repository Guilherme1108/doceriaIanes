create database db_doceria_gourmet_ianes;
use db_doceria_gourmet_ianes;

CREATE TABLE tbl_usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(8) NOT NULL
);

CREATE TABLE tbl_produto (
	id_produto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    massa VARCHAR(100) NOT NULL,
    recheio VARCHAR(100) NOT NULL,
    cobertura VARCHAR(100) NOT NULL,
    peso DECIMAL(5,2),
    porcoes INT,
    preco DECIMAL(10,2),
    quantidade INT,
    validade DATE
);

CREATE TABLE tbl_descarte(
	id_descarte INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	data_descarte DATE,
	id_usuario INT,
	id_produto INT,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
	FOREIGN KEY (id_produto) REFERENCES tbl_produto(id_produto)
);