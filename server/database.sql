CREATE DATABASE contatinhos

CREATE TABLE contatos(
    contato_id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    numero VARCHAR(11)
)