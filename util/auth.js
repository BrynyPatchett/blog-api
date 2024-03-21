const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateToken(req,res,next){
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

module.exports = authenticateToken;