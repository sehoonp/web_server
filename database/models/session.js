const { where } = require("sequelize");
const md5 = require('md5');
const {sequelize, Sequelize, DataTypes} = require("./index");
const {User} = require('./user');
const { time } = require("console");


const Session = () => {
    return sequelize.define('sessions', {
        session_id : {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        user_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User(),
                key: "user_id"
            }
        }
      }, {
        freezeTableName: true,
        timestamps: true
      });
}

const createSession = async (userID) => {
    if (!userID) return false;
    const sessionTable = Session();
    const afterCreate = await sessionTable.create({session_id: generateSessionID(), user_id:userID});
    return {
        success: afterCreate != null,
        data: afterCreate?.dataValues?.session_id
    }
}

const hasSession = async (sessionID) => {
    if (!sessionID) return false;
    const sessionTable = Session();
    const sessionFound = await sessionTable.findOne({where: {session_id: sessionID}});
    return {
        success: sessionFound != null,
        data: sessionFound
    }
}

const deleteSession = async (sessionID) => {
    if (!sessionID) return false;
    const sessionTable = Session();
    const result = await sessionTable.destroy({where: {session_id: sessionID}})
    return {
        success: result != null,
        data: result
    }
}

const generateSessionID = () => {
    return md5(Date.now())
}

module.exports = {
    Session,
    createSession,
    hasSession, 
    deleteSession
}