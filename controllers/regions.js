const express = require('express')
// const axios = require('axios');
const router = express.Router()

const db = require('../models')

router.get('/', async(req, res)=> {
    const regions = await db.region.findAll()
    res.render('region/index', { regions })
  })

router.get('/:name', async(req, res)=> {
const region = await db.region.findOne({
    where: {
    name: req.params.name
    },
    include: [db.fish]
})
res.render('region/show', { region })
})


module.exports = router