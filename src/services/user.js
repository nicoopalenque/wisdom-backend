const { encrypt } = require('../helpers/bcrypt');
const User = require('../models/user');

const getUser = async(limit, since, query) => {
  const [ count, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip(Number( since ))
        .limit(Number( limit ))
  ]);

  return {
    count,
    users
  }
};

const getUserById = async(id) => {
  const user = User.findById(id);
  return user;
}

const getUserByEmail = async(email) => {
  const user = await User.findOne({ email });
  return user;
}

const saveUser = async (payload) => {
  const {
    name, 
    lastName,
    email, 
    password, 
    birthDate, 
    dni, 
    level, 
    paymentType, 
    membresia, 
    lessons, 
    courses,
    masterClass,
    status = true,
    typeUser
  } = payload;

  const user = new User({
    name, 
    lastName,
    email, 
    password, 
    birthDate, 
    dni, 
    level, 
    paymentType, 
    membresia, 
    lessons, 
    courses,
    masterClass,
    status,
    typeUser
  });

  // Encrypt password
  
  user.password = await encrypt(password)

  // Save
  await user.save();

  return user
}

const updateUser = async (id, payload) => {
  const { _id, password, google, email, ...resto } = payload;

  if ( password ){
    resto.password = await encrypt(password) 
  }

  const user = await User.findByIdAndUpdate(id, resto);

  return user;
}

const deleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { status: false });
  return user;
}

module.exports = {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail
}