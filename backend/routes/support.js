import express from 'express';
import SupportRequest from '../models/SupportRequest.js';
import {authenticate } from '../middleware/auth.js';

const router = express.Router();

// Submit support request
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, email, subject, message, issueType } = req.body;

    const supportRequest = await SupportRequest.create({
      name,
      email,
      subject,
      message,
      issueType,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Support request submitted successfully',
      data: supportRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting support request',
      error: error.message
    });
  }
});

// Get user's support requests
router.get('/my-requests', authenticate, async (req, res) => {
  try {
    const requests = await SupportRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching support requests',
      error: error.message
    });
  }
});

export default router;





