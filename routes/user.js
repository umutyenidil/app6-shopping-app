const express = require('express');
const router = express.Router();

const path = require('path');

const productController = require('../controllers/product-controller');
const mainController = require('../controllers/main-controller');
const cartController = require('../controllers/cart-controller');
const orderController = require('../controllers/order-controller');

// / => GET
router.get('/', mainController.getIndex);

// /products => GET
router.get('/products', productController.getProducts);

// /products/:productUuid/details => GET
router.get('/products/:productUuid/details', productController.getProductProductUuidDetails);

// /categories/:categoryUuid => GET
router.get('/categories/:categoryUuid', productController.getCategoriesCategoryUuid);

router.get('/cart', cartController.getCart);

router.get('/orders', orderController.getOrders);

module.exports = router;