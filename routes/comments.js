const express = require('express')
const router = express.Router({mergeParams:true});

router.get('/', (req,res) => {
    res.json({message:"COMMENTS Get ALL response"})
})

router.post('/', (req,res) => {
    res.json({message:"COMMENTS create response"})
})

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