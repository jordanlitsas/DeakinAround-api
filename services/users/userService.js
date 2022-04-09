const userDbConnection = require('../database/userDocConnection');

const registerUser = async (userData) => {
    try{
        let user = await userDbConnection.registerUser(userData);
        return user;
    } catch{ return null; }
}

const getUserWithEmail = async (email) => {
    try {
        let user = await userDBConnection.getUserWithEmail(email);
        return user;
    }
    catch{ return null; }
}

module.exports = {
    registerUser,
    getUserWithEmail
}