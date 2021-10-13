const { User } = require("./models/user")
const { Session } = require("./models/session")

const initDB = async () => { 
    // create table
    User().sync({force: true})
    await Session().sync({force: true})
}


module.exports = {
    initDB
}