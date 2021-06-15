const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const userGet = async(req, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    const query = { status: true };

    const [ count, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number( since ))
            .limit(Number( limit ))
    ]);

    res.json({
        count,
        users
    })
}

const userPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO Validate
    if ( password ){
       // Encrypt password
       const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync( password, salt ); 
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user)
}

const userPost = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save
    await user.save();

    res.json({
        user
    })
}

const userDelete = async(req, res = response) => {

    const { id } = req.params
    
    // Physical Delete
    // const user = await User.findByIdAndDelete(id);

    // Logical erase
    const user = await User.findByIdAndUpdate(id, { status: false });
    res.json(user);

}

const userPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controller"
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}