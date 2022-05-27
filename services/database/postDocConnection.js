const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const postModel = mongoose.model('post', schemas.post);

const createPost = async (page_id, contribution,) => {
    let postData = {page_id: page_id, topLevelPost: contribution, comments: []};
    let post = new postModel(postData);
    let savedPost = await post.save();
    return savedPost;
}

const getPostsWithPageId = async (page_id) => {
    let posts = await postModel.find({page_id: page_id});
    return posts;
}

const commentOnPost = async (post_id, contribution) => {
    let success = await postModel.findOneAndUpdate({post_id: post_id}, {$addToSet: {comments: contribution}});
    return success;
}

const likePost = async (post_id, user_id) => {
    let success = await postModel.findOne({post_id: post_id});
    success.topLevelPost.likes.push(user_id);
    success = await success.save();
    return success;
}

module.exports = {
    createPost,
    getPostsWithPageId,
    commentOnPost,
    likePost
}