const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
require("dotenv").config();



exports.authenticateToken = (req,res,next) => {
    //get auth token value
    const authHeader = req.headers['authorization']
    const token = authHeader  && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.JS_TOKEN_SECRET,(err,user) => {
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next();
    })
}
exports.addPermmisions = asyncHandler(async(req,res,next) => {
    //Check if user has provided a valid token
    if(!req.user){
        return res.sendStatus(403)
    }
    
    const user = await User.findById(req.user.sub);
    if(user == null){
        return res.sendStatus(401)
    }
    req.user.permissions = user.permissions;
    next();
})

//used to stop non admin users accessing a route
exports.adminAuthorization = ((req,res,next) => {
    //Check if user has provided a valid token
    if(!req.user || !req.user.permissions){
        return res.sendStatus(403)
    }
    if(req.user.permissions != 'Admin'){
        return res.sendStatus(403)
    }
    next();
})

exports.ownsResource = ((req, res,next) => {
    if(req.user.sub != req.params.id){
        return res.sendStatus(403)
    }
    next()
})


exports.ownsResourceOrAdmin = ((req, res,next) => {
    //if the user does not have the correct user id in its token , or is not a atmin 
    if(req.user.sub != req.params.id && req.user.permissions != 'Admin' ){
        return res.sendStatus(403)
    }
    next()
})