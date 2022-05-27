const { Timestamp } = require('mongodb');
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
    auth: {
        type: String,
        required: true,
    }
});

const userPages = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    following: {
        type: [String],
        required: false
    },
    owner: {
        type: [String],
        required: false
    }
});

const studentPage = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
studentPage.index({'$**': 'text'});

const contribution = new mongoose.Schema({
    authorFirstName: {type: String},
    authorLastName: {type: String},
    author_id: {type: String},
    content: {type: String},
    timePosted: {type: String},
    likes: {type: [String]}
});
const post = new mongoose.Schema({
    page_id: {type: String, required: true},
    topLevelPost: { type: contribution, required: true},
    comments: { type: [contribution ]}
});


module.exports = {user, studentPage, userPages, post, contribution}