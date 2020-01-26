CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT primary key,
name VARCHAR(30)
);
SELECT * FROM role;

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT primary key,
title VARCHAR(30),
salary DECIMAL, 
department_id INT
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager VARCHAR(30) null
);

select * from employee;
SELECT * FROM employee left join (role cross JOIN department ) on (employee.role_id = role.id AND role.department_id = department.id);
SELECT * FROM employee LEFT JOIN (department CROSS JOIN role) ON (employee.role_id = role.id AND role.department_id = department.id);
SELECT * FROM employee LEFT JOIN (role) on (employee.id = role.manager_id);
SELECT * FROM employee JOIN department JOIN role
                 ON (role.manager_id = employee.id and employee.role_id = role.id AND role.department_id = department.id);
                 
SELECT * FROM employee LEFT JOIN (department join role) on (role.id = employee.role_id AND role.department_id = department.id) order by department.name;

INSERT INTO employee (first_name, last_name, manager) VALUES (Micheal, Alig, Ashley_Rodriguez); 
INSERT INTO employee (first_name, last_name, role_id, manager) VALUES ('Amanda', 'OConner', 4, 'Ashley_Rodriguez')

DELETE FROM employee where first_name = Micheal AND last_name = Alig
