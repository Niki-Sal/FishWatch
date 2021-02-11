const express = require('express')
// const axios = require('axios');
const router = express.Router()

const db = require('../models')

router.get('/:id', (req, res) => {
    
    res.render('fish/newNutrition'); 
    
})


module.exports = router