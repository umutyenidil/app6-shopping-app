const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');
const categoryController = require('../controllers/category-controller');
const csrfMiddleware = require("../middlewares/csrf-middleware");

// /admin/categories => GET
router.get('/categories',  categoryController.getCategories);

// /admin/categories/create => GET
router.get('/categories/create',csrfMiddleware, categoryController.getCategoriesCreate);

// /admin/categories/create => POST
router.post('/categories/create', categoryController.postCategoriesCreate);

// /admin/categories/:categoryId/details => GET
router.get('/categories/:categoryId/details', categoryController.getCategoriesCategoryIdDetails);

// /admin/categories/:categoryId/delete => POST
router.post('/categories/:categoryId/delete', categoryController.postCategoriesCategoryIdDelete)

// /admin/categories/:categoryId/edit => GET
router.get('/categories/:categoryId/edit', categoryController.getCategoriesCategoryIdEdit);

// /admin/categories/:categoryId/edit => POST
router.post('/categories/:categoryId/edit', categoryController.postCategoriesCategoryIdEdit);








// /admin/products/create => GET
router.get('/products/create',csrfMiddleware, productController.getAdminProductsCreate);

// /admin/products/create => POST
router.post('/products/create', productController.postAdminProductsCreate);

// /admin/products => GET
router.get('/products', productController.getAdminProducts);

// /admin/:productId/edit => GET
router.get('/products/:productId/edit', productController.getAdminProductsProductIdEdit);

// /admin/:productId/edit => POST
router.post('/products/:productId/edit', productController.postAdminProductsProductIdEdit);

// /admin/products/:productId/delete => POST
router.post('/products/:productId/delete', productController.postAdminProductsProductIdDelete);

module.exports = router;