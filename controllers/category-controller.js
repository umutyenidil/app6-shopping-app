const Category = require('../models/category');
const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');
const sequelize = require('../utilities/database');
const {ObjectId} = require("mongodb");
const Product = require("../models/product");


// /admin/categories => GET
module.exports.getCategories = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const qAction = incomingRequest.query.action;
    const qStatus = incomingRequest.query.status;

    const categoryList = await Category.find({is_deleted: false});

    outgoingResponse.render('admin/categories', {
        title: 'Categories',
        categoryList: categoryList,
        action: qAction,
        status: qStatus,
    });
};

// /admin/categories/create => GET
module.exports.getCategoriesCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/category-create', {
        title: 'Create New Category'
    });
};

// /admin/categories/create => POST
module.exports.postCategoriesCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const creatorId = incomingRequest.user.id;

    const formData = {
        categoryName: incomingRequest.body.categoryName,
        categoryDescription: incomingRequest.body.categoryDescription,
    };

    try {
        const newCategory = new Category({
            creatorId: creatorId,
            name: formData.categoryName,
            description: formData.categoryDescription,
        });

        await newCategory.save();

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/details => GET
module.exports.getCategoriesCategoryIdDetails = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const category = await Category.findById(categoryId);

        outgoingResponse.render('admin/category-details', {
            title: category.name,
            category: category,
        });
    } catch (error) {
        console.error(error);
    }
};

// /admin/categories/:categoryId/delete => POST
module.exports.postCategoriesCategoryIdDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        await Category.softDelete(categoryId);

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/edit => GET
module.exports.getCategoriesCategoryIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const category = await Category.findById(categoryId);

        outgoingResponse.render('admin/category-edit', {
            title: `Edit ${category.name} Category`,
            category: category,
        });
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/edit => POST
module.exports.postCategoriesCategoryIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    const formData = {
        categoryName: incomingRequest.body.categoryName,
        categoryDescription: incomingRequest.body.categoryDescription,
    }

    try {
        await Category.updateOne(
            {
                _id: categoryId
            },
            {
                name: formData.categoryName,
                description: formData.categoryDescription,
            }
        );

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};

// /categories/:categoryId/products
module.exports.getCategoriesCategoryIdProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const categoryList = await Category.findNotDeletedDocuments();
        const productList = await Product.findByCategoryId(categoryId);

        outgoingResponse.render('user/products', {
            title: 'Products',
            productList: productList,
            categoryList: categoryList,
        });
    } catch (error) {
        console.log(error);
    }
};