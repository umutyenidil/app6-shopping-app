const express = require('express');
const router = express.Router();

const path = require('path');

const Product = require('../models/product');

const productController = require('../controllers/product-controller');

router.get('/', (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('index', {
        title: 'Home Page',
        productList: Product.getAllProducts(),
    });
});

router.get('/products', productController.getProducts);

module.exports = router;