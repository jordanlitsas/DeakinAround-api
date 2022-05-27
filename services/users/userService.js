const userDbConnection = require('../database/userDocConnection');
const ObjectId = require('mongoose').Types.ObjectId;


const registerUser = async (userData) => {
    try{
        let user = await userDbConnection.registerUser(userData);
        return user;
    } catch{ return null; }
}

const getUserWithAuth = async (auth) => {
    try {
        let user = await userDbConnection.getUserWithAuth(auth);
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

const configUserAuth = async (user_id, auth) =>  {
    try{
        let success = await userDbConnection.configUserAuth(user_id, auth);
        return success;
    } 
    catch{ return null; }

}

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


module.exports = {
    registerUser,
    getUserWithAuth,
    validateUser,
    getUserWithUserId,
    configUserAuth
}