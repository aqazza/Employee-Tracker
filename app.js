// ==================================================
// CREATE A CONNECTION
// ==================================================

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bPT#HrSYFtnR",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runApp();
});

// ==================================================
// FUNCTIONS TO PULL/EDIT DATA FROM TABLES
// ==================================================

// ** Department functions **
function viewDepartments() {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
}

// array push wasn't working on this function for some reason, so instead we'll just console.log the department names
function departmentNames() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(`\n${res[i].name}`);
    }
  });
}

function addDepartment() {
  // prompt user to enter new department info
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the department's name?",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        (err) => {
          if (err) throw err;
          console.table(res);
          runApp();
        }
      );
    });
}

function deleteDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the department's name?",
        choices: departmentNames(),
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM department WHERE ? ",
        {
          name: res.name,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`Department deleted!`);
          runApp();
        }
      );
    });
}

// ** Role functions **
function viewRoles() {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
}

// empty array to push roles into for addEmployee function
let roleArr = [];
function assignRole() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

// ** Employee functions **
function viewEmployees() {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
}

function addEmployee() {
  // prompt user to enter new employee info
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employees's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employees's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employees's role?",
        choices: assignRole(),
      },
      {
        name: "manager_choice",
        type: "list",
        message:
          "Who is the employees's manager? Keep blank if this employee is a manager.",
        choices: assignManager(),
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          runApp();
        }
      );
    });
}

// empty arr to push manager names into
let managersArr = [];
function assignManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(`${res[i].first_name} ${res[i].last_name}`);
      }
    }
  );
  return managersArr;
}
// ==================================================
// BEGIN WORKING CODE
// ==================================================
// runApp() returns inquirer prompts to ask what the user would like to do, and then runs functions based on user input
function runApp() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Department Options",
        "Role Options",
        "Employee Options",
        "End",
      ],
    })
    // ***** Department Options
    .then((answer) => {
      switch (answer.action) {
        case "Department Options":
          return inquirer
            .prompt({
              name: "department_options",
              type: "rawlist",
              message: "DEPARTMENTS:  What would you like to do?",
              choices: [
                "View all departments",
                "Add a department",
                "Delete a department",
                "View the total utilized budget of a department",
                "Go back",
              ],
              // *** department options logic
            })
            .then((answer) => {
              switch (answer.department_options) {
                case "View all departments":
                  viewDepartments();
                  break;

                case "Add a department":
                  addDepartment();
                  break;

                case "Delete a department":
                  deleteDepartment();
                  break;

                case "View the total utilized budget of a department":
                  break;

                case "Go back":
                  runApp();
                  break;
              }
            });

        // ***** Role Options
        case "Role Options":
          return inquirer
            .prompt({
              name: "role_options",
              type: "rawlist",
              message: "ROLES:  What would you like to do?",
              choices: [
                "View all roles",
                "Add a role",
                "Update a role",
                "Delete a role",
                "Go back",
              ],
              // *** role options logic
            })
            .then((answer) => {
              switch (answer.role_options) {
                case "View all roles":
                  viewRoles();
                  break;

                case "Add a role":
                  break;

                case "Update a role":
                  break;

                case "Delete a role":
                  break;

                case "Go back":
                  runApp();
                  break;
              }
            });

        // Employee Options
        case "Employee Options":
          return inquirer
            .prompt({
              name: "employee_options",
              type: "rawlist",
              message: "EMPLOYEES:  What would you like to do?",
              choices: [
                "View all employees",
                "View all employees by role",
                "View employees by manager",
                "Update employee managers",
                "Add an employee",
                "Update an employee",
                "Delete an employee",
                "Go back",
              ],
              // *** Employee options logic
            })
            .then((answer) => {
              switch (answer.employee_options) {
                case "View all employees":
                  viewEmployees();
                  break;

                case "View all employees by role":
                  break;

                case "View employees by manager":
                  break;

                case "Update employee managers":
                  break;

                case "Add an employee":
                  addEmployee();
                  break;

                case "Update an employee":
                  break;

                case "Delete an employee":
                  break;

                case "Go back":
                  runApp();
                  break;
              }
            });

        case "End":
          return;
      }
    });
}
