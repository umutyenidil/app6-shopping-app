const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');

// /admin/create-product => GET
router.get('/create-product', productController.getCreateProduct);

// /admin/create-product => POST
router.post('/create-product', productController.postCreateProduct);

module.exports = router;