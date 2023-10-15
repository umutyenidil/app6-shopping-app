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

// /cart => GET
router.get('/cart', cartController.getCart);

// /cart/add => POST
router.post('/cart/add', cartController.postCartAdd);

// /cart/item/quantity/increase => POST
router.post('/cart/item/quantity/increase', cartController.postCartItemQuantityIncrease);

// /cart/item/quantity/increase => POST
router.post('/cart/item/quantity/decrease', cartController.postCartItemQuantityDecrease);

// /cart/item/delete => POST
router.post('/cart/item/delete', cartController.postCartItemDelete);

// /orders => GET
router.get('/orders', orderController.getOrders);

// /orders/create => POST
router.post('/orders/create', orderController.postOrdersCreate);

module.exports = router;