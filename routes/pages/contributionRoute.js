const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/pages/contributionController');

router.post('/post', (req, res) => {
    Controller.createPost(req, res);
});

router.get('/post', (req, res) => {
    Controller.getPostsWithPageId(req, res);
});

router.get('/post/like', (req, res) => {
    Controller.likePost(req, res);
});


router.post('/comment', (req, res) => {
    Controller.commentOnPost(req, res);
})

module.exports = router;