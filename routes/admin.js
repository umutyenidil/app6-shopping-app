const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');
const categoryController = require('../controllers/category-controller');

// /admin/categories => GET
router.get('/categories', categoryController.getCategories);

// /admin/categories/create => GET
router.get('/categories/create', categoryController.getCategoriesCreate);

// /admin/categories/create => POST
router.post('/categories/create', categoryController.postCategoriesCreate);

// // /admin/categories/:categoryUuid/details => GET
// router.get('/categories/:categoryUuid/details', categoryController.getCategoriesCategoryUuidDetails);

// // /admin/categories/:categoryUuid/delete => POST
// router.post('/categories/:categoryUuid/delete', categoryController.postCategoriesCategoryUuidDelete)

// // /admin/categories/:categoryUuid/edit => GET
// router.get('/categories/:categoryUuid/edit', categoryController.getCategoriesCategoryUuidEdit);

// // /admin/categories/:categoryUuid/edit => POST
// router.post('/categories/:categoryUuid/edit', categoryController.postCategoriesCategoryUuidEdit)








// /admin/products/create => GET
router.get('/products/create', productController.getAdminProductsCreate);

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