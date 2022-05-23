const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const userPages = mongoose.model('user_page', schemas.userPages);

const claimOwnership = async (page_id, user_id) => {
    let success = await userPages.findOneAndUpdate({user_id: user_id}, {$addToSet: {owner: page_id}}, {new: true});
    return success;
}

const createDoc = async (user_id) => {
    let userPage = new userPages({user_id: user_id});
    userPage = await userPage.save();
    return userPage;
}

const getFollowingPages = async (user_id) => {
    let followingPages = await userPages.findOne({user_id: user_id});
    followingPages = followingPages.following;
    return followingPages;
}

const followPage = async (user_id, page_id) => {
    let success = await userPages.findOneAndUpdate({user_id: user_id}, {$addToSet: {following: page_id}}, {new: true});
    return success;
}

module.exports = {
    createDoc,
    claimOwnership,
    getFollowingPages,
    followPage
}