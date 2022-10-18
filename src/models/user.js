const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
        type: String,
        required: [true, 'Name is required']
    },
	lastName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    birthDate: {
        type: String,
        required: [true, 'Birth Date is required']
    },
    dni: {
        type: String,
        required: [true, 'DNI is required'],
        unique: true,
    },
    level: {
        type: String,
        required: false
    },
    typeUser: {
        type: String,
        required: [true, 'type user is required'],
    },
    paymentType: {
        type: String,
        required: false,
    },
    membresia: {
        type: String,
        required: false,
    },
    lessons: { 
        type : Array , 
        default: [] 
    },
    courses: {
        type: Array,
        default: []
    },
    masterClass: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );