// ==================================================
// CREATE A CONNECTION
// ==================================================

const mysql = require("mysql");
const inquirer = require("inquirer");

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
                "View a department",
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
                case "View a department":
                  break;
                    viewDepartment();
                case "View all departments":
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
                "View a role",
                "Add a role",
                "Delete a role",
                "Go back",
              ],
              // *** role options logic
            })
            .then((answer) => {
              switch (answer.role_options) {
                case "View a role":
                  break;

                case "View all roles":
                  break;

                case "Add a role":
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
                "View an employee",
                "View all employees",
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
                case "View an employee":
                  break;

                case "View all employees":
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
          break;
      }
    });
}

// viewDepartment() lets a user select which department they'd like to view, then displays that department
function viewDepartment() {
    return inquirer.prompt({
        name: "view_department",
        type: "input",
        message: "Please type the department name:",
        // TO DO: ADD A VAR THAT AUTO-INSERTS THE APPROPRIATE STRING FOR THE DEPARTMENT HEAD. WE WANT TO DO THIS BECAUSE USERS MAY ADD THEIR OWN DEPARTMENTS LATER
            if (answer.view_departments === )
    })
}
