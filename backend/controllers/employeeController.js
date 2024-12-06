const Employee = require('../models/Employee');
const Assignment = require('../models/Assignment');
const Laptop = require('../models/Laptop');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error while fetching employees.' });
  }
};

// Assign a laptop to an employee
exports.assignLaptop = async (req, res) => {
  try {
    const { laptopId, employeeId } = req.body;

    // Check if laptop exists and is available
    const laptop = await Laptop.findById(laptopId);
    if (!laptop || laptop.status !== 'available') {
      return res.status(400).json({ message: 'Laptop is not available for assignment.' });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Create an assignment
    const assignment = new Assignment({
      laptopId,
      employeeId,
      assignedAt: new Date(),
    });
    await assignment.save();

    // Update laptop status
    laptop.status = 'assigned';
    await laptop.save();

    res.status(200).json({ message: 'Laptop assigned successfully!', assignment });
  } catch (error) {
    console.error('Error assigning laptop:', error);
    res.status(500).json({ message: 'Server error while assigning laptop.' });
  }
};

// Fetch laptops assigned to an employee
exports.getEmployeeLaptops = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Get assignments for the employee
    const assignments = await Assignment.find({ employeeId }).populate('laptopId');
    const laptops = assignments.map((assignment) => assignment.laptopId);

    res.status(200).json(laptops);
  } catch (error) {
    console.error('Error fetching employee laptops:', error);
    res.status(500).json({ message: 'Server error while fetching employee laptops.' });
  }
};
