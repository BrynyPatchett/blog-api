const express = require('express')
const router = express.Router();
const usersHandler = require('./users.js')

router.use('/users', usersHandler)

module.exports = router;
