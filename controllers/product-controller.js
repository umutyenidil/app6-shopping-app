const Category = require('../models/category');
const Product = require('../models/product');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryList = Category.getAllCategories();

    Product.getAllProducts().then((queryResult)=>{
        outgoingResponse.render('user/product-list', {
            title: 'Products',
            productList: queryResult[0],
            categoryList: categoryList,
        });
    }).catch((error)=>{
        console.log(error);
    });
};

// /categories/:categoryUuid
module.exports.getProductsByCategoryUuid = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    const productList = Product.getProductsByCategoryUuid(categoryUuid);
    const categoryList = Category.getAllCategories();

    outgoingResponse.render('user/product-list', {
        title: 'Products',
        productList: productList,
        categoryList: categoryList,
    });
};

// /admin/products => GET
module.exports.getAdminProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryList = Category.getAllCategories();

    Product.getAllProducts().then((queryResult)=>{
        outgoingResponse.render('admin/product-list', {
            title: 'Products',
            productList: queryResult[0],
            categoryList: categoryList,
            action: incomingRequest.query.action,
            status:incomingRequest.query.status,
        });
    }).catch((error)=>{
        console.log(error);
    });
};

// /admin/create-product => GET
module.exports.getCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryList = Category.getAllCategories();

    outgoingResponse.render('admin/create-product', {
        title: 'Create Product Page',
        categoryList: categoryList,
    });
};

// /admin/create-product => POST
module.exports.postCreateProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const newProduct = new Product({
        name: incomingRequest.body.productName,
        categoryUuid: incomingRequest.body.productCategory,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    });

    newProduct.save().then(()=>{
        outgoingResponse.redirect('/');
    }).catch((error)=>{
        console.log(error);
    });
};

// /admin/products/:productUuid/edit => GET
module.exports.getEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    const categoryList = Category.getAllCategories();

    Product.getProductByUuid(productUuid).then((product)=>{
        outgoingResponse.render('admin/edit-product', {
            title: `Edit ${product[0][0].name}`,
            product: product[0][0],
            categoryList: categoryList,
        });
    }).catch((error)=>{
        console.log(error);
    });  
};

// /admin/products/:productUuid/edit => POST
module.exports.postEditProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    const product = Product.getProductByUuid(productUuid);

    product.update({
        name: incomingRequest.body.productName,
        categoryUuid: incomingRequest.body.productCategory,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    }).then((queryResult)=>{
        outgoingResponse.redirect('/admin/products?action=edit&status=successful');
    }).catch((error)=>{
        outgoingResponse.redirect('/admin/products?action=edit&status=failed');
    });
};

// /admin/products/:productUuid/delete => POST
module.exports.postDeleteProduct = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.deleteProductByUuid(productUuid).then((queryResult)=>{
        outgoingResponse.redirect('/admin/products?action=delete&status=successful');
    }).catch((error)=>{
        outgoingResponse.redirect('/admin/products?action=delete&status=failed');
    });
};


// products/:uuid/details
module.exports.getProductDetail = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;
    const categoryList = Category.getAllCategories();

    Product.getProductByUuid(productUuid).then((product)=>{
        outgoingResponse.render('user/product-details', {
            title: product[0][0].name,
            product: product[0][0],
            categoryList: categoryList,
        });
    }).catch((error)=>{
        console.log(error);
    });  
}