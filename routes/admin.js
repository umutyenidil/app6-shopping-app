const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');

// /admin/create-product => GET
router.get('/create-product', productController.getCreateProduct);

// /admin/create-product => POST
router.post('/create-product', productController.postCreateProduct);

// /admin/products => GET
router.get('/products', productController.getAdminProducts);

// /admin/edit-product => GET
router.get('/edit-product', productController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', productController.postEditProduct);

module.exports = router;