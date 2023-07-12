CREATE DATABASE contatinhos

CREATE TABLE contatos(
    contato_id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    numero VARCHAR(15),
    email VARCHAR(50),
    cargo VARCHAR(25),
    sexo VARCHAR(25)
)