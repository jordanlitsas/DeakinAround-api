const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/pages/studentPagesController.js');

router.post('/', (req, res) => {
    Controller.createPage(req, res);
});




module.exports = router;