const Category = require('../models/category');
const Product = require('../models/product');

const actionTypes = require('../constants/action-types');
const actionStatuses = require('../constants/action-statuses');
const sequelize = require('../utilities/database');

// /products
module.exports.getProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.findAll({where:{isDeleted:0}})
        .then((categoryList)=>{
            Product.findAll({where:{isDeleted:0}})
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
        }).catch((error)=>{
            console.log(error);
        });
};

// /products/:productUuid/details
module.exports.getProductProductUuidDetails = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Product.findByPk(productUuid)
        .then((product)=>{
            outgoingResponse.render('user/product-details', {
                title: product.name,
                product: product,
            });
        })
        .catch((error)=>{
            console.log(error);
        });  
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
module.exports.getAdminProducts = (incomingRequest, outgoingResponse, nextMiddleware) => {  
    Product.findAll({where:{isDeleted:0}})
        .then((productList)=>{
            outgoingResponse.render('admin/products', {
                title: 'Products',
                productList: productList,
                action: incomingRequest.query.action,
                status:incomingRequest.query.status,
            });
        })
        .catch((error)=>{
            console.log(error);
        });
};

// /admin/products/create => GET
module.exports.getAdminProductsCreate = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.findAll({where:{isDeleted:0}})
        .then((categoryList)=>{
            outgoingResponse.render('admin/product-create', {
                title: 'Create Product',
                categoryList: categoryList,
            });
        })
        .catch((errorResult)=>{
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
    }).then((result)=>{
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((error)=>{
        console.log('##########################################################');
        console.log(error);
        console.log('##########################################################');
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.CREATE}&status=${actionStatuses.FAILED}`);
    });
};

// /admin/products/:productUuid/edit => GET
module.exports.getAdminProductsProductUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    Category.findAll({where:{isDeleted:0}})
        .then((categoryList)=>{
            Product.findByPk(productUuid)
                .then((product)=>{
                    outgoingResponse.render('admin/product-edit', {
                        title: `Edit ${product.name}`,
                        product: product,
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

// /admin/products/:productUuid/edit => POST
module.exports.postAdminProductsProductUuidEdit = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;
    const formData = {
        productName: incomingRequest.body.productName,
        productCategory: incomingRequest.body.productCategory,
        productDescription: incomingRequest.body.productDescription,
        productPrice: incomingRequest.body.productPrice,
        productImage: incomingRequest.body.productImage,
    };

    Product.findByPk(productUuid)
        .then((product)=>{
            const updateData = {}
            if(product.name !== formData.productName){
                updateData.name = formData.productName;
            }
            if(product.categoryUuid !== formData.productCategory){
                updateData.categoryUuid = formData.productCategory;
            }
            if(product.description !== formData.productDescription){
                updateData.description = formData.productDescription;
            }
            if(product.price !== formData.productPrice){
                updateData.price = formData.productPrice;
            }
            if(product.image !== formData.productImage){
                updateData.image = formData.productImage;
            }

            Product.update(updateData, {
                where: {uuid: productUuid}
            }).then((result)=>{
                outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.SUCCESSFUL}`);
            }).catch((error)=>{
                outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
            });
        })
        .catch((error)=>{
            outgoingResponse.redirect(`/admin/products?action=${actionTypes.UPDATE}&status=${actionStatuses.FAILED}`);
        });
};

// /admin/products/:productUuid/delete => POST
module.exports.postAdminProductsProductsUuidDelete = (incomingRequest, outgoingResponse, nextMiddleware) => {
    const productUuid = incomingRequest.params.productUuid;

    const updateData = {
        isDeleted: 1,
        deletedAt: sequelize.fn('NOW'),
    };

    Product.update(updateData, {
        where: {uuid: productUuid}
    }).then((result)=>{
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.SUCCESSFUL}`);
    }).catch((error)=>{
        outgoingResponse.redirect(`/admin/products?action=${actionTypes.DELETE}&status=${actionStatuses.FAILED}`);
    });
};


