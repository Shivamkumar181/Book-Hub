import express from 'express';
// import { authenticate, authorize } from '../middleware/auth.js';
import { 
  getBooks, 
  getBook, 
  createBook, 
  updateBook, 
  deleteBook, 
  likeBook, 
  getCategories 
} from '../controllers/bookController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/categories', getCategories);
router.get('/:id', getBook);

// Protected routes
router.post('/', authenticate, authorize('admin'), createBook);
router.put('/:id', authenticate, updateBook);
router.delete('/:id', authenticate, deleteBook);
router.post('/:id/like', authenticate, likeBook);

export default router;