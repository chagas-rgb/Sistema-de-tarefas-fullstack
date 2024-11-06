CREATE DATABASE tarefas_db;

USE tarefas_db;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    custo DECIMAL(10, 2) NOT NULL,
    data_limite DATE NOT NULL,
    concluida BOOLEAN DEFAULT FALSE
);
