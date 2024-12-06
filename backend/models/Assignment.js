const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  laptopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laptop',
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
