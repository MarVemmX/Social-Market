import express from 'express';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { categoryId, create, read, update, deleteCategory, list} from '../controllers/category';
const router = express.Router();

router.get('/:categoryId', read);
router.param('categoryId', categoryId )
router.post('/create',  create);
router.put('/:categoryId', auth, isAdmin, update);
router.delete('/:categoryId', auth, isAdmin, deleteCategory);
router.get('/categories', list);

module.exports = router;

