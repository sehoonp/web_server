const { where } = require("sequelize");
const md5 = require('md5');
const {sequelize, Sequelize, DataTypes} = require("./index");
const {User} = require('./user');
const {Session, hasSession} = require('./session');
const { time } = require("console");


const BankAccount = () => {
    return sequelize.define('bank_account', {
        bank_account_id : {
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
        },
        balance : {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        }
      }, {
        freezeTableName: true,
        timestamps: true
      });
}

const createBankAccount = async (userID) => {
    if (!userID) return false;
    const bankAccountTable = BankAccount();
    const afterCreate = await bankAccountTable.create({bank_account_id: generateBankID(), user_id:userID});
    return {
        success: afterCreate != null,
        data: afterCreate?.dataValues?.bank_account_id
    }
}

const addToBalance = async (sessionID) => {
    if (!sessionID) return false;
    const sessionTable = Session();
    // const userId = sessionTable.hasOne()
}

const generateBankID = () => {
    return md5(Date.now())
}

module.exports = {
    Session,
    createSession,
    hasSession, 
    deleteSession
}