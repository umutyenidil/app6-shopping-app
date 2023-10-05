const express = require('express');
const router = express.Router();

const path = require('path');

const productData = require('../data/product_data');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('index', {
        title: 'Home Page',
        productList: productData.productList,
    });
});

router.get('/products', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('product-list', {
        title: 'Products',
        productList: productData.productList,
    });
});

module.exports = router;