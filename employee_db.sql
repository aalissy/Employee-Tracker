DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Department table --
CREATE TABLE department(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

-- Role table --
CREATE TABLE role(
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    department_id INT,
    salary DECIMAL,
    PRIMARY KEY(role_id),
    FOREIGN KEY(department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

-- Employee table --
CREATE TABLE employee(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT, 
    PRIMARY KEY(employee_id),
    FOREIGN KEY(role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES employee(employee_id) ON DELETE CASCADE
);