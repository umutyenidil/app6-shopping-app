const Category = require('../models/category');
const Product = require('../models/product');

// /
module.exports.getIndex = (incomingRequest, outgoingResponse, nextMiddleware) => {
    Category.findAll({where:{isDeleted:0}})
        .then((categoryList)=>{
            Product.findAll({where:{isDeleted:0}})
                .then((productList)=>{
                    outgoingResponse.render('user/index', {
                        title: 'Home Page',
                        productList: productList,
                        categoryList: categoryList,
                    });
                })
                .catch((error)=>{
                    console.log(error);
                })
        })
        .catch((error)=>{
            console.log(error);
        }); 
}; 