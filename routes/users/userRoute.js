const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/users/userController');

router.post('/', (req, res) => {
    Controller.registerUser(req, res);
});

router.post('/auth', (req, res) => {
    Controller.loginUser(req, res);
})

router.get('/temp/:userId', (req, res) => {
    Controller.getUserWithUserId(req, res);
})

module.exports = router;