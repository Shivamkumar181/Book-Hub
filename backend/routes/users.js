import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  getLikedBooks 
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/liked-books', getLikedBooks);

export default router;


// import express from 'express';
// import { 
//   getProfile, 
//   updateProfile, 
//   getLikedBooks 
// } from '../controllers/userController.js';
// // import { protect } from '../middleware/auth.js';
// import { authenticate, authorize } from '../middleware/auth.js';

// const router = express.Router();

// // Apply protect middleware to all routes
// router.use(authenticate, authorize);

// router.get('/profile', getProfile);
// router.put('/profile', updateProfile);
// router.get('/liked-books', getLikedBooks);

// export default router;