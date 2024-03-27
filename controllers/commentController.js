const Comment = require('../models/comment')
const Post = require('../models/post')
const { authenticateToken } = require("../util/auth");
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler");



exports.get_post_comments = asyncHandler(async (req, res) => {
    const allCommentsOnPost = await Comment.find({ "post": req.params.postid }).populate("user", "username").sort({ date: -1 })
    return res.json(allCommentsOnPost)
})


exports.post_create_comment = [
    authenticateToken,
    body("content").trim().isLength({ min: 1 }).escape().withMessage("Post content must be at least 5 characters"),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const post = await Post.findById(req.params.postid);
        if (post == null) {
            return res.sendStatus(404)
        }
        const newComment = new Comment({
            user: req.user.sub,
            post: req.params.postid,
            content: req.body.content
        })
        const comment = await newComment.save();
        return res.status(201).location("/posts/" + req.params.postid + "/comments/" + comment.id).json()
    })];

exports.get_comment = asyncHandler(async (req, res) => {
    try {
        const commentOnPost = await Comment.find({ "post": req.params.postid, "_id": req.params.commentid }).populate("user", "username").sort({ date: -1 }).exec()
        if (commentOnPost[0] == null) {
            return res.sendStatus(404)
        }
        return res.json(commentOnPost[0])
    } catch (err) {
        return res.sendStatus(404)
    }
})


exports.put_update_comment = [
    authenticateToken,
    body("content").trim().isLength({ min: 1 }).escape().withMessage("Post content must be at least 5 characters"),
    asyncHandler(async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        const commentResult = await Comment.find({ "post": req.params.postid, "_id": req.params.commentid })
        if(commentResult[0] == null){
            return res.sendStatus(404)
        }
        const comment = commentResult[0];
     
        if(req.user.sub != comment.user._id){
            return res.sendStatus(403)
        }
        
       const newComment = Comment({
        user:req.user.sub,
        content:req.body.content,
        post: comment.post._id,
        _id: comment._id
       })

       await Comment.findByIdAndUpdate(newComment._id,newComment);
       return res.status(200).location("/posts/" + req.params.postid + "/comments/" + newComment.id).json()
    })
]