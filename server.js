const express = require('express')
const { sign, verify } = require('./src/lib/jwt.js')
const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 4500
const app = express()

// middleware
app.use( express.json() )
app.use( express.static(path.join(__dirname, 'assets')) )
app.use( function (req, res, next)  {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	next()
})


const userRouter = require('./src/modules/users')
const foodRouter = require('./src/modules/foods')
const registerRouter = require('./src/modules/register')

app.use( userRouter )
app.use( foodRouter )
app.use( registerRouter )


app.post('/api/login', (req, res) => {
	try {
		const { username, password } = req.body
		let users = fs.readFileSync(path.join('database', 'users.json'), 'utf8')
		users = users ? JSON.parse(users) : []
		let user = users.find( user => user.username == username && user.password == password)
		if(user) {
			delete user.password
			res.status(200).json({ 
				message: "The user has been logged in!", 
				body: { userId: user.user_id, username: user.username }, 
				token: sign(user)
			})
		} else throw 'Wrong username or password!'
	} catch (error) {
		res.status(400).json({ message: error })
	}
})

// foods API


// orders API
app.get('/api/orders', (req, res) => {
	const { userId } = req.query
	let orders = require('./database/orders.json')
	let foods = require('./database/foods.json')
	orders = orders.map( order => {
		order.food = foods.find(food => food.food_id == order.food_id)
		return order
	})
	if(userId) {
		return res.json(orders.filter(order => order.user_id == userId))
	} else {
		return res.json( orders )
	}
})


app.get('/api/orders/:orderId', (req, res) => {
	const { orderId } = req.params
	let orders = require('./database/orders.json')
	let order = orders.find(order => order.order_id == orderId)
	if(order) {
		return res.json(order)
	} else return res.status(404).json({ message: "The order not found!" })
})


app.post('/api/orders', (req, res) => {
	try {
		const { userId, foodId, count } = req.body
		let orders = fs.readFileSync(path.join('database', 'orders.json'), 'utf8')
		orders = orders ? JSON.parse(orders) : []
		let newOrder = orders.find( order => order.food_id == foodId && order.user_id == userId)
		if(newOrder) {
			newOrder.count = +count + +newOrder.count
		} else {
			let orderId = orders.length ? orders[orders.length - 1].order_id + 1 : 1
			newOrder = { 
				order_id: orderId,
				food_id: foodId,
				user_id: userId,
				count
			}
			orders.push(newOrder)
		}
		fs.writeFileSync(path.join('database', 'orders.json'), JSON.stringify(orders, null, 4))
		res.status(201).json({ message: "The order has been added!", body: newOrder })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})


app.listen(PORT, () => console.log('Server is running on http://' + host + ':' + PORT))
