const fetchAll = () => {
    let users = require('../../database/users.json')
    return users
}

module.exports = {
    fetchAll
}