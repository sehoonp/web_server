const { where } = require("sequelize");
const md5 = require('md5');
const {sequelize, Sequelize, DataTypes} = require("./index")

const User = () => {
    return sequelize.define('user', {
        user_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password : {
            type: DataTypes.STRING
        }, 
        username : {
            type: DataTypes.STRING,
            unique: true
        }
      }, {
        freezeTableName: true,
        timestamps: true
      });
}

const createUser = async (username, password) => {
    if (!username || !password) return false;
  
    const userTable = User()
    // validate
    const exist = await userTable.findOne({where: {username: username}})
    if (exist != null) {
        return {
            success: true,
            data: null
        };
    }
  
    const pwHash = hashingPwd(password)
    const afterCreate = await User().create({username: username, password: pwHash})
    return {
        success: afterCreate != null,
        data: afterCreate
    }
}

const hasUser = async (username, password) => {
    if (!username || !password) return false;

    const userTable = User()
    const exist = await userTable.findOne({where: {username: username, password: hashingPwd(password)}})
    console.log("here",exist)
    return {
        success: exist != null,
        data: exist
    }
}

const hashingPwd = (pwd) => {
    return md5(pwd)
}

module.exports = {
    User,
    createUser,
    hasUser
}