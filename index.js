// Defines a const mysql2 that requires mysql2
const mysql2 = require("mysql2");
// Defines a const inquirer that requires inquirer
const inquirer = require("inquirer");
// Defines a const consoleTable that requires console.table
const consoleTable = require("console.table");
// Requires the .env config
require("dotenv").config();
// Defines a const figlet which requires figlet
const figlet = require("figlet");
// Lets depts be equal to a blank array
let depts = [];
// Lets roles be equal to a blank array
let roles = [];
// Lets employees be equal to a blank array
let employees = [];
// Lets managers be equal to a blank array
let managers = [];

// Defines a var envaccess that uses mysql2 to create a connection
var envaccess = mysql2.createConnection({
    // Host is localhost
    host: "localhost",
    // Port is 3306
    port: 3306,
    // Database is the db_name in the env file
    database: process.env.DB_NAME,
    // User is the db_user in the env file
    user: process.env.DB_USER,
    //Password is the db_password in the env file
    password: process.env.DB_PASSWORD,
});

// Creates a figlet of Employee Manager
figlet('Employee\nManager', function(err, data) {
    // If there's an error return the console.log err of Something went wrong 
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    // Otherwise logs the figlet
    console.log(data)
});

// Uses envaccess to connect
envaccess.connect(function (err) {
    // Calls the init() function
    init();
});

// Defines a const userChoices that asks the user whether they want to view all employees, add employees, update employee roles, view all roles, add roles, view all departments, add departments, or quit
const userChoices = [
    {
        type: "list",
        name: "data",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Update Employee Manager",
            "View Employees By Manager",
            "View Employees By Department",
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "View Department Budget",
            "Quit",
        ],
    },
];

// Defines a function init
function init() {
    // Prompts the user with the userChoices and then takes the answer
    inquirer.prompt(userChoices).then((answer) => {
        // With the data from answer
        switch (answer.data) {
            // View all employees gives the viewAllEmployees() function
            case "View All Employees":
                viewAllEmployees();
                break;
                // Add Employee gives the addEmployee() function
            case "Add Employee":
                addEmployee();
                break;
                // Update Employee Role gives the updateEmployeeRole() function
            case "Update Employee Role":
                updateEmployeeRole();
                break;
                // View All Roles gives the viewAllRoles() function
            case "View All Roles":
                viewAllRoles();
                break;
                // Add Role gives the addRole() function
            case "Add Role":
                addRole();
                break;
                // View All Departments gives the viewAllDepartments() function
            case "View All Departments":
                viewAllDepartments();
                break;
                // Add Department gives the addDepartment() function
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Manager":
                updateEmployeeManager()
                break;
            case "View Employees By Manager":
                viewEmployeesByManager();
                break;
            case "View Employees By Department":
                viewEmployeesByDepartment();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View Department Budget":
                viewDepartmentBudget();
                break;
                // Quit ends the connection
            case "Quit":
                envaccess.end();
                break;
                // Default also ends the connection
            default:
                envaccess.end();
        }
    });
    // Calls the updateDepartments() function
updateDepartments();
// Calls the updateRoles() function
updateRoles();
// Calls the updateManagers() function
updateManagers();
}

// Defines a function updateDepartments()
function updateDepartments() {
    // Selects the department name from the department in the sql files
    envaccess.query(`SELECT department_name FROM department`, function (err, data) {
        // If there's an err throws an err
        if (err) throw err;
        // Depts is set to a blank array
        depts = [];
        // For loop that pushes any newly added department names to the departments array
        for (i = 0; i < data.length; i++) {
            depts.push(data[i].department_name);
        }
    });
}

// Defines a function updateRoles()
function updateRoles() {
    // Selects the title from role in the sql files
    envaccess.query(`SELECT title FROM role`, function (err, data) {
        // If there's an err throws an err
        if (err) throw err;
        // Roles is set to a blank array
        roles = [];
        // For loop that pushes any newly added role titles to the roles array
        for (i = 0; i < data.length; i++) {
            roles.push(data[i].title);
        }
    });
}

// Defines a function updateManagers()
function updateManagers() {
    // Selects the employee's last name from employees
    envaccess.query(`SELECT employee.last_name FROM employee`, function (err, data) {
        // If there's an err throws an err
        if (err) throw err;
        // Sets employees to a blank array
        employees = [];
        // For loop that pushes any newly added manager last names to the managers array
        for (i = 0; i < data.length; i++) {
            managers.push(data[i].last_name);
        }
    });
}

