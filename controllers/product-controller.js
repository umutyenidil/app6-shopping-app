const Category = require('../models/category');
const Product = require('../models/product');

const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');
const sequelize = require('../utilities/database');

// /products
module.exports.getProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try {
        const productList = await Product.readAll();

        outgoingResponse.render('user/products', {
            title: 'Products',
            productList: productList,
        });
    } catch (error) {
        console.error(error);
    }
};

// /products/:productId/details
module.exports.getProductProductIdDetails = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        const product = await Product.readById(productId);

        outgoingResponse.render('user/product-details', {
            title: product.name,
            product: product,
        });
    } catch (error) {
        console.error(error);
    }
}

// /categories/:categoryUuid
module.exports.getCategoriesCategoryUuid = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.findAll({where:{isDeleted:0}})
        .then((categoryList) => {
            Product.findAll({where: {categoryUuid:categoryUuid, isDeleted:0}})
                .then((productList)=>{
                    outgoingResponse.render('user/products', {
                        title: 'Products',
                        productList: productList,
                        categoryList: categoryList,
                    });
                })
                .catch((error)=>{
                    console.log(error);
                });
        })
        .catch((error)=>{
            console.log(error);
        });
};

// /admin/products => GET
module.exports.getAdminProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const actionQuery = incomingRequest.query.action;
    const statusQuery = incomingRequest.query.status;

    try {
        const productList = await Product.readAll();

        outgoingResponse.render('admin/products', {
            title: 'Admin Products',
            productList: productList,
            action: actionQuery,
            status: statusQuery,
        });
    } catch (error) {
        console.error(error);
    }
};

// /admin/products/create => GET
module.exports.getAdminProductsCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/product-create', {
        title: 'Create Product',
        // categoryList: [{uuid: 'test', name: 'test2'}],
    });
};

// /admin/products/create => POST
module.exports.postAdminProductsCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const formData = {
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    };

    try {
        await Product.create(formData);

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/products/:producId/edit => GET
module.exports.getAdminProductsProductIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        const product = await Product.readById(productId);

        outgoingResponse.render('admin/product-edit', {
            title: `Edit ${product.name}`,
            product: product,
            categoryList: null,
        });
    } catch (error) {
        console.log(error);
    }
};

// /admin/products/:productId/edit => POST
module.exports.postAdminProductsProductIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    const formData = {
        name: incomingRequest.body.productName,
        // productCategory: incomingRequest.body.productCategory,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    };

    try {
        await Product.update({_id:productId, ...formData});

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/products/:productId/delete => POST
module.exports.postAdminProductsProductIdDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        await Product.deleteById(productId);

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    }
};


