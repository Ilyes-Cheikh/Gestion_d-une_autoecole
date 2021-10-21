const express = require('express');
const router = express.Router();
const withAuth = require('./withAuth');



router.get('/', withAuth, function (req, res) {
    res.sendStatus(200);
});


module.exports = router