// Defines a function viewAllEmployees()
function viewAllEmployees() {
    // Grabs the employee id, first name, last name, the role title, the department name, the salary, and the manager
    envaccess.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.department_name AS department,role.salary,CONCAT(a.first_name, " ", a.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.role_id
    LEFT JOIN department ON role.department_id = department.department_id
    LEFT JOIN employee a ON a.employee_id = employee.manager_id`,
        function (err, data) {
            // If there's an err throw an err
            if (err) throw err;
        // Otherwise uses console.table to show the data
            console.table(data);
            // Calls the init() function
            init();
        });
}

// Defines a function addEmployee
function addEmployee() {
    // Selects all from from role
    envaccess.query("SELECT * FROM role", function (err, answer) {
        // If err throw err
        if (err) throw err;
        // Selects all from employeee
        envaccess.query("SELECT * FROM employee", function (err, userData) {
            // If err throw err
            if (err) throw err;
            // Prompts the user about the employee's first name, last name, role, and manager
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?",
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roles,
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managers,
                },
                // Then grabs that data
            ]).then(function (data) {
                // Defines roleID
                let roleID;
                // For loop that says if the answer title is the same as the data's role then the roleID is set equal to the users role_id
                for (let x = 0; x < answer.length; x++) {
                    if (answer[x].title == data.role) {
                        roleID = answer[x].role_id;
                    }
                }
                // Defines managerID
                let managerID;
                // For loop that says if the userData is the same as the data manager name then the managerID is set equal to the users employee_id
                for (let y = 0; y < userData.length; y++) {
                    if (userData[y].last_name == data.managerName) {
                        managerID = userData[y].employee_id;
                    }
                }
                // Insers the new employee's info into the employee set using the first name, last name, roleID, and the managerID
                envaccess.query("INSERT INTO employee SET ?",
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role_id: roleID,
                    manager_id: managerID,
                },
                function (err) {
                    // If there's an error throw an error
                    if (err) throw err;
                });
                // Calls the init() function
                init();
            });
        });
    });
}

// Defines a function updateEmployeeRole()
function updateEmployeeRole() {
    // Selects the concated employee first name and last name as the name from employee
    envaccess.query(
      `SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee`,
      function (err, data) {
          // If there's an err throws an err
        if (err) throw err;
        // Employees is set to a blank array
        employees = [];
        // For loop that pushes the name to the employees array
        for (i = 0; i < data.length; i++) {
          employees.push(data[i].Name);
        }
        // Selects all from role
        envaccess.query("SELECT * FROM role", function (err, answer) {
            // If err throws an err
          if (err) throw err;
          // Prompts the user by asking them which employee's role they want to update and what role they want to set it to 
          inquirer.prompt([
              {
                name: "updateEmployee",
                type: "list",
                message: "Which employee's role do you want to update?",
                choices: employees,
              },
              {
                name: "newRole",
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                choices: roles,
              },
            ])
            // Then it grabs the user's data
            .then(function (data) {
                // Defines roleId
              let roleID;
              // For loop that says if the answer title is equal to the data's newRole then the roleID is equal to the answers role_id
              for (let x = 0; x < answer.length; x++) {
                if (answer[x].title == data.newRole) {
                  roleID = answer[x].role_id;
                }
              }
              envaccess.query(
                  // Updates the employee with the user's inputted new role for that employee
                `UPDATE employee SET role_id = ? WHERE employee_id = (SELECT employee_id FROM(SELECT employee_id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS NAME)`,
                [roleID, data.updateEmployee],
                function (err) {
                    // If there's an err throw an err
                  if (err) throw err;
                }
              );
              // Calls the init() function
              init();
            });
        });
      }
    );
}

  // Defines a function viewAllRoles
function viewAllRoles() {
    // Selects all from role
    envaccess.query(`SELECT * FROM role`, function (err, data) {
        // If there's an err throws an err
        if (err) throw err;
        // Otherwise uses console.table to show the data
        console.table(data);
        // Calls the init() function
        init()
    });
}

// Defines a function addRole()
function addRole() {
    // Selects all from department
    envaccess.query("SELECT * FROM department", function (err, answer) {
        // If there's an err throws an err
        if (err) throw err;
        // Prompts the user asking what's the name of the role, what's the salary of the role, and what department it belongs to 
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?",
            },
            {
                name: "departmentName",
                type: "list",
                message: "Which department does the role belong to?",
                choices: depts,
            },
            // Then using the data
        ]).then(function (data) {
            // Defines deptID
            let deptID;
            // For loop that says if the answer of the department_name is the same as the data's departmentName then it sets the depID equal to the answer's department_id
            for (let x = 0; x < answer.length; x++) {
                if (answer[x].department_name == data.departmentName) {
                    deptID = answer[x].department_id;
                }
            }
            // Inserts into the role set the title, salary, and department id
            envaccess.query("INSERT INTO role SET ?",
            {
                title: data.title,
                salary: data.salary,
                department_id: deptID,
            },
            function (err) {
                // If there's an err throws an err
                if (err) throw err;
            });
            // Calls the init() function
            init();
        });
    });
}

// Defines a function viewAllDepartments()
function viewAllDepartments() {
    // Selects all from department
    envaccess.query(`SELECT * FROM department`, function (err, data) {
        // If there's an err throws an err
        if (err) throw err;
        // Otherwise uses console.table to show the data
        console.table(data);
        // Calls the init() function
        init();
    });
}

// Defines a function addDepartment()
function addDepartment() {
    // Prompts the user asking what the name of the department is
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department?",
        },
        // Then taking the data
    ]).then(function (data) {
        // It inserts that department name into the department set
        envaccess.query("INSERT INTO department SET ?",
        {
            department_name: data.department,
        },
        // If there's an err throws an err
        function (err) {
            if (err) throw err;
        });
        // Calls the init() function
        init();
    });
}

function updateEmployeeManager () {
    envaccess.query(`SELECT * FROM employee;`, (err, data) => {
          if (err) throw err;
          let employees = data.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
        inquirer.prompt([
            {
                name: "updatedEmployee",
                type: "list",
                message: "Which employee is getting a new manager?",
                choices: employees
            },
            {
                name: "newManager",
                type: "list",
                message: "Who should be the employee's new manager?",
                choices: employees
            },
        ]).then((answer) => {
            envaccess.query(`UPDATE employee SET ? WHERE ?`, 
            [
                {
                    manager_id: answer.newManager,
                },
                {
                    employee_id: answer.updatedEmployee,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                init();
            })
        })
    })
};

function viewEmployeesByManager () {
    envaccess.query(`SELECT employee_id, first_name, last_name FROM employee;`, (err, data) => {
        if (err) throw err;
        let managers = data.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
        inquirer.prompt([
            {
            name: "manager",
            type: "list",
            message: "Which manager would you like to see the employee's of?",
            choices: managers   
            },
        ]).then((response) => {
            envaccess.query(`SELECT e.first_name, e.last_name, e.employee_id, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id WHERE e.manager_id = ${response.manager};`, 
            (err, data) => {
                if (err) throw err;
                console.table(data);
                init();
            })
        })
    })
}

function viewEmployeesByDepartment() {
    envaccess.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, department.department_name FROM employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id = department.department_id ORDER BY employee.employee_id`, function (err, data) {
        if (err) throw err;
        console.table(data);
        init();
    });
}

function deleteDepartment() {
    envaccess.query(`SELECT * FROM department ORDER BY department_id ASC;`, (err, data) => {
        if (err) throw err;
        let departments = data.map(department => ({name: department.department_name, value: department.department_id}));
        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which department are you deleting?",
                choices: departments
            },
        ]).then((answer) => {
            envaccess.query(`DELETE FROM department WHERE ?`, [
                {
                    department_id: answer.department
                },
            ],
            (err, data) => {
                if (err) throw err;
                init();
            })
        })
    })
}

