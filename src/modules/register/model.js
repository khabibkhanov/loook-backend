const register = () => {
    try {
		const { username, contact, password, isAdmin: is_admin } = req.body
		let users = fs.readFileSync(path.join('src', 'database', 'users.json'), 'utf8')
		users = users ? JSON.parse(users) : []
		let userId = users.length ? users[users.length - 1].user_id + 1 : 1
		let newUser = { 
			user_id: userId,
			username,
			password,
			contact,
			is_admin
		}
		users.push(newUser)
		fs.writeFileSync(path.join('src', 'database', 'users.json'), JSON.stringify(users, null, 4))
		delete newUser.password
		return res.status(201).json({ 
			message: "The user has been added!", 
			body: { userId: newUser.user_id, username: newUser.username }, 
			token: sign(newUser)
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
    register
}