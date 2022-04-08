const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/users/userController');

router.post('/', (req, res) => {
    Controller.registerUser(req, res);

});

module.exports = router;