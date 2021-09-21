const express = require('express')
const { GET } = require('./controller')
const foodRouter = express.Router()

foodRouter.route('/api/foods')
    .get(GET)

module.exports = foodRouter