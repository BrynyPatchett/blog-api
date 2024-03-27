const express = require('express')
const router = express.Router({mergeParams:true});
const commentController = require('../controllers/commentController')

router.get('/', commentController.get_post_comments)

router.post('/', commentController.post_create_comment)

router.get('/:commentid', commentController.get_comment)

router.put('/:commentid', commentController.put_update_comment);

router.delete('/:commentid', (req,res) => {
    res.json({message:`COMMENTS delete ${req.params.commentid} reponse`})
})


module.exports = router