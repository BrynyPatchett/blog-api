const express = require('express')
const router = express.Router();
const usersHandler = require('./users.js')
const postsHandler = require('./posts.js')

router.use('/users', usersHandler)
router.use('/posts', postsHandler)

module.exports = router;
