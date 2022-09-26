const { response } = require('express');

const { saveUser, getUser, updateUser, deleteUser, getUserById } = require('../services/user');

const userGet = async(req, res = response) => {

    const { limit = 5, since = 0, status = true } = req.query;
    const query = { status };

    const user = await getUser(limit, since, query);

    res.json(user)
}

const userById = async (req, res = response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    
    res.json(user);
}

const userPut = async(req, res = response) => {

    const { id } = req.params;
    const payload = req.body;
    
    const user = await updateUser(id, payload)

    res.json(user)
}

const userPost = async(req, res = response) => {
    
    const payload = req.body;
    
    const user = await saveUser(payload);

    res.json(user)
}

const userDelete = async(req, res = response) => {

    const { id } = req.params
    
    // Physical Delete
    // const user = await User.findByIdAndDelete(id);
    
    const user = await deleteUser(id);
    // Logical erase
    res.json(user);

}

module.exports = {
    userGet,
    userById,
    userPut,
    userPost,
    userDelete,
}