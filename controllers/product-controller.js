const Product = require('../models/product');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('user/product-list', {
        title: 'Products',
        productList: Product.getAllProducts(),
    });
};

// /admin/products
module.exports.getAdminProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/product-list', {
        title: 'Products',
        productList: Product.getAllProducts(),
    });
};

// /admin/create-product
module.exports.getCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/create-product', {
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

// /admin/edit-product
module.exports.getEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/edit-product', {
        title: 'Create Product Page'
    });
};

// /admin/edit-product
module.exports.postEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const newProduct = new Product({
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    });

    newProduct.save();

    outgoingResponse.redirect('/');
};


// products/:uuid/details
module.exports.getProductDetail = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('user/product-details', {
        title: 'Product Details'
    });
}