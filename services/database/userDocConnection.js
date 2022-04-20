const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const userModel = mongoose.model('user', schemas.user);

const registerUser = async (userData) => {
    let user = new userModel(userData);
    let savedUser = await user.save();
    return savedUser;
}

const getUserWithEmail = async (email) => {
    let user = await userModel.findOne({email: email});
    return user;
}

const updateUserWithUserId = async (userId, userUpdate) => {
    let updatedUser = await userModel.findByIdAndUpdate({_id: userId}, userUpdate, {new: true});
    return updatedUser;
}

const deleteUserWithUserId = async (userId) => {
    let deletedUser = await userModel.deleteUserWithUserId(userId);
    return deletedUser;
}

module.exports = {
    registerUser,
    getUserWithEmail,
    updateUserWithUserId
}