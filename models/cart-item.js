const Sequelize = require('sequelize');
const sequelize = require("../utilities/database");

const { v4: uuidv4 } = require('uuid');

const CartItem = sequelize.define('CartItem', {
    uuid:{
        field: 'uuid',
        type: Sequelize.STRING,
        primaryKey: true,
    },
    cartUuid:{
        field: 'cart_uuid',
        type: Sequelize.STRING,
    },
    productUuid:{
        field: 'product_uuid',
        type: Sequelize.STRING,
    },
    quantity:{
        field: 'quantity',
        type: Sequelize.INTEGER,
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
    tableName: 'cart_items',
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

module.exports = CartItem;