// orm'den gelen product nesnesini ProductORM diye adlandirip yeni bir Product sinifi yazarak 
// ara bir katman uygula controller ile orm modeli arasina ki daha sonra orm modelini degistirmek kolay olsun

const Sequelize = require('sequelize');
const sequelize = require("../utilities/database");

const { v4: uuidv4 } = require('uuid');

const Product = sequelize.define('Product', {
    uuid:{
        field: 'uuid',
        type: Sequelize.STRING,
        primaryKey: true,
    },
    categoryUuid:{
        field: 'category_uuid',
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        field: 'description',
        type: Sequelize.TEXT,
        allowNull: false,
    },
    price: {
        field: 'price',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        field: 'image',
        type: Sequelize.TEXT,
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
    tableName: 'products',
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

module.exports = Product;