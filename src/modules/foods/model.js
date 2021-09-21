const fetchAll = () => {
    let foods = require('../../database/foods.json')
    return foods
}

module.exports = {
    fetchAll
}