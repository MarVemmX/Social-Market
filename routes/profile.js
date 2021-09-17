import express from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/profile';
import { protect } from '../middleware/auth'; // middleware login
import upload from '../utils/multer';

const router = express.Router();

router.get('/:id', protect, getUserInfo);
router.put('/edit/:id', protect, upload.single('image'), updateUserInfo);

module.exports = router;
