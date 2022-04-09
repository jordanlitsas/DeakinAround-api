const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const userModel = mongoose.model('user', schemas.user);

const registerUser = async (userData) => {
    let user = new userModel(userData);
    let savedUser = await user.save();
    return savedUser;
}

const getUserWithEmail = async (email) => {
    let user = userModel.findOne({email: email});
    return user;
}

module.exports = {
    registerUser,
    getUserWithEmail
}