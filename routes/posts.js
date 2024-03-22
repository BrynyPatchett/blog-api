const express = require('express')
const router = express.Router();
const commentsHandler = require('./comments');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator')
const Post = require("../models/post")
const auth = require('../util/auth')

router.use('/:postid/comments', commentsHandler)

router.get('/', (req,res) => {
    res.json({message:"POSTS get ALL response"})
})

router.post('/',auth.authenticateToken,
body("title").trim().isLength({min:5,max:100}).escape().withMessage("Title must be at between 5 and 100 characters"),
body("content").trim().isLength({min:1}).escape().withMessage("Post content must be at least 5 characters"),
asyncHandler(async(req,res) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json(errors.array())
}
console.log(req.user)
const newPost = new Post({
    title: req.body.title,
    content:req.body.content,
    author: req.user.sub
})
const post = await newPost.save();
return res.status(201).location("/posts/"+post.id).json()

}))

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