const userDbConnection = require('../database/userDocConnection');

const registerUser = async (userData) => {
    try{
        let user = userDbConnection.registerUser(userData);
        return user;
    } catch{
        return null;
    }
}

module.exports = {
    registerUser
}