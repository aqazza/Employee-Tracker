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
// async function removeDepartment(){
//     try {
//         const {
//             id,
//         } = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'id',
//                 message: 'What is the department you would like to remove?',
//                 choices: departmentList.map((d) => {
//                     return {
//                       name: d.name,
//                       value: d.id,
//                     };
//                   }),
//                 },
//               ]);
//         await db.query(`DELETE FROM department WHERE id = "${id}"`)
//         const departmentList = await viewAllDepartments();
//         return departmentList
    
// }catch (err){
//     console.log (err)
// }
// }
module.exports = { viewAllDepartments, addDepartment }