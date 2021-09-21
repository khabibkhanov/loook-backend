const postModel = require('./model.js')

const GET = (req, res) => {
    res.json( postModel.fetchAll() )
}

module.exports = {
    GET
}