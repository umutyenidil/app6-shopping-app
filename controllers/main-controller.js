const Category = require('../models/category');
const Product = require('../models/product');

module.exports.getIndex = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryList = Category.getAllCategories();

    Product.getAllProducts().then((queryResult)=>{
        outgoingResponse.render('user/index', {
            title: 'Home Page',
            productList: queryResult[0],
            categoryList: categoryList,
        });
    }).catch((error)=>{
        console.log(error);
    });
}; 