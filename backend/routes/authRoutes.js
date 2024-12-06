const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/issues', authenticate, async (req, res) => {
  const { laptopId, description, priority } = req.body;

  try {
    const newIssue = await Issue.create({
      laptopId,
      description,
      priority,
      reportedBy: req.user.id,
      reportedAt: new Date(),
      status: 'open',
    });

    res.status(201).json(newIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to report issue.' });
  }
});


router.post('/requests', authenticate, async (req, res) => {
  const { employeeId, laptopType, reason } = req.body;

  try {
    const newRequest = await LaptopRequest.create({
      employeeId,
      laptopType,
      reason,
      requestedAt: new Date(),
      status: 'pending',
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit laptop request.' });
  }
});


module.exports = router;
