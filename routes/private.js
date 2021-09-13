import express from 'express';
import { getPrivateRoute } from '../controllers/private';
import { protect } from '../middleware/auth'; // middleware login trước khi vào thẳng home page
const router = express.Router();

router.get('/', protect, getPrivateRoute);

module.exports = router;
