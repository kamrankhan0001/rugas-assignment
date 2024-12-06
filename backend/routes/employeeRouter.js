const express = require('express');
const {
  getAllEmployees,
  assignLaptop,
  getEmployeeLaptops,
} = require('../controllers/employeeController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all employees (Accessible by Admin)
router.get('/', authenticate, authorize(['admin']), getAllEmployees);

// Assign a laptop (Admin only)
router.post('/assign', authenticate, authorize(['admin']), assignLaptop);

// Fetch laptops assigned to an employee (Employee or Admin)
router.get('/:employeeId/laptops', authenticate, getEmployeeLaptops);

module.exports = router;
