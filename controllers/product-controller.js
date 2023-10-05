const Product = require('../models/product');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('product-list', {
        title: 'Products',
        productList: Product.getAllProducts(),
    });
};

// /admin/create-product
module.exports.getCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('create-product', {
        title: 'Create Product Page'
    });
};

// /admin/create-product
module.exports.postCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const newProduct = new Product({
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    });

    newProduct.save();

    outgoingResponse.redirect('/');
};