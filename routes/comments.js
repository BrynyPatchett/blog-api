const express = require('express')
const router = express.Router({mergeParams:true});
const commentController = require('../controllers/commentController')

router.get('/', (req,res) => {
    
})

router.post('/', commentController.post_create_comment)

router.get('/:commentid', (req,res) => {
    res.json({message:`COMMENTS get ${req.params.postid} +  ${req.params.commentid} reponse`})
})

router.put('/:commentid', (req,res) => {
    res.json({message:`COMMENTS update ${req.params.commentid} reponse`})
})

router.delete('/:commentid', (req,res) => {
    res.json({message:`COMMENTS delete ${req.params.commentid} reponse`})
})


module.exports = router