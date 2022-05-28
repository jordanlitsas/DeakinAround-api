const { response } = require('express');
const contributionBuilder = require('../../services/database/contributionBuilder');
const postCollection = require('../../services/database/postDocConnection');
const userCollection = require('../../services/database/userDocConnection');
const notificationService = require('../../services/users/notificationService')

const createPost = async (req, res) => {
    let data = req.body;
    if (Object.keys(data).length === 0){ res.status(400).send({error: "Empty request"}); }
    else {
        let userDoc = await userCollection.getUserWithUserId(data.user_id);
        let contribution = {
            authorFirstName: userDoc.firstName,
            authorLastName: userDoc.lastName,
            author_id: data.user_id,
            content: data.content,
            timePosted: data.timePosted,
            likes: []
        };
        let page_id = data.page_id;
        
        contribution = await contributionBuilder.build(contribution);
        postCollection.createPost(page_id, contribution).then(savedPost => {
            if (!savedPost){
                res.status(500).send({error: "Post not inserted"});
            } else {
                res.status(200).send();
            }
        });
    }

    
}

const getPostsWithPageId = async (req, res) => {
    let page_id = req.query.page_id;
    postCollection.getPostsWithPageId(page_id).then(postObjs => {
        if (Object.keys(postObjs).length === 0){
            res.status(204).send();
        } else {
            let response = [];
            postObjs.forEach(postObj => {
                let post = {
                    post_id: postObj._id,
                    original: {
                        name: `${postObj.topLevelPost.authorFirstName} ${postObj.topLevelPost.authorLastName}`,
                        content: postObj.topLevelPost.content,
                        timePosted: postObj.topLevelPost.timePosted,
                        likes: postObj.topLevelPost.likes.length
                    },
                    comments:[]
                };

                postObj.comments.forEach(commentObj => {
                    let comment = {
                        comment_id: commentObj._id.toString(),
                        name: `${commentObj.authorFirstName} ${commentObj.authorLastName}`,
                        content: commentObj.content,
                        timePosted: commentObj.timePosted,
                        likes: commentObj.likes.length
                    }
                    post.comments.push(comment);
                });
                response.push(post);
            });
            res.status(200).send(response);
        }
    })
}

const commentOnPost = async (req, res) => {
    let data = req.body;
    if (Object.keys(data).length === 0){ res.status(400).send({error: "Empty request"}); }
    else {
        let userDoc = await userCollection.getUserWithUserId(data.user_id);
        let contribution = {
            authorFirstName: userDoc.firstName,
            authorLastName: userDoc.lastName,
            author_id: data.user_id,
            content: data.content,
            timePosted: data.timePosted,
            likes: 0
        };
        let post_id = data.post_id;
        
        let target_id = await postCollection.getWithId(post_id);
        target_id = target_id.topLevelPost.author_id;

        console.log('target_id',target_id)

        let fcmTarget = await userCollection.getUserWithUserId(target_id);
        fcmTarget = fcmTarget.fcmToken;
        console.log('fcmTarget',fcmTarget)


        contribution = await contributionBuilder.build(contribution);
        postCollection.commentOnPost(post_id, contribution).then(success => {
            if (!success){
                res.status(500).send({error: "Post not inserted"});
            } else {
                notificationService.sendNotification(fcmTarget, `${userDoc.firstName} ${userDoc.lastName} commented on your post.`, data.content);
                res.status(200).send();
            }
        });
    }
}

const likePost = async (req, res) => {
    let post_id = req.body.post_id;
    let user_id = req.body.user_id;


    postCollection.likePost(post_id, user_id).then(success => {
        if (!success){
            res.status(400).send();
        } else if (success != null && Object.keys(success).length != 0){
            res.status(200).send();
        } else {
            res.status(500).send();
        }
    })
}

module.exports = {
    createPost,
    getPostsWithPageId,
    commentOnPost,
    likePost
}