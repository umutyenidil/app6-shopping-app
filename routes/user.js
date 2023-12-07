const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart-controller');
const orderController = require('../controllers/order-controller');

// /cart => GET
router.get('/cart', cartController.getCart);

// /cart/add => POST
router.post('/cart/item/add', cartController.postCartAdd);

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