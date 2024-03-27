const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator')
const Post = require("../models/post")
const auth = require('../util/auth')


exports.get_posts =  asyncHandler(async (req, res) => {
        const allPosts = await Post.find().populate("author", "username").exec()
        return res.json(allPosts)
    }); 

exports.post_create_post = [
    auth.authenticateToken,
        body("title").trim().isLength({ min: 5, max: 100 }).escape().withMessage("Title must be at between 5 and 100 characters"),
        body("content").trim().isLength({ min: 1 }).escape().withMessage("Post content must be at least 5 characters"),
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
            }
            const newPost = new Post({
                title: req.body.title,
                content: req.body.content,
                author: req.user.sub
            })
            const post = await newPost.save();
            return res.status(201).location("/posts/" + post.id).json()
        })];

exports.get_post = (async (req, res) => {
        try {
            const post = await Post.findById(req.params.postid).populate("author", "username");
            if (post == null) {
                return res.sendStatus(404)
            }
            return res.json(post)
        }
        catch (err) {
            return res.sendStatus(404)
        }
    });

exports.put_update_post =[
     auth.authenticateToken,
    body("title").trim().isLength({ min: 5, max: 100 }).escape().withMessage("Title must be at between 5 and 100 characters"),
    body("content").trim().isLength({ min: 1 }).escape().withMessage("Post content must be at least 5 characters"),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const post = await Post.findById(req.params.postid)
        if(post == null){
            return res.sendStatus(404)
        }
        if(req.user.sub != post.author._id){
            return res.sendStatus(403)
        }
        const updatedPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: post.author._id,
            _id:post._id
        })
        const updated = await Post.findByIdAndUpdate(req.params.postid,updatedPost)
        return res.status(200).location("/posts/" + updatedPost.id).json()
    })
]

exports.delete_post = [
auth.authenticateToken,
auth.addPermmisions,
asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const post = await Post.findById(req.params.postid)
    if(req.user.sub != post.author._id && req.user.permissions != "Admin"){
        return res.sendStatus(403)
    }
    await Post.findByIdAndDelete(req.params.postid)
    return res.sendStatus(200)

})];






