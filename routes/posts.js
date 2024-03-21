const express = require('express')
const router = express.Router();
const commentsHandler = require('./comments')

router.use('/:postid/comments', commentsHandler)

router.get('/', (req,res) => {
    res.json({message:"POSTS get ALL response"})
})

router.post('/', (req,res) => {
    console.log(req)
    res.json({message:"POSTS create response"})
})

router.get('/:postid', (req,res) => {
    res.json({message:`POSTS get ${req.params.postid} reponse`})
})

router.put('/:postid', (req,res) => {
    res.json({message:`POSTS update ${req.params.postid} reponse`})
})

router.delete('/:postid', (req,res) => {
    res.json({message:`POSTS delete ${req.params.postid} reponse`})
})

module.exports = router