const express = require('express')
const axios = require('axios');
const router = express.Router()
const db = require('../models');
const methodOverride = require("method-override")
const layouts = require('express-ejs-layouts');
router.use(methodOverride("_method"))
router.use(express.urlencoded({ extended: false }));
router.use(layouts);


///GET all fishes from API
router.get('/', (req, res) => {
    let fishUrl = 'https://www.fishwatch.gov/api/species';
    axios.get(fishUrl).then(function(apiResponse){
        let fish = apiResponse.data;
        // console.log(fish)
        res.render('fish/allFishes', {fish :fish}); 
    })
})
//GET favorite page
router.get('/favorites',(req,res)=>{
  db.fish.findAll().then((fishes)=>{
    res.render('fish/favorite', {fishes})
  })
})
//Get each fish properties-beofre puting to favorite
router.get('/:name', (req,res)=>{
  ///the ones with space only works
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
    const fish = {
      name,
      harvest,
      image
    }
    console.log(fish)
    res.render('fish/clickName',{fish})
  })
})

////GET each fish in favorite page info
router.get('/favorite/:name', async(req,res)=>{
  try{
    const fish = await db.fish.findOne({
      where:{
        name: req.params.name
      },
      include: [db.nutrition, db.region]
    })
    console.log(fish)
    
    res.render('fish/moreInfo',{fish})
  } catch (err){
    console.log(err)
  }
  
})




///POST favorite fishes to database
router.post('/favorite/:name/:harvest', async(req, res)=>{
  try{
    const userInputName = req.params.name
    const userInputHarvest = req.params.harvest
    const response = await axios.get(`https://www.fishwatch.gov/api/species/${userInputName}`)
    let resp = response.data
    let respo = resp[0]
    let image = respo['Species Illustration Photo']['src']
   
    // const userInputUrl = req.params.url[0]
    console.log(userInputName)
    console.log(userInputHarvest)
    console.log(image)
    const favoriteFish = await db.fish.create({
      name: userInputName,
      harvest: userInputHarvest,
      img: image
    })
    // await regions.addFish(fish)
    res.redirect('/fishes')

  } catch (err){
    console.log(err)
  }
  
})
//POST region and nutrition to database
router.post('/favorite/:name', async(req, res)=>{
  try{
    let fishName = req.params.name
    const fish = await db.fish.findOne({where:{name: fishName}})
    const [region, wasCreated] = await db.region.findOrCreate({
    where:{
      name: req.body.region}
    })
    await fish.addRegion(region)
    
    const nutrition = await db.nutrition.create({ 
      name: req.body.nutrition,
      amount: req.body.amount
    })
    await fish.addNutrition(nutrition)
    res.redirect(`/fishes/favorite/${req.params.name}`)
    }
    catch(error){
      console.log(error)
    }
})
// //GET a page for editing nutrition
// router.get('/editNutrition/:fishId/:nutrition', async(req, res)=>{
//   try{
//     let nutrition = req.params.name
//     let fishId = req.params.fishId
//     const theFish = await db.fish.findOne({
//       where:{id: fishId},
//     })
//     const theNutrition = await db.nutrition.findOne({
//       where:{fishId: fishId, name: nutrition},
//     })

//     res.render('fish/edit',{theFish, theNutrition})
//   }catch (err){
//     console.log(err)
//   }
// })
// // //EDIT nutrition
// router.put ('/favorite/editNutrition/:fishId/:nutrition', async(req, res)=>{
//   try{
//     let name = req.body.name
//     let amount = req.body.amount
//     let fishId = req.params.fishId
//     const theFish = await db.fish.findOne({
//       where:{id: fishId},
//     })
//     const updatedNutrition = await db.nutrition.update(
//       {name: name, amount:amount},
//       {returning: true, where: {fishId: fishId}}
//     )
//     res.redirect(`/fishes/favorite/${theFish.name}`)
//   }catch (err){
//     console.log(err)
//   }
// })

//DELETE added nutrition 
router.delete('/favorite/:fishId/:nutrition', async(req, res)=>{
  try{
    let nutrition = req.params.nutrition
    let fishId = req.params.fishId
    const theFish = await db.fish.findOne({
      where:{id: fishId}
    })
    const theNutrition = await db.nutrition.destroy({
      where:{fishId: fishId, name: nutrition}
    }) 
    res.redirect(`/fishes/favorite/${theFish.name}`)
  }catch(err){
    console.log(err)
  }
})


module.exports = router

