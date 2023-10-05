const express = require('express');
const router = express.Router();

const path = require('path');

const productData = require('../data/product_data');

const productController = require('../controllers/product-controller');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('index', {
        title: 'Home Page',
        productList: productData.productList,
    });
});

router.get('/products', productController.getProducts);

module.exports = router;