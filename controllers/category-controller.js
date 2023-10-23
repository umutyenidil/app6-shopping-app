const Category = require('../models/category');
const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');
const sequelize = require('../utilities/database');


// /admin/categories => GET
module.exports.getCategories = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const qAction = incomingRequest.query.action;
    const qStatus = incomingRequest.query.status;

    const categoryList = await Category.readAll();

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
    const creatorId = incomingRequest.user._id;

    const formData = {
        name: incomingRequest.body.categoryName,
        description: incomingRequest.body.categoryDescription,
    };

    try{
        await Category.create({creatorId, ...formData});

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryUuid/details => GET
module.exports.getCategoriesCategoryIdDetails = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try {
        const category = await Category.readById(categoryId);

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
        await Category.deleteById(categoryId);

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch (error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    }
};

// /admin/categories/:categoryId/edit => GET
module.exports.getCategoriesCategoryIdEdit = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryId = incomingRequest.params.categoryId;

    try{
        const category = await Category.readById(categoryId);

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
        name: incomingRequest.body.categoryName,
        description: incomingRequest.body.categoryDescription,
    }

    try{
        await Category.update({id:categoryId, ...formData});

        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    } catch(error) {
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    }
};