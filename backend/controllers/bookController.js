import Book from '../models/Book.js';
import User from '../models/User.js';

export const getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    let query = { isPublished: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category && category !== 'All') {
      query.categories = category;
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === 'title') {
      sortOptions.title = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'author') {
      sortOptions.author = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'year') {
      sortOptions.year = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'likes') {
      sortOptions.likes = sortOrder === 'desc' ? -1 : 1;
    }

    // Execute query
    const books = await Book.find(query)
      .populate('uploader', 'name email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('uploader', 'name email');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Increment view count
    book.views += 1;
    await book.save();

    res.json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      uploader: req.user._id,
      coverImage: req.files?.cover?.[0]?.path,
      pdfUrl: req.files?.pdf?.[0]?.path
    };

    const book = await Book.create(bookData);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating book',
      error: error.message
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user is the uploader or admin
    if (book.uploader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this book'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Book updated successfully',
      book: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user is the uploader or admin
    if (book.uploader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this book'
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message
    });
  }
};

export const likeBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const isLiked = user.likedBooks.includes(book._id);

    if (isLiked) {
      // Unlike book
      user.likedBooks.pull(book._id);
      book.likes = Math.max(0, book.likes - 1);
    } else {
      // Like book
      user.likedBooks.push(book._id);
      book.likes += 1;
    }

    await user.save();
    await book.save();

    res.json({
      success: true,
      message: isLiked ? 'Book unliked' : 'Book liked',
      isLiked: !isLiked,
      likes: book.likes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating like status',
      error: error.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct('categories', { isPublished: true });
    res.json({
      success: true,
      categories: categories.filter(cat => cat).sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};