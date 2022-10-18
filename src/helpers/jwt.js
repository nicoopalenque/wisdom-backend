const jwt = require('jsonwebtoken');
const { decrypt } = require('./bcrypt');
const moment = require('moment');

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '28800s' });
}

const ensureAuth = async (req, res, next) => {
  if(!req.headers.authorization) return res.status(403).send({message: "Not authorized"});

  const token = req.headers.authorization.split(" ")[1];
  try{
    const payload = await decrypt(token, process.env.TOKEN_SECRET);
      if (payload.exp <= moment.unix()) {
        return res.status(401).send({message: 'Tu conexión ha expirado. Vuelve a hacer login.'});
      }
   }catch(e){
    return res.status(500).send({message: "Ha ocurrido un error: (ensureAuth) - " + e.message});
  }

  next();
}

module.exports = {
  generateAccessToken,
  ensureAuth
}