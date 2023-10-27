const Category = require('../models/category');
const Product = require('../models/product');

// /
module.exports.getIndex = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    try{
        const categoryList = await Category.findNotDeletedDocuments();
        const productList = await Product.findNotDeletedDocuments();

        outgoingResponse.render('user/index', {
            title: 'Home Page',
            productList: productList,
            categoryList: categoryList,
        });

    } catch(error) {
        console.error(error);
    }
}; 