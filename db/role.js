const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewRoles() {
  try {
    const role = await db.query(
      `SELECT role.title, role.id, department.name AS deparment FROM role LEFT JOIN department ON role.department_id = department.id`
    );
    return role;
  } catch (error) {
    console.log(error);
  }
}

async function AddRole() {
  try {
    const department = await viewAllDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department",
        choices: department_id.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the role",
      },
    ]);

    await db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
    );
    const newRole = await viewRoles();

    return newRole;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { viewRoles, AddRole };
