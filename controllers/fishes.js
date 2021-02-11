const express = require('express')
const axios = require('axios');
const router = express.Router()

const db = require('../models')


router.get('/', (req, res) => {
    let fishUrl = 'https://www.fishwatch.gov/api/species';
    axios.get(fishUrl).then(function(apiResponse){
        let fish = apiResponse.data;
        // console.log(fish)
        res.render('fish/allFishes', {fish :fish}); 
    })
})

router.get('/favorites',(req,res)=>{
  db.fish.findAll().then((fishes)=>{
    res.render('fish/favorite', {fishes})
  })
})
router.get('/:name', (req,res)=>{
  let fishName = req.params.name.replace(' ','-')
  console.log(fishName)
  axios.get(`https://www.fishwatch.gov/api/species/${fishName}`)
  
  .then((response)=>{
    console.log(response.data)
    let resp = response.data
    let respo = resp[0]
    console.log(respo)
    let name = respo['Species Name']
    let harvest = respo['Harvest Type']
    let image = respo['Species Illustration Photo']['src']
    ////
    const chosenFish = {
      name,
      harvest,
      image
    }
    console.log(chosenFish)
    res.render('fish/moreInfo',{chosenFish})
  })
})

//////////////newNutrition

router.post('/favorite/:name', (req, res)=>{
  const userInput = req.params.name
  console.log(userInput)
  db.fish.create({
    name: userInput
  })
  res.redirect('/fishes')
})


module.exports = router

