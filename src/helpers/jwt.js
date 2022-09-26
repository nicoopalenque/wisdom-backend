const jwt = require('jsonwebtoken');

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '28800s' });
}

module.exports = {
  generateAccessToken
}