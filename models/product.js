const connection = require('../utilities/database');
const { v4: uuidv4 } = require('uuid');

const productData = require('../data/product_data');

module.exports = class Product{
    constructor ({uuid=null, name, categoryUuid, description, price, image}){
        this.uuid = uuid ?? uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.categoryUuid = categoryUuid;
    }

    save(){
        return connection.execute('INSERT INTO products (uuid, category_uuid, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)', [
            this.uuid,
            this.categoryUuid,
            this.name,
            this.description,
            this.price,
            this.image
        ]);
    }

    update({name, categoryUuid, description, price, image}){
        const updateQuery = 'UPDATE products SET products.category_uuid=?, products.name=?, products.description=?, products.price=?, products.image=? WHERE products.uuid=?';
        return connection.execute(updateQuery, [
            categoryUuid,
            name,
            description,
            price,
            image,
            this.uuid,
        ]);
    }

    static getAllProducts(){
        return connection.execute('SELECT * FROM products');
    }

    static getProductByUuid(uuid){
        return connection.execute('SELECT * FROM products WHERE uuid=?', [uuid]);
    }

    static getProductsByCategoryUuid(uuid){
        return productData.productList.filter(item => item.categoryUuid === uuid);
    }

    static deleteProductByUuid(uuid){
        return connection.execute('DELETE FROM products WHERE products.uuid=?',[uuid]);
        const index = productData.productList.findIndex(item => item.uuid === uuid);

        productData.productList.splice(index, 1);
    }
};