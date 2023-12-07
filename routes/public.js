const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');
const mainController = require('../controllers/main-controller');
const categoryController = require("../controllers/category-controller");

// / => GET
router.get('/', mainController.getIndex);

// /products => GET
router.get('/products', productController.getProducts);

// /products/:productId/details => GET
router.get('/products/:productId/details', productController.getProductProductIdDetails);

// /categories/:categoryId/products => GET
router.get('/categories/:categoryId/products', categoryController.getCategoriesCategoryIdProducts);

module.exports = router;