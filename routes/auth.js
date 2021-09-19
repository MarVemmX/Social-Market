import express from 'express';
import upload from '../utils/multer';

const router = express.Router();

// Controllers
const { login, register, forgotPassword, resetPassword } = require('../controllers/auth');

// user router
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

module.exports = router;
