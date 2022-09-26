const { response } = require('express');
const { decrypt } = require('../helpers/bcrypt');
const { generateAccessToken } = require('../helpers/jwt');
const User = require('../models/user');

const { saveUser, getUserByEmail } = require('../services/user');

const registerUser = async(req, res = response) => {
    
  const payload = req.body;
  
  const user = await saveUser(payload);

  res.json(user)
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  
  const isPassword = await decrypt(password, user.password)
  
  if (!isPassword) {
    res.status(400).json({
      message: 'invalid password'
    })
  } else {
    const token = await generateAccessToken({ email: user.email, dni: user.dni, type: user.typeUser })
    res.status(200).json({
      access_token: token
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
}