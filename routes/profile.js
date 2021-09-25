import express from 'express';
import { getUserInfo, updateUserInfo, changePassword, changeAvatar } from '../controllers/profile';
import { protect } from '../middleware/auth'; // middleware login
import upload from '../utils/multer';

const router = express.Router();

router.get('/:id', getUserInfo);
router.patch('/:id/edit', protect, updateUserInfo);
router.patch('/change-password/:id', protect, changePassword);
// router.put('/avatar/:id', protect, upload.single('image'), changeAvatar);
router.put('/:id/avatar', protect, upload.single('image'), changeAvatar);
module.exports = router;
