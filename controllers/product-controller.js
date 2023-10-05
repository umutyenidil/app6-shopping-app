const productData = require('../data/product_data');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('product-list', {
        title: 'Products',
        productList: productData.productList,
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
    const newProduct = {
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    };

    productData.productList.push(newProduct);

    outgoingResponse.redirect('/');
};