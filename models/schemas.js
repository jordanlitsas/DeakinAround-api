const mongoose = require('mongoose');
const {Schema} = mongoose;

//TODO: encript password
const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = {user}