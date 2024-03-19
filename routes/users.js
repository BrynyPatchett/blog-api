const express = require('express')
const router = express.Router();

router.get('/', (req,res) => {
    res.json({message:"Users Get ALL response"})
})

router.post('/', (req,res) => {
    res.json({message:"Users create response"})
})

router.get('/:id', (req,res) => {
    res.json({message:`Users get ${req.params.id} reponse`})
})

router.put('/:id', (req,res) => {
    res.json({message:`Users update ${req.params.id} reponse`})
})

router.delete('/:id', (req,res) => {
    res.json({message:`Users delete ${req.params.id} reponse`})
})


module.exports = router