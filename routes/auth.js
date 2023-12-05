const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

// /login
// GET
router.get('/login', authController.getLogin);
// POST
router.post('/login', authController.postLogin);

// /register
// GET
router.get('/register', authController.getRegister);
// POST
router.post('/register', authController.postRegister);

// /reset-password
// GET
router.get('/reset-password', authController.getResetPassword);
// POST
router.post('/reset-password', authController.postResetPassword);

module.exports = router;