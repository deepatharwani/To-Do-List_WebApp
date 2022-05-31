const jwt = require('jsonwebtoken');

const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

module.exports = {
  createAccessToken,
};


