const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const bcrypt = require("bcryptjs")
const User = require('../models/user')



router.get('/', (req,res) => {
    res.json({message:"USERS Get ALL response"})
})

//Create a user with a json post, run validation
router.post('/',
body("username").trim().isLength({min:5,max:18}).escape().withMessage("Username must be at between 5 and 18 characters").isAlphanumeric().withMessage("Username must contain only letters and numbers"),
body("password").trim().isLength({min:5}).escape().withMessage("Username must be at least 5 characters"),
body('confirmpassword').escape().custom((value, { req }) => {
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
        return res.status(201).location("/users"+user.id).json()
    })
}),

)

router.get('/:id', (req,res) => {
    res.json({message:`USERS get ${req.params.id} reponse`})
})

router.put('/:id', (req,res) => {
    res.json({message:`USERS update ${req.params.id} reponse`})
})

router.delete('/:id', (req,res) => {
    res.json({message:`USERS delete ${req.params.id} reponse`})
})


module.exports = router