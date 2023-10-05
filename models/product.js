const { v4: uuidv4 } = require('uuid');

const productData = require('../data/product_data');

module.exports = class Product{
    constructor ({name, description, price, image}){
        this.uuid = uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    save(){
        productData.productList.push(this);
    }

    static getAllProducts(){
        return productData.productList;
    }
};