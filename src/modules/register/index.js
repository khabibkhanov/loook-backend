const express = require('express')
const registerRouter = express.Router()
const { POST } = require('./controller.js')
const chechPermission = require('../../middlewares/chechPermission.js')

registerRouter.route('/api/register')
    .post(POST, chechPermission)

module.exports = registerRouter