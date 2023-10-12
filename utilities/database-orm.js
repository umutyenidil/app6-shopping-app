const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_shopping_app', 'root', 't123456', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;