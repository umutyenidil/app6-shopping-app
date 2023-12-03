const CategoryModel = require('../models/category_model/category_model');
const ProductModel = require('../models/product_model/product_model');

// /
module.exports.getIndex = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try{
        const categoryList = await CategoryModel.readAll();
        const productList = await ProductModel.readAll();

        outgoingResponse.render('user/index', {
            title: 'Home Page',
            productList: productList,
            categoryList: categoryList,
        });

    } catch(error) {
        console.error(error);
    }
}; 