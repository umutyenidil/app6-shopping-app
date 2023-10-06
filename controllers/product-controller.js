const Product = require('../models/product');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('user/product-list', {
        title: 'Products',
        productList: Product.getAllProducts(),
    });
};

// /admin/products => GET
module.exports.getAdminProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/product-list', {
        title: 'Products',
        productList: Product.getAllProducts(),
        action: incomingRequest.query.action,
        status:incomingRequest.query.status,
    });
};

// /admin/create-product => GET
module.exports.getCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/create-product', {
        title: 'Create Product Page'
    });
};

// /admin/create-product => POST
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

// /admin/products/:productUuid/edit => GET
module.exports.getEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    const product = Product.getProductByUuid(productUuid);

    outgoingResponse.render('admin/edit-product', {
        title: `Edit ${product.name}`,
        product: product,
    });
};

// /admin/products/:productUuid/edit => POST
module.exports.postEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    const product = Product.getProductByUuid(productUuid);

    product.update({
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    });

    outgoingResponse.redirect('/admin/products?action=edit&status=successful');
};

// /admin/products/:productUuid/delete => POST
module.exports.postDeleteProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.deleteProductByUuid(productUuid);

    outgoingResponse.redirect('/admin/products?action=delete&status=successful');
};


// products/:uuid/details
module.exports.getProductDetail = (incomingRequest, outgoingResponse, nextMiddleware) => {
    
    const productUuid = incomingRequest.params.productUuid;

    const product = Product.getProductByUuid(productUuid);

    outgoingResponse.render('user/product-details', {
        title: product.name,
        product: product,
    });
}