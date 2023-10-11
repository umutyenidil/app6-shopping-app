const connection = require('../utilities/database');
const { v4: uuidv4 } = require('uuid');

const productData = require('../data/product_data');

module.exports = class Product{
    static create({categoryUuid, name, description, price, image}){
        const createQuery = 'INSERT INTO products (uuid, category_uuid, name, description, price, image, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const generatedUuid = uuidv4();

        return connection.execute(createQuery, [
            generatedUuid,
            categoryUuid,
            name,
            description,
            price,
            image,
            0,
        ]);
    }

    static readByUuid(uuid){
        const readQuery = 'SELECT * FROM products WHERE products.uuid=?';

        return connection.execute(readQuery, [uuid]);
    }

    static readAllProducts(){
        const readQuery = 'SELECT * FROM products WHERE products.is_deleted=0';

        return connection.execute(readQuery);
    }

    static readAllProductsByCategoryUuid(categoryUuid){
        const readQuery = 'SELECT * FROM products WHERE products.category_uuid=?';

        return connection.execute(readQuery, [categoryUuid]);
    }

    static update({uuid, categoryUuid, name, description, price, image}){
        const updateQuery = 'UPDATE products SET category_uuid=?, products.name=?, products.description=?, products.price=?, products.image=? WHERE products.uuid=?';

        return connection.execute(updateQuery, [
            categoryUuid,
            name, 
            description,
            price,
            image,
            uuid,
        ]);
    }

    static deleteByUuid(uuid){
        const deleteQuery = 'UPDATE products SET products.is_deleted=1 WHERE uuid=?';

        return connection.execute(deleteQuery, [uuid]);
    }  
};