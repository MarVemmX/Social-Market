import express from 'express';
const router = express.Router();

// Controllers
const { login, register, forgotPassword, resetPassword } = require('../controllers/auth');

// user router
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

module.exports = router;
