const { v4: uuidv4 } = require('uuid');

const productData = require('../data/product_data');

module.exports = class Product{
    constructor ({uuid=null, name, description, price, image}){
        this.uuid = uuid ?? uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    save(){
        productData.productList.push(this);
    }

    update({name, description, price, image}){
        console.log(name);
        console.log(description);
        console.log(price);
        console.log(image);

        const index = productData.productList.findIndex(item => item.uuid === this.uuid);

        productData.productList[index].name = name;
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
};