import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  year: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  pages: {
    type: Number,
    required: true,
    min: 1
  },
  categories: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
bookSchema.index({ 
  title: 'text', 
  author: 'text', 
  description: 'text',
  categories: 'text'
});

// Change this line from named export to default export
export default mongoose.model('Book', bookSchema);