CREATE DATABASE IF NOT EXISTS bd_lopez;

USE bd_lopez;

CREATE TABLE IF NOT EXISTS person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    fecha_nacimiento DATE,
    puesto VARCHAR(255),
    sueldo DECIMAL(10, 2)
);

CREATE USER 'conexion'@'localhost' IDENTIFIED BY 'Wk2!rT8s@6w';
GRANT ALL PRIVILEGES ON bd_lopez.* TO 'conexion'@'localhost';
FLUSH PRIVILEGES;
