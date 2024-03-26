const express = require('express')
const router = express.Router();
const commentsHandler = require('./comments');
const postController = require ('../controllers/postController')

router.use('/:postid/comments', commentsHandler)

router.get('/', postController.get_posts);

router.post('/', postController.post_create_post)

router.get('/:postid', postController.get_post)

router.put('/:postid', postController.put_update_post);

router.delete('/:postid', postController.delete_post);

module.exports = router