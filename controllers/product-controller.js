const Category = require('../models/category');
const Product = require('../models/product');

const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.readAllCategories().then((readCategoriesQuery)=>{
        Product.readAllProducts().then((readProductsQuery)=>{
            outgoingResponse.render('user/products', {
                title: 'Products',
                productList: readProductsQuery[0],
                categoryList: readCategoriesQuery[0],
            });
        }).catch((error)=>{
            console.log(error);
        });
    }).catch((error)=>{
        console.log(error);
    });
};

// /products/:productUuid/details
module.exports.getProductProductUuidDetails = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.readByUuid(productUuid).then((readQuery)=>{
        outgoingResponse.render('user/product-details', {
            title: readQuery[0][0].name,
            product: readQuery[0][0],
        });
    }).catch((error)=>{
        console.log(error);
    });  
}

// /categories/:categoryUuid
module.exports.getCategoriesCategoryUuid = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.readAllCategories().then((readCategoriesQuery)=>{
        Product.readAllProductsByCategoryUuid(categoryUuid).then((readProductsQuery)=>{
            outgoingResponse.render('user/products', {
                title: 'Products',
                productList: readProductsQuery[0],
                categoryList: readCategoriesQuery[0],
            });
        }).catch((error)=>{
            console.log(error);
        });
    }).catch((error)=>{
        console.log(error);
    });
};

// /admin/products => GET
module.exports.getAdminProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {  
    Product.readAllProducts().then((queryResult)=>{
        outgoingResponse.render('admin/products', {
            title: 'Products',
            productList: queryResult[0],
            action: incomingRequest.query.action,
            status:incomingRequest.query.status,
        });
    }).catch((error)=>{
        console.log(error);
    });
};

// /admin/products/create => GET
module.exports.getAdminProductsCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.readAllCategories().then((readQueryResult)=>{
        outgoingResponse.render('admin/product-create', {
            title: 'Create Product',
            categoryList: readQueryResult[0],
        });
    }).catch((errorResult)=>{
        console.log(errorResult);
    });
};

// /admin/products/create => POST
module.exports.postAdminProductsCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const formData = {
        productCategoryUuid: incomingRequest.body.productCategory,
        productName: incomingRequest.body.productName,
        productDescription: incomingRequest.body.productDescription,
        productPrice: incomingRequest.body.productPrice,
        productImage: incomingRequest.body.productImage,
    };
    
    Product.create({
        categoryUuid: formData.productCategoryUuid,
        name: formData.productName,
        description: formData.productDescription,
        price: formData.productPrice,
        image: formData.productImage
    }).then((queryResult)=>{
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((errorResult)=>{
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    });
};

// /admin/products/:productUuid/edit => GET
module.exports.getAdminProductsProductUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Category.readAllCategories().then((readCategoriesQuery)=>{
        Product.readByUuid(productUuid).then((readProductQuery)=>{
            outgoingResponse.render('admin/product-edit', {
                title: `Edit ${readProductQuery[0][0].name}`,
                product: readProductQuery[0][0],
                categoryList: readCategoriesQuery[0],
            });
        }).catch((error)=>{
            console.log(error);
        });  
    }).catch((error)=>{
        console.log(error);
    });

};

// /admin/products/:productUuid/edit => POST
module.exports.postAdminProductsProductUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.update({
        uuid: productUuid,
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
module.exports.postAdminProductsProductsUuidDelete = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.deleteByUuid(productUuid).then((queryResult)=>{
        outgoingResponse.redirect('/admin/products?action=delete&status=successful');
    }).catch((error)=>{
        console.log(error);
        outgoingResponse.redirect('/admin/products?action=delete&status=failed');
    });
};


