import express from 'express';
import { getUserInfo, updateUserInfo, changePassword, changeAvatar, searchUser } from '../controllers/profile';
import { auth } from '../middleware/auth'; // middleware login
import upload from '../utils/multer';

const router = express.Router();

router.get('/:id', getUserInfo);
router.patch('/:id/edit', auth, updateUserInfo);
router.patch('/change-password/:id', auth, changePassword);
// router.put('/avatar/:id', auth, upload.single('image'), changeAvatar);
router.put('/:id/avatar', auth, upload.single('image'), changeAvatar);
module.exports = router;
