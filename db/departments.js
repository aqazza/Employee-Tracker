const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllDepartments() {
    try {
        const departments = 
await db.promise().query('SELECT * FROM department')

return departments [0]
} catch (err) {
console.log(err)
    }
}


module.exports = { viewAllDepartments }