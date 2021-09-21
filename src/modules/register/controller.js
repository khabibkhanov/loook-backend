const registerModel = require('./model.js')
const POST = (req, res) => {
    let users = registerModel.register(req.body)
    
    return users
}

module.exports = {
    POST
}