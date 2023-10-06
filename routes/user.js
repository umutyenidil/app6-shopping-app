const express = require('express');
const router = express.Router();

const path = require('path');

const productController = require('../controllers/product-controller');
const mainController = require('../controllers/main-controller');
const cartController = require('../controllers/cart-controller');
const orderController = require('../controllers/order-controller');

router.get('/', mainController.getIndex);

router.get('/products', productController.getProducts);

router.get('/products/:productUuid/details', productController.getProductDetail);

router.get('/cart', cartController.getCart);

router.get('/orders', orderController.getOrders);

module.exports = router;