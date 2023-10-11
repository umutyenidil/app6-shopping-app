const Category = require('../models/category');
const Product = require('../models/product');

// /
module.exports.getIndex = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.readAllCategories().then((categoriesQueryResult)=>{
        Product.readAllProducts().then((productsQueryResult)=>{
            outgoingResponse.render('user/index', {
                title: 'Home Page',
                productList: productsQueryResult[0],
                categoryList: categoriesQueryResult[0],
            });
        }).catch((errorResult)=>{
            console.log(errorResult);
        });
    }).catch((errorResult)=>{
        console.log(errorResult);
    });    
}; 