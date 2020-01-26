var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeesDB"
})
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as Id ${connection.threadId}.`);
    startApp();
})
var employArray = []

function employeeArray() {
    connection.query("Select * FROM employee", function (err, result) {
        if (err) throw err;
        // console.log(result);
        for (let i = 0; i < result.length; i++) {

            employArray.push(result[i].first_name + " " + result[i].last_name)

        }
    })
}
employeeArray();

function startApp() {
    inquirer
        .prompt([
            {
                name: "toDo",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    "View All Employees",
                    "View All Employees By Department",
                    "View All Employees By Manager",
                    "Add Employee",
                    "Remove Employee",
                    "End"
                ]
            }
        ]).then(function (res) {
            console.log(res.toDo)
            switch (res.toDo) {
                case "View All Employees":
                    allEmployees();
                    break;
                case "View All Employees By Department":
                    allByDepartment();
                    break;
                case "View All Employees By Manager":
                    allByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "End":
                    connection.end();
                    break;
                default:
                    break;
            }




        })
}

function allEmployees() {
    connection.query("SELECT * FROM employee LEFT JOIN (department JOIN role) ON (employee.role_id = role.id AND role.department_id = department.id);", function (err, result) {
        if (err) throw err;

        const newArray = result.map(({ id, role_id, department_id, ...rest }) => rest)
        console.table(newArray)
        startApp();
    })
}

function allByDepartment() {
    connection.query("SELECT * FROM employee LEFT JOIN (department join role) on (role.id = employee.role_id AND role.department_id = department.id) order by department.name;", function (err, result) {
        if (err) throw err;

        const newArray = result.map(({ id, role_id, department_id, ...rest }) => rest)
        console.table(newArray)
        startApp();
    })
}

function allByManager() {
    connection.query("SELECT * FROM employee LEFT JOIN (department join role) on (role.id = employee.role_id AND role.department_id = department.id) order by employee.manager;", function (err, result) {
        if (err) throw err;
        console.table(result)

        const newArray = result.map(({ id, role_id, department_id, ...rest }) => rest)
        console.table(newArray)
        startApp();
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "First name of employee?",
                name: "first_name"
            },
            {
                type: "input",
                message: "Last name of employee?",
                name: "last_name"
            },
            {
                type: "list",
                message: "role of employee?",
                name: "role",
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"
                ]
            }


        ]).then(function ({ first_name, last_name, role, manager }) {
            switch (role) {
                case "Sales Lead":
                    var role = "1";
                    var manager = "Ashley Rodriguez"
                    break;
                case "Salesperson":
                    var role = "2";
                    var manager = "John Doe"
                    break;
                case "Lead Engineer":
                    var role = "3";
                    var manager = "null"
                    break;
                case "Software Engineer":
                    var role = "4";
                    var manager = "Ashley Rodriguez"
                    break;
                case "Accountant":
                    var role = "5";
                    var manager = "null"
                    break;
                case "Legal Team Lead":
                    var role = "6";
                    var manager = "null"
                    break;
                case "Lawyer":
                    var role = "7";
                    var manager = "Sarah Lourd"
                    break;
                default:
                    break;
            }
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager) VALUES ('${first_name}', '${last_name}', '${role}', '${manager}');`, function (err, result) {
                if (err) throw err;
                startApp();
            })
        });
}

function removeEmployee() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Please select an Employee",
                name: "employeeRemove",
                choices: employArray




            }).then(totalInfo => {
                var split = (totalInfo.employeeRemove).split(" ")
                connection.query(`DELETE FROM employee where first_name = "${split[0]}" AND last_name = "${split[1]}"`
                    , function (err, result) {
                        if (err) throw err;


                        startApp();
                    });
            })
}

