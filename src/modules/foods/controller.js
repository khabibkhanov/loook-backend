const foodModel = require('./model.js')

const GET =  (req, res) => {
	res.json( foodModel.fetchAll() )
}  

module.exports = {
    GET
}
