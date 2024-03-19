const express = require('express')
const router = express.Router();

router.get('/', (req,res) => {
    res.json({message:"USERS Get ALL response"})
})

router.post('/', (req,res) => {
    res.json({message:"USERS create response"})
})

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