const express = require('express');
const router = express.Router();

const path = require('path');

const productData = require('../data/product_data');

// /admin/create-product => GET
router.get('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('create-product', {
        title: 'Create Product Page'
    });
});

// /admin/create-product => POST
router.post('/create-product', (incomingRequest, outgoingResponse, nextMiddleware) => {
    const newProduct = {
        name: incomingRequest.body.productName,
        description: incomingRequest.body.productDescription,
        price: incomingRequest.body.productPrice,
        image: incomingRequest.body.productImage,
    };

    productData.productList.push(newProduct);

    outgoingResponse.redirect('/');
});

module.exports = router;