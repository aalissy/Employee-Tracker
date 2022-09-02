USE employee_db;

-- Department inserts --
INSERT INTO department(department_id, department_name)
VALUES(1, "Sales");
INSERT INTO department(department_id, department_name)
VALUES(2, "Engineering");
INSERT INTO department(department_id, department_name)
VALUES(3, "Finance");
INSERT INTO department(department_id, department_name)
VALUES(4, "Legal");

-- Role inserts --
INSERT INTO role(role_id, title, department_id, salary)
VALUES(1, "Sales Lead", 1, 100000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(2, "Salesperson", 1, 80000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(3, "Lead Engineer", 2, 150000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(4, "Software Engineer", 2, 120000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(5, "Account Manager", 3, 160000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(6, "Accountant", 3, 125000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(7, "Legal Team Lead", 4, 250000);
INSERT INTO role(role_id, title, department_id, salary)
VALUES(8, "Lawyer", 4, 190000);

-- Employee inserts --
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(1, "John", "Doe", 1, null);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(2, "Mike", "Chan", 2, 1);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(3, "Ashley", "Rodriguez", 3, null);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(4, "Kevin", "Tupik", 4, 3);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(5, "Kunal", "Singh", 5, null);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(6, "Malia", "Brown", 6, 5);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(7, "Sarah", "Lourd", 7, null);
INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES(8, "Tom", "Allen", 8, 7);