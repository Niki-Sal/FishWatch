
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const controllers = require('./controllers')
const db = require('./models');


const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public/'));


app.get('/', (req, res) => {
    res.render('index')
});

app.use('/fishes', controllers.fishes)
app.use('/regions', controllers.regions)

//GET a page for editing nutrition
app.get('/editNutrition/:fishId/:nutrition', async(req, res)=>{
    try{
      let nutrition = req.params.nutrition
      let fishId = req.params.fishId
      const theFish = await db.fish.findOne({
        where:{id: fishId},
      })
      const theNutrition = await db.nutrition.findOne({
        where:{fishId: fishId, name: nutrition},
      })
  
      res.render('fish/edit',{theFish, theNutrition})
    }catch (err){
      console.log(err)
    }
  })
  // //EDIT nutrition
  app.put ('/editNutrition/:fishId/:nutrition', async(req, res)=>{
    try{
      let name = req.body.name
      let amount = parseInt(req.body.amount)
      let fishId = req.params.fishId
      let nutrition = req.params.nutrition
      const theFish = await db.fish.findOne({
        where:{id: fishId},
      })
      const updatedNutrition = await db.nutrition.update(
        {name: name, amount: amount},
        {returning: true, where: {fishId: fishId, name: nutrition}}
      )
      res.redirect(`/fishes/favorite/${theFish.name}`)
    }catch (err){
      console.log(err)
    }
  })

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

