const { prompt } = require("inquirer");
const db = require("./db/connection");
const departmentMethods = require("./db/departments");
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
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "View all departments":
      const data = await departmentMethods.viewAllDepartments();
      console.table(data);
      break;

    case "View all roles":
      const roles = await departmentMethods.viewAllRoles();
      console.table(roles);
      break;

    case "View all employees":
      const employees = await departmentMethods.viewAllEmployees();
      console.table(employees);
      break;

    case "Add a department":
      const AddDepartment = await departmentMethods.AddDepartment();
      console.table(AddDepartment);
      break;

    case "Add a role":
      const AddRole = await departmentMethods.AddRole();
      console.table(AddRole);
      break;

    case "Add an employee":
      const AddEmployee = await departmentMethods.AddEmployee();
      console.table(AddEmployee);
      break;

    case "Update an employee role":
      const UpdateEmployeeRole = await departmentMethods.UpdateEmployeeRole;
      console.table(UpdateEmployeeRole);
      break;

    case "Exit":
      const Exit = await departmentMethods.Exit;
      console.log("Take Care!");
      break;
  }
};
start();
