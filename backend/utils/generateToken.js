const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  // Payload: Data to embed in the token
  const payload = {
    id: userId,
    role: role,
  };

  // Token generation
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

module.exports = generateToken;
