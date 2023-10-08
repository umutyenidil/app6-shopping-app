const Category = require('../models/category');
const Product = require('../models/product');

module.exports.getIndex = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productList = Product.getAllProducts();
    const categoryList = Category.getAllCategories();

    outgoingResponse.render('user/index', {
        title: 'Home Page',
        productList: Product.getAllProducts(),
        categoryList: categoryList,
    });
}; 