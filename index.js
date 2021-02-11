
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const controllers = require('./controllers')

const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// app.get('/', (req, res) => {
//     let fishUrl = 'https://www.fishwatch.gov/api/species';
//     axios.get(fishUrl).then(function(apiResponse){
//         let fish = apiResponse.data;
//         console.log(fish)
//         res.render('index', {fish :fish}); 
//     })
// })
app.get('/', (req, res) => {
    res.send('Welcome to my App')
});

app.use('/fishes', controllers.fishes)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

