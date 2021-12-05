import express from 'express';
import { protect } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { categoryId, create, read, update, remove, list} from '../controllers/category';
const router = express.Router();

router.get('/:categoryId', read);
router.post('/create', protect, isAdmin, create);
router.put('/:categoryId', protect, isAdmin, update);
router.delete('/:categoryId', protect, isAdmin, remove);
router.get('/categories', list);


