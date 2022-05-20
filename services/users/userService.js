const userDbConnection = require('../database/userDocConnection');
const ObjectId = require('mongoose').Types.ObjectId;


const registerUser = async (userData) => {
    try{
        let user = await userDbConnection.registerUser(userData);
        return user;
    } catch{ return null; }
}

const getUserWithEmail = async (email) => {
    try {
        let user = await userDbConnection.getUserWithEmail(email);
        return user;
    }
    catch{ return null; }
}

const getUserWithUserId = async (userId) => {
    try {
        let user = await userDbConnection.getUserWithUserId(userId);
        return user;
    }
    catch { return null; }
}

// const updateUserWithUserId = async (userId, userUpdate) => {
//     try {
//         let updatedUser = await userDbConnection.updatedUserWithUserId(userId, userUpdate);
//         return updatedUser;
//     }
//     catch{ return null; }
// }

const validateUser = async (userId) => {
    let validUserId = ObjectId.isValid(userId);
    if (validUserId){
        let user = await getUserWithUserId(userId);
        if (!user){
            return "userId is not associated with a user."
        }
    } else {
        return "Invalid ObjectId structure."
    }
    return true;
}

// const deleteUserWithUserId = (userId) => {
//     try {

//         let deletedUser = await userDbConnection.deleteUserWithUserId(userId);
//         return deletedUser;
//     }
//     catch { return null; }
// }

module.exports = {
    registerUser,
    getUserWithEmail,
    validateUser,
    getUserWithUserId
    // updateUserWithUserId,
    // deleteUserWithUserId
}