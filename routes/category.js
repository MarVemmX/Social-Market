import express from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { createNewCategory, getListCategory, updateCategory, deleteCategory } from '../controllers/category';
const router = express.Router();


router.post('/create', auth, isAdmin, createNewCategory);
router.get('/list', auth, isAdmin, getListCategory);
router.put('/:id/edit', auth, isAdmin, updateCategory);
router.delete('/:id', auth, isAdmin, deleteCategory);

module.exports = router;