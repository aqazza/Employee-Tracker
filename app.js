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
// FUNCTIONS TO PULL DATA FROM TABLES
// ==================================================

// ** Console functions **
function viewDepartments() {
    connection.query(("SELECT * FROM department;"), (err, res) => {
      if (err) throw err;
      console.table(res);
      runApp();
    })
};

// ** Role functions **
function viewRoles() {
  connection.query(("SELECT * FROM role;"), (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  })
};

// ** Role functions **
function viewEmployees() {
  connection.query(("SELECT * FROM employee;"), (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  })
};

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
                  break;

                case "Delete a department":
                  break;

                case "View the total utilized budget of a department":
                  break;

                case "Go back":
                  runApp();
                  break;
              }
            });

        // ***** Department Options

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
              // *** role options logic
            })
            .then((answer) => {
              switch (answer.role_options) {
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
