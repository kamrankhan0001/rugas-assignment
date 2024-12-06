const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  laptopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laptop',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  cost: {
    type: Number,
    default: 0,
  },
  loggedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
