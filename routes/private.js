import express from 'express';
import { getPrivateRoute } from '../controllers/private';
import { auth } from '../middleware/auth'; // middleware login trước khi vào thẳng home page
const router = express.Router();

router.get('/', auth, getPrivateRoute);

module.exports = router;
