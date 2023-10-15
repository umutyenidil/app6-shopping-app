const Sequelize = require('sequelize');
const sequelize = require("../utilities/database");

const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
    uuid:{
        field: 'uuid',
        type: Sequelize.STRING,
        primaryKey: true,
    },
    emailAddress:{
        field: 'email_address',
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        field: 'password',
        type: Sequelize.STRING,
        allowNull: false,
    },
    isDeleted: {
        field: 'is_deleted',
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: true
    },
    deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
        allowNull: true,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: true,
    },
}, 
{
    tableName: 'users',
    timestamps: false,
    hooks:{
        beforeCreate: (record, options)=>{
            record.dataValues.uuid = uuidv4();
            record.dataValues.isDeleted = 0;
            record.dataValues.createdAt = sequelize.fn('NOW');
            record.dataValues.updatedAt = sequelize.fn('NOW');
        },
        beforeUpdate: (record, options)=>{
            record.dataValues.updatedAt = sequelize.fn('NOW');
        }
    }
});

module.exports = User;