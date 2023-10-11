const Category = require('../models/category');
const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');


// /admin/categories => GET
module.exports.getCategories = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.readAllCategories().then((queryResult)=>{
            outgoingResponse.render('admin/categories', {
                title: 'Categories',
                categoryList: queryResult[0],
                action: incomingRequest.query.action,
                status: incomingRequest.query.status,
            });
    }).catch((errorResult)=>{
        console.log(errorResult);
    });
}; 

// /admin/categories/create => GET
module.exports.getCategoriesCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('admin/category-create', {
        title: 'Create New Category'
    });
};

// /admin/categories/create => POST
module.exports.postCategoriesCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const formData = {
        categoryName: incomingRequest.body.categoryName,
        categoryDescription: incomingRequest.body.categoryDescription,
    }

    Category.create({
        name: formData.categoryName,
        description: formData.categoryDescription,
    }).then((queryResult)=>{
        outgoingResponse.redirect('/admin/categories?action=create&status=successful');
    }).catch((errorResult)=>{
        console.log(errorResult);
        outgoingResponse.redirect('/admin/categories?action=create&status=failed');
    });
};

// /admin/categories/:categoryUuid/details => GET
module.exports.getCategoriesCategoryUuidDetails = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.readByUuid(categoryUuid).then((queryResult)=>{
        outgoingResponse.render('admin/category-details', {
            title: queryResult[0][0].name,
            category: queryResult[0][0],
        });
    }).catch((errorResult)=>{
        console.log(errorResult);
    });
};

// /admin/categories/:categoryUuid/delete => POST
module.exports.postCategoriesCategoryUuidDelete = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.deleteByUuid(categoryUuid).then((queryResult)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((errorResult)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    });
};

// /admin/categories/:categoryUuid/edit => GET
module.exports.getCategoriesCategoryUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.readByUuid(categoryUuid).then((readQueryResult)=>{
        outgoingResponse.render('admin/category-edit', {
            title: `Edit ${readQueryResult[0][0].name} Category`,
            category: readQueryResult[0][0],
        });
    }).catch((errorResult)=>{
        console.log(errorResult);
    });
};

// /admin/categories/:categoryUuid/edit => POST
module.exports.postCategoriesCategoryUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const formData = {
        categoryName: incomingRequest.body.categoryName,
        categoryDescription: incomingRequest.body.categoryDescription,
    }

    const categoryUuid = incomingRequest.params.categoryUuid;
    Category.update({
        uuid: categoryUuid,
        name: formData.categoryName,
        description: formData.categoryDescription,
    }).then((updateQueryResult)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((errorResult)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
    });
};