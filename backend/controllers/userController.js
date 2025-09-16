// import User from '../models/User.js';

// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate('likedBooks')
//       .select('-password');

//     res.json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching profile',
//       error: error.message
//     });
//   }
// };

// export const updateProfile = async (req, res) => {
//   try {
//     const { name, bio } = req.body;
    
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, bio },
//       { new: true, runValidators: true }
//     ).select('-password');

//     res.json({
//       success: true,
//       message: 'Profile updated successfully',
//       user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating profile',
//       error: error.message
//     });
//   }
// };

// export const getLikedBooks = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate('likedBooks')
//       .select('likedBooks');

//     res.json({
//       success: true,
//       books: user.likedBooks
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching liked books',
//       error: error.message
//     });
//   }
// };




import User from '../models/User.js';
import Book from '../models/Book.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -resetPasswordToken -resetPasswordExpire');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio },
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -resetPasswordExpire');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

export const getLikedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'likedBooks',
      select: 'title author coverImage year pages categories'
    });

    res.json({
      success: true,
      books: user.likedBooks || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching liked books',
      error: error.message
    });
  }
};