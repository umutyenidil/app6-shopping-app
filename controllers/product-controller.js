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

// /categories/:categoryId/products
module.exports.getCategoriesCategoryIdProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const categoryList = await Category.readAll();
        const productList = await Product.readAllByCategoryId(categoryId);

        outgoingResponse.render('user/products', {
            title: 'Products',
            productList: productList,
            categoryList: categoryList,
        });
    } catch(error) {
        console.log(error);
    }
};

// /admin/products => GET
module.exports.getAdminProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const actionQuery = incomingRequest.query.action;
    const statusQuery = incomingRequest.query.status;

    try {
        const productList = await Product.readAll();
        const categoryList = await Category.readAll();

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
module.exports.getAdminProductsCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try{
        const categoryList = await Category.readAll();

        outgoingResponse.render('admin/product-create', {
            title: 'Create Product',
            categoryList: categoryList,
        });
    } catch (error) {
        console.error(error);
    }
};

// /admin/products/create => POST
module.exports.postAdminProductsCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const formData = {
        creatorId: incomingRequest.user._id,
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
        categoryIds: incomingRequest.body.productCategories,
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
        let categoryList = await Category.readAll();

        categoryList = categoryList.map((category) => {
            product.categoryIds.find((categoryId) => {
               if(category.id === categoryId){
                   category.selected = true;
               }
            });

            return category;
        });


        outgoingResponse.render('admin/product-edit', {
            title: `Edit ${product.name}`,
            product,
            categoryList,
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


