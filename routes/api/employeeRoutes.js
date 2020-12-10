const router = require('express').Router();
const { Employee, Role, Department } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeeData = await Employee.findAll();
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single Employee
router.get('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.params.id, {
      // JOIN with Employee, using the Role through table
        //   by doing this we can get the combined salary of all employees in a Employee
      include: [{ model: Employee, through: Role, as: 'Employee_budget' }]
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No Employee found with this id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a Employee
router.post('/', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body);
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a Employee
router.delete('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No Employee found with this id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
