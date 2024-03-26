const Comment = require ('../models/comment')
const Post = require('../models/post')
const { authenticateToken } = require("../util/auth");
const {body, validationResult} = require('express-validator') 
const asyncHandler = require("express-async-handler");






exports.post_create_comment = [
    authenticateToken,
    body("content").trim().isLength({ min: 1 }).escape().withMessage("Post content must be at least 5 characters"),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const post = await Post.findById(req.params.postid);
        if(post == null){
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