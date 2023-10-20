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
module.exports.getCategoriesCategoryUuidDetails = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.findByPk(categoryUuid)
        .then((category)=>{
            outgoingResponse.render('admin/category-details', {
                title: category.name,
                category: category,
            });
        })
        .catch((error)=>{
            console.log(error);
        });
};

// /admin/categories/:categoryUuid/delete => POST
module.exports.postCategoriesCategoryUuidDelete = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    const updateData = {
        isDeleted: 1,
        deletedAt: sequelize.fn('NOW'),
    };

    Category.update(updateData, {
        where: {uuid: categoryUuid}
    }).then((result)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((error)=>{
        outgoingResponse.redirect(`/admin/categories?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    });
};

// /admin/categories/:categoryUuid/edit => GET
module.exports.getCategoriesCategoryUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    Category.findByPk(categoryUuid)
        .then((category)=>{
            outgoingResponse.render('admin/category-edit', {
                title: `Edit ${category.name} Category`,
                category: category,
            });
        })
        .catch((error)=>{
            console.log(error);
        }); 
};

// /admin/categories/:categoryUuid/edit => POST
module.exports.postCategoriesCategoryUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const categoryUuid = incomingRequest.params.categoryUuid;

    const formData = {
        categoryName: incomingRequest.body.categoryName,
        categoryDescription: incomingRequest.body.categoryDescription,
    }

    Category.findByPk(categoryUuid)
        .then((category)=>{
            const updateData = {}

            if(category.name !== formData.categoryName){
                updateData.name = formData.categoryName;
            }

            if(category.description !== formData.categoryDescription){
                updateData.description = formData.categoryDescription;
            }

            Category.update(updateData, {
                where:{uuid:categoryUuid}
            }).then((result)=>{
                outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
            }).catch((error)=>{
                outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
            });
        })
        .catch((error)=>{
            outgoingResponse.redirect(`/admin/categories?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
        }); 
};