const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/pages/studentPagesController.js');

router.post('/', (req, res) => {
    Controller.createPage(req, res);
});

router.get('/', (req, res) => {
    Controller.getUserFollowedPage(req, res);
});

router.get('/id', (req, res) => {
    Controller.getPageWithId(req, res);
});

router.get('/following', (req, res) => {
    Controller.getFollowingPages(req, res);
})

router.post('/follow', (req, res) => {
    Controller.followPage(req, res);
})

router.get('/search', (req, res) => {
    Controller.getPagesWithTitleContaining(req, res);
})

router.get('/val', (req, res) => {
    Controller.getPageWithVal(req, res);
});

router.get('/is_following', (req, res) => {
    Controller.isUserFollowing(req, res);
})

module.exports = router;