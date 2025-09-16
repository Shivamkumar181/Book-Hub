import express from 'express';
import { uploadCover, uploadPDF } from '../middleware/upload.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/cover', authenticate, authorize('admin'), uploadCover.single('cover'), (req, res) => {
  res.json({
    success: true,
    message: 'Cover image uploaded successfully',
    filePath: req.file.path
  });
});

router.post('/pdf', authenticate, authorize('admin'), uploadPDF.single('pdf'), (req, res) => {
  res.json({
    success: true,
    message: 'PDF file uploaded successfully',
    filePath: req.file.path
  });
});

export default router;