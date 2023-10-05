const Product = require('../models/product');

module.exports.getIndex = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('user/index', {
        title: 'Home Page',
        productList: Product.getAllProducts(),
    });
}; 