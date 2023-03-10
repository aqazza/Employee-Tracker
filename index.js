const { prompt } = require("inquirer");
const db = require("./db/connection");

const { viewAllDepartments, addDepartment } = require("./db/departments");
const { viewAllEmployees, AddEmployee, UpdateEmployeeRole } = require("./db/employees");
const { viewRoles, AddRole } = require("./db/role");
const start = async () => {
  console.log("Welcome to the Employee Manager!");
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        // "Delete a Department",
        // "Remove an Employee",
        // "Remove a Role",
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "View all departments":
      const data = await viewAllDepartments();
      console.table(data);
      break;

    case "View all roles":
      const roles = await viewRoles();
      console.table(roles);
      break;

    case "View all employees":
      const employees = await viewAllEmployees();
      console.table(employees);
      break;

    case "Add a department":
      const newDepartment = await addDepartment();
      console.table(newDepartment);
      break;

    case "Add a role":
      const newRole = await AddRole();
      console.table(newRole);
      break;

    case "Add an employee":
      const addEmployee = await AddEmployee();
      console.table(addEmployee);
      break;

    case "Update an employee role":
      const newEmployeeRole = await UpdateEmployeeRole();
      console.table(newEmployeeRole);
      break;

    // case "Remove an Employee":
    //   const removedEmployee = await removeEmployee();
    //   console.table(removedEmployee);
    //   break;
    // case "Delete a Department":
    //   const removedDepartment = await removeDepartment();
    //   console.table(removedDepartment);
    //   break;
    // case "Delete a Role":
    //   const removeRole = await removeRole();
    //   console.table(removeRole);
    //   break;

    case "Exit":
      console.log("Take Care!");
      process.exit();
  }
  start(false);
};
start(true);
