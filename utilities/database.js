const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 't123456',
    database: 'nodejs_shopping_app',

});

module.exports = connection.promise();