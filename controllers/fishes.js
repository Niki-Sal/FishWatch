const express = require('express')
const axios = require('axios');
const router = express.Router()

const db = require('../models')


router.get('/', (req, res) => {
    let fishUrl = 'https://www.fishwatch.gov/api/species';
    axios.get(fishUrl).then(function(apiResponse){
        let fish = apiResponse.data;
        // console.log(fish)
        res.render('allFishes', {fish :fish}); 
    })
})

// router.get('/:param', (req, res)=> {
//   db.user.findOne({ 
//     where: {
//       name: req.params['Species Name']
//     },
//     include: [db.pet]
//   })
//   .then( user=> {
//     // we will get back a pets property
//     console.log(user.pets)
//     res.render('userShow', { user })
//   })
//   // we will show all the animals
//   // we will a have a form to make a new animal
// })


module.exports = router

