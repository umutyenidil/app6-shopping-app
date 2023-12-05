const CategoryModel = require('../models/category_model/category_model');
const ProductModel = require('../models/product_model/product_model');
const {homePageRenderer} = require("../utilities/view-renderers/user-view-renderers");

// /
module.exports.getIndex = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try {
        const categoryList = await CategoryModel.readAll();
        const productList = await ProductModel.readAll();

        homePageRenderer({
            response: outgoingResponse,
            title: 'Home Page',
            products: productList,
            categories: categoryList,
            isAuthenticated: incomingRequest.session.isAuthenticated ?? false,
        });

    } catch (error) {
        console.error(error);
    }
}; 