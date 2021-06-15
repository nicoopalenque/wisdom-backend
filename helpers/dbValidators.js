const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) throw new Error(`Rol ${role} is not registed in DB`);
}

const validEmail = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) throw new Error(`Email ${email}, already exist`)
} 

const validUserById = async(id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) throw new Error(`ID ${id} dont exist`)
} 

module.exports = {
    validRole,
    validEmail,
    validUserById
}