function deleteRole() {
    envaccess.query(`SELECT * FROM role ORDER BY role_id ASC;`, (err, data) => {
        if (err) throw err;
        let roles = data.map(role => ({name: role.title, value: role.role_id}));
        inquirer.prompt([
            {
                name: "role",
                type: "list",
                message: "Which role are you deleting?",
                choices: roles
            },
        ]).then((answer) => {
            envaccess.query(`DELETE FROM role WHERE ?`, [
                {
                    role_id: answer.role,
                },
            ], (err, data) => {
                if (err) throw err;
                init();
            })
        })
    })
}

function deleteEmployee() {
    envaccess.query(`SELECT * FROM employee ORDER BY employee_id ASC;`, (err, data) => {
        if (err) throw err;
        let employees = data.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee are you deleting?",
                choices: employees
            },
        ]).then((answer) => {
            envaccess.query(`DELETE FROM employee WHERE ?`, 
            [
                {
                    employee_id: answer.employee,
                },
            ],
            (err, data) => {
                if (err) throw err;
                init();
            })
        })
    })
}

function viewDepartmentBudget() {
    envaccess.query(`SELECT * FROM department ORDER BY department_id ASC;`, (err, data) => {
        if (err) throw err;
        let departments = data.map(department => ({name: department.department_name, value: department.department_id}));
        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which department would you like to view the salary of?",
                choices: departments
            },
        ]).then((answer) => {
            envaccess.query(`SELECT department_id, SUM(role.salary) AS total_salary FROM role WHERE ?`, [
                {
                    department_id: answer.department
                },
            ], (err, data) => {
                if (err) throw err;
                console.table(data);
                init();
            })
        })
    })
}
