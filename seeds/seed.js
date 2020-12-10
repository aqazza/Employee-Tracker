const sequelize = require('../config/connection');
const { Employee, Role, Department } = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentSeedData);

  const roles = await Roles.bulkCreate(roleSeedData);

  const employees = await Employees.bulkCreate(employeeSeedData)

  process.exit(0);
};

seedDatabase();
