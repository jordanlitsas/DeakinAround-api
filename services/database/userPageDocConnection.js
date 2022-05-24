const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const userPages = mongoose.model('user_page', schemas.userPages);

const claimOwnership = async (user_id, page_id) => {
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
    return followingPages;
}

const followPage = async (user_id, page_id) => {
    let success = await userPages.findOneAndUpdate({user_id: user_id}, {$addToSet: {following: page_id}}, {new: true});
    return success;
}

const unfollowPage = async (user_id, page_id) => {
    try{
        let doc = await userPages.findOne({user_id: user_id});
        await doc.following.pull(page_id);
        await doc.save();
        return true;
    } catch{
        return false;
    }
   
}

module.exports = {
    createDoc,
    claimOwnership,
    getFollowingPages,
    followPage,
    unfollowPage
}