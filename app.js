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
// ARRAYS TO HOLD CONST VALUES
// ==================================================

let roleArr = [];
let managersArr = [];

// ==================================================
// BEGIN INQUIRER PROMPTS
// ==================================================
// runApp() returns inquirer prompts to ask what the user would like to do, and then runs functions based on user input
const runApp = () => {
  // first get all current roles
  getRoles();
  getManagers();
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
                // "View the total utilized budget of a department",
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

                // case "View the total utilized budget of a department":
                //   departmentBudget();
                //   break;

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
                // "Delete a role",
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
                  addRole();
                  break;

                // case "Delete a role":
                //   deleteRole();
                //   break;

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
                // "View employees by manager",
                // "Update employee managers",
                "Add an employee",
                "Update an employee's role",
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
                  viewEmplByRole();
                  break;

                // case "View employees by manager":
                //   viewEmplByManager();
                //   break;

                // case "Update employee managers":
                //   break;

                case "Add an employee":
                  addEmployee();
                  break;

                case "Update an employee's role":
                  updateEmployee();
                  break;

                // case "Delete an employee":
                //   break;

                case "Go back":
                  runApp();
                  break;
              }
            });

        case "End":
          return;
      }
    });
};

// ==================================================
// FUNCTIONS TO PULL/EDIT DATA FROM TABLES
// ==================================================

// ** Department functions **
const viewDepartments = () => {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
};

const addDepartment = () => {
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
};

const deleteDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "What is the department's name?",
          choices: function () {
            let departmentArr = [];
            for (var i = 0; i < res.length; i++) {
              departmentArr.push(res[i].name);
            }
            return departmentArr;
          },
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
            console.log(`\nDepartment deleted!\n`);
            runApp();
          }
        );
      });
  });
};

// function departmentBudget() {
//   inquirer
//     .prompt([
//       {
//         name: "name",
//         type: "input",
//         message: "What is the department's name?",
//         choices: departmentNames(),
//       },
//     ]).then((res) => {
//       connection.query(
//         "SELECT"
//       )
//     })
// }

// ** Role functions **
// view roles in a table
const viewRoles = () => {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
};
// push roles into the roleArr
const getRoles = () => {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
};

const addRole = () => {
  // prompt user to enter new role
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the role's department id?",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role SET ? ",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        (err) => {
          if (err) throw err;
          console.table(res);
          runApp();
        }
      );
    });
};

// const deleteRole = () => {
//   connection.query("SELECT * FROM role", (err, res) => {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "name",
//           type: "list",
//           message: "Please select a role to delete",
//           choices: function () {
//             let roleArr = [];
//             for (var i = 0; i < res.length; i++) {
//               roleArr.push(res[i].name);
//             }
//             return roleArr;
//           },
//         },
//       ])
//       .then((res) => {
//         connection.query(
//           "DELETE FROM role WHERE ? ",
//           {
//             name: res.name,
//           },
//           (err, res) => {
//             if (err) throw err;
//             console.log(`${res.name} deleted!`);
//             runApp();
//           }
//         );
//       });
//   });
// };

// ** Employee functions **
const viewEmployees = () => {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    runApp();
  });
};

const addEmployee = () => {
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
        choices: roleArr,
      },
      {
        name: "manager_choice",
        type: "list",
        message:
          "Who is the employees's manager? Keep blank if this employee is a manager.",
        choices: managersArr,
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee SET first_name=? last_name=? role_id=? manager_id=?;",
        // for roles and managers, we get the index value of their appropriate arr and add 1 to get the actual id number
        [res.first_name, res.last_name, roleArr.indexOf(res.role + 1), managersArr.indexOf(res.manager_choice + 1)],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          runApp();
        }
      );
    });
};

const getManagers = () => {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(`${res[i].first_name} ${res[i].last_name}`);
      }
    }
  );
};

const viewEmplByRole = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runApp();
    }
  );
};

// const viewEmplByManager = () => {
//   connection.query(
//     "SELET manager_id, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM  ",
//     (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       runApp();
//     }
//   );
// };

// for updateEmployee() we will modify viewEmplByRole()
const updateEmployee = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employee_choice",
            type: "list",
            message: "Which employee would you like to update?",
            choices: function () {
              let nameArr = [];
              for (var i = 0; i < res.length; i++) {
                nameArr.push(`${res[i].last_name}`);
              }
              return nameArr;
            },
          },
          {
            name: "role_id",
            type: "rawlist",
            message: "What is the employee's new title?",
            choices: function () {
              for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].Title);
              }
              return roleArr;
            },
          },
        ])
        .then((val) => {
          connection.query(
            // we need to join the string of val.role_id to the titles in the role db, getting the role unique id, 
            // and then returning that id to the employee db to update the employee's role
            // 
            // We should be able to do this by matching the string to the role title, grabbing the unique id, 
            // then pushing that to the employee db as the role value
            `UPDATE employee 
            SET role_id = (SELECT id FROM role WHERE title=? )
            WHERE last_name=?`,
            [val.role_id, val.employee_choice],
            (err, res) => {
              if (err) throw err;
              console.log("Employee updated!");
              runApp();
            }
          );
        });
    }
  );
};