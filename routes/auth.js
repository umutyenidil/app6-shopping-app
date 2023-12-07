const express = require('express');
const router = express.Router();

const csrfMiddleware = require('../middlewares/csrf-middleware');

const authController = require('../controllers/auth-controller');

// /login
// GET
router.get('/login', csrfMiddleware, authController.getLogin);
// POST
router.post('/login', authController.postLogin);

// /register
// GET
router.get('/register', csrfMiddleware, authController.getRegister);
// POST
router.post('/register', authController.postRegister);

// /logout
// POST
router.post('/logout', authController.postLogout);

// /reset-password
// GET
router.get('/reset-password', csrfMiddleware, authController.getResetPassword);
// POST
router.post('/reset-password', authController.postResetPassword);

module.exports = router;