const mongoose = require('mongoose');
const {Schema} = mongoose;

//TODO: encript password
const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const studentPage = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    }
});

module.exports = {user, studentPage}