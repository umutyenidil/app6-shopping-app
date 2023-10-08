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
        productData.productList.push(this);
    }

    update({name, categoryUuid, description, price, image}){
        const index = productData.productList.findIndex(item => item.uuid === this.uuid);

        productData.productList[index].name = name;
        productData.productList[index].categoryUuid = categoryUuid;
        productData.productList[index].description = description;
        productData.productList[index].price = price;
        productData.productList[index].image = image;
    }

    static getAllProducts(){
        return productData.productList;
    }

    static getProductByUuid(uuid){
        const data = productData.productList.find(item => item.uuid === uuid);
        
        const product = new Product(data);

        return product;
    }

    static getProductsByCategoryUuid(uuid){
        return productData.productList.filter(item => item.categoryUuid === uuid);
    }

    static deleteProductByUuid(uuid){
        const index = productData.productList.findIndex(item => item.uuid === uuid);

        productData.productList.splice(index, 1);
    }
};