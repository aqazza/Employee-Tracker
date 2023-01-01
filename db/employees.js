const db = require("./connection");
const inquirer = require("inquirer");
const { viewRoles } = require("./role");

async function viewAllEmployees() {
    try {
        const employees = 
await db.promise().query('SELECT * FROM employees')

return employees [0]
} catch (err) {
console.log(err)
    }
}

async function AddEmployee() {
    try {
        const roles = await viewRoles();
const { firstName, lastName, role } = await inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Please enter first name',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Please enter last name',
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select role',
        choices: roles.map((role) => {
            return {
              value: role.id,
              name: role.title,
            };
          }),
        },
      ]);
    
      await db.query(
        `INSERT into employee (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", "${role}")`
      );
      const newEmployees = await viewAllEmployees();
      return newEmployees;
    } catch (err) {
      console.log(err);
    }
  }
async function UpdateEmployeeRole() {
    try {
        const employees = await viewAllEmployees();
        const employeeRoles = await viewRoles();
        const { employee, newRole } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
            message: 'Whose role do you want to update?',
        choices: employee.map((employee) => {
            return {
                name: `${employee.firstName}, ${employee.lastName}`,
                value: employee.id
            };
        }),
    },
        {
            type: 'list',
            name: 'newRole',
            message: 'What role do you want to update it to?',
            choices: employeeRoles.map((role) => {
                            return {
                                name: role.title,
                                value: role.id
                            };
                        })
                    }
                ])
                await db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`);
        
                const updatedEmployeeRole = await viewAllEmployees();
                return updatedEmployeeRole;
            } catch (err){
                console.log(err)
            }
        }
        
module.exports = { viewAllEmployees, AddEmployee, UpdateEmployeeRole }