const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const userModel = mongoose.model('user', schemas.user);

const registerUser = async (userData) => {
    let user = new userModel(userData);
    let savedUser = await user.save();
    return savedUser;
}

const getUserWithAuth = async (auth) => {
    console.log("db " + auth)
    let user = await userModel.findOne({auth: auth});
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

const getUserWithUserId = async(userId) => {
    let user = await userModel.findById(userId);
    return user;
}

const configUserAuth = async (user_id, auth) => {
    let success = await userModel.findOne({_id: user_id});
    success.auth = auth;
    success = await success.save();
    return success;
}

module.exports = {
    registerUser,
    getUserWithAuth,
    updateUserWithUserId,
    getUserWithUserId,
    configUserAuth
}