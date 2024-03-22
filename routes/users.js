const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const auth = require('../util/auth')
require("dotenv").config();

const JS_TOKEN_SECRET = process.env.JS_TOKEN_SECRET;


//Needs to have a admin check on it 
router.get('/',auth.authenticateToken,auth.addPermmisions,auth.adminAuthorization,asyncHandler(async (req,res) => {
    const users = await User.find({},'username permissions').exec();
   return res.json(users)
}))

//Create a user with a json post, run validation
router.post('/',
body("username").trim().isLength({min:5,max:18}).escape().withMessage("Username must be at between 5 and 18 characters").isAlphanumeric().withMessage("Username must contain only letters and numbers"),
body("password").trim().isLength({min:5}).escape().withMessage("Password must be at least 5 characters"),
body("confirmpassword").custom((value, { req }) => {
    return value === req.body.password;
}).withMessage("Confirmation Password must match")
, asyncHandler(async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    const exists = await User.findOne({username:req.body.username});
    if(exists != null){
        return res.status(400).json([{msg:"user already exists"}])
    }
    bcrypt.hash(req.body.password,10, async(err,hashedPassword) => {
        if(err){
            return res.status(400).json([{msg:err}])
        }
        const newUser = new User({
            username:req.body.username,
            password:hashedPassword,
        })
        const user = await newUser.save();
        return res.status(201).location("/users/"+user.id).json()
    })
}),
)

router.post('/login',
body("username").trim().isLength({min:5,max:18}).escape().withMessage("Username must be at between 5 and 18 characters").isAlphanumeric().withMessage("Username must contain only letters and numbers"),
body("password").trim().isLength({min:5}).escape().withMessage("Password must be at least 5 characters")
,asyncHandler(async (req,res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array())
    }
    const user = await User.findOne({username:req.body.username});
    if(user == null){
        return res.status(401).json([{msg:"User not found"}])
    }
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(422).json([{msg:"Incorrect password"}])
    }
    const accessToken = jwt.sign({sub:user.id,name:user.username, expiresIn: 3600000},JS_TOKEN_SECRET);
    res.json({token: accessToken})
}))

router.get('/:id',asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id,'username');
    if(user == null){
        return res.sendStatus(401).json([{msg:"User not found"}])
    }
   return res.json(user);
}))

router.put('/:id', (req,res) => {
    res.json({message:`USERS update ${req.params.id} reponse`})
})

router.delete('/:id', (req,res) => {
    res.json({message:`USERS delete ${req.params.id} reponse`})
})


module.exports = router