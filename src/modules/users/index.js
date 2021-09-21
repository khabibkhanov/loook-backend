const express = require('express')
const { GET } = require('./controller.js')

const userRouter = express.Router()
userRouter.route('/api/users')
	.get(GET)

module.exports = userRouter