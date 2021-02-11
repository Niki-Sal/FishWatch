
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
app.use(express.static(__dirname + '/public/'));


app.get('/', (req, res) => {
    res.render('index')
});

app.use('/fishes', controllers.fishes)
app.use('/nutrition', controllers.nutrition)
app.use('/region', controllers.region)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

