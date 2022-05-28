const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/users/userController');

router.post('/', (req, res) => {
    Controller.registerUser(req, res);
});

router.post('/auth', (req, res) => {
    Controller.loginUser(req, res);
})

router.get('/', (req, res) => {
    Controller.getUserWithUserId(req, res);
})

router.put('/auth', (req, res) => {
    Controller.configUserAuth(req, res);
})

router.post('/notification/token', (req, res) => {
    Controller.addNotificationToken(req, res);
})

module.exports = router;