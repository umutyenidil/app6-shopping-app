const CategoryModel = require('../models/category_model/category_model');
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

    const arrCategories = await CategoryModel.readAll();

    outgoingResponse.render('admin/categories', {
        title: 'Categories',
        categoryList: arrCategories,
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
        await CategoryModel.create({
            creatorId: creatorId,
            name: formData.categoryName,
            description: formData.categoryDescription,
        });


        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/details => GET
module.exports.getCategoriesCategoryIdDetails = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const category = await CategoryModel.read({
            categoryId
        });

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
        await CategoryModel.delete({
            categoryId,
        });

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/edit => GET
module.exports.getCategoriesCategoryIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const objCategory = await CategoryModel.read({
            categoryId,
        });

        outgoingResponse.render('admin/category-edit', {
            title: `Edit ${objCategory.name} Category`,
            category: objCategory,
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
        await CategoryModel.update({
            categoryId,
            name: formData.categoryName,
            description: formData.categoryDescription,
        });

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};

// /categories/:categoryId/products
module.exports.getCategoriesCategoryIdProducts = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const categoryList = await CategoryModel.readAll();
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