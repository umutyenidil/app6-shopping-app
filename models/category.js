const { v4: uuidv4 } = require('uuid');

const categoryData = require('../data/category_data');
const connection = require('../utilities/database');

module.exports = class Category {
    static create({name, description}){
        const generatedUuid = uuidv4();

        return connection.execute('INSERT INTO categories (uuid, name, description, is_deleted) VALUES (?, ?, ?, ?)', [
            generatedUuid,
            name,
            description,
            0,
        ]);
    }

    static readByUuid(uuid){
        return connection.execute('SELECT * FROM categories WHERE categories.uuid=?', [uuid]);
    }

    static readAllCategories(){
        return connection.execute('SELECT * FROM categories WHERE categories.is_deleted=0');
    }

    static update({uuid, name, description}){
        const updateQuery = 'UPDATE categories SET categories.name=?, categories.description=? WHERE categories.uuid=?';

        return connection.execute(updateQuery ,[name, description, uuid]);
    }

    static deleteByUuid(uuid){
        const deleteQuery = 'UPDATE categories SET categories.is_deleted=1 WHERE categories.uuid=?';
        return connection.execute(deleteQuery ,[uuid]);
    }  
}