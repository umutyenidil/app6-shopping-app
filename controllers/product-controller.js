const Category = require('../models/category');
const Product = require('../models/product');

const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');
const sequelize = require('../utilities/database');
const {ObjectId} = require("mongodb");

// /products
module.exports.getProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try {
        const productList = await Product.findNotDeletedDocuments();
        const categoryList = await Category.findNotDeletedDocuments();

        outgoingResponse.render('user/products', {
            title: 'Products',
            productList,
            categoryList
        });
    } catch (error) {
        console.error(error);
    }
};

// /products/:productId/details
module.exports.getProductProductIdDetails = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        const product = await Product.findById(productId);

        outgoingResponse.render('user/product-details', {
            title: product.name,
            product: product,
        });
    } catch (error) {
        console.error(error);
    }
}



// /admin/products => GET
module.exports.getAdminProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const qAction = incomingRequest.query.action;
    const qStatus = incomingRequest.query.status;

    try {
        const productList = await Product.find({is_deleted: false});

        outgoingResponse.render('admin/products', {
            title: 'Admin Products',
            productList: productList,
            action: qAction,
            status: qStatus,
        });
    } catch (error) {
        console.error(error);
    }
};

// /admin/products/create => GET
module.exports.getAdminProductsCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try {
        const categoryList = await Category.findNotDeletedDocuments();

        outgoingResponse.render('admin/product-create', {
            title: 'Create Product',
            categoryList,
        });
    } catch (error) {
        console.error(error);
    }
};

// /admin/products/create => POST
module.exports.postAdminProductsCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const creatorId = incomingRequest.user.id;

    const formData = {
        name: incomingRequest.body.name,
        description: incomingRequest.body.description,
        price: incomingRequest.body.price,
        image: incomingRequest.body.image,
        categoryIds: typeof (incomingRequest.body.categoryIds) === 'string' ? new Array(incomingRequest.body.categoryIds) : incomingRequest.body.categoryIds,
    };

    try {
        const product = new Product({
            creator_id: new ObjectId(creatorId),
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image: formData.image,
            categories: formData.categoryIds.map((categoryId) => new ObjectId(categoryId)),
        });

        await product.save();

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        console.log(error);
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/products/:productId/edit => GET
module.exports.getAdminProductsProductIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        const product = await Product.findByIdWithCategories(productId);

        const categoryList = await Category.findNotDeletedDocuments();

        // create a list for selected categories by user
        const updatedCategoryList = categoryList.map((category) => {
            const categoryId = category._id.toString();
            const result = product.categories.find((productCategory) => {
                const productCategoryId = productCategory._id.toString();

                return categoryId === productCategoryId;
            });

            category.selectedByUser = result !== undefined;

            return category;
        });


        outgoingResponse.render('admin/product-edit', {
            title: `Edit ${product.name}`,
            product,
            categoryList: updatedCategoryList,
        });
    } catch (error) {
        console.log(error);
    }
};

// /admin/products/:productId/edit => POST
module.exports.postAdminProductsProductIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    const formData = {
        name: incomingRequest.body.name,
        description: incomingRequest.body.description,
        price: incomingRequest.body.price,
        image: incomingRequest.body.image,
        categoryIds: (typeof incomingRequest.body.categoryIds) === 'string' ? new Array(incomingRequest.body.categoryIds) : incomingRequest.body.categoryIds,
    };

    formData.categoryIds = formData.categoryIds.map((categoryId) => new ObjectId(categoryId));

    try {
        await Product.updateOne(
            {
                _id: productId
            },
            {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                image: formData.image,
                categories: formData.categoryIds,
            }
        );

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/products/:productId/delete => POST
module.exports.postAdminProductsProductIdDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productId = incomingRequest.params.productId;

    try {
        await Product.softDelete(productId);

        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    }
};


