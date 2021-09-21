function chechPermission (req, res, next) {
	try {
		const { token } = req.headers
		const payload = verify(token)
		if(payload.is_admin) {
			next()	
		} res.status(405).json({ message: "You are not allowed!" })
	} catch (error) {
		res.status(405).json({ message: error })
	}
}

module.exports = chechPermission