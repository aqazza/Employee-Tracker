const db = require("./connection");
const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");

async function viewAllDepartments() {
    try {
        const departments = 
await db.promise().query('SELECT * FROM department')

return departments [0]
} catch (err) {
console.log(err)
    }
}
async function addDepartment(){
    try {
        // const departments = await viewAllDepartments();
        const {
            name,
        } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the department you would like to add?'
            }
        ])
        await db.query(`INSERT into department (name) VALUES ("${name}")`)
        const newDepartment = await viewAllDepartments();
        return newDepartment
    }catch (err){
        console.log (err)
}
}
async function removeDepartment(){
    try {
        // const viewAllDepartments = await viewAllDepartments()
        const {
            name,
        } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the department you would like to remove?',
                choices: ['techs', 'mechanics']
                // viewAllDepartments.map((departments) => {
                //     return departments.name
                    //{
                //                             name: departments.name,
                //                             value: departments.id
                // }
            // }),
        }
        ])
        await db.query(`DELETE FROM department WHERE name = "${name}"`)
        const departmentList = await viewAllDepartments();
        return departmentList
    
}catch (err){
    console.log (err)
}
}
module.exports = { viewAllDepartments, addDepartment, removeDepartment }