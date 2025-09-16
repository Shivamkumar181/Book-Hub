// import User from '../models/User.js';
// import Token from '../models/Token.js';
// import { generateToken, generateResetToken } from '../utils/generateToken.js';
// import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/sendEmail.js';

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email'
//       });
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password
//     });

//     // Generate verification token
//     const verificationToken = generateResetToken();
//     await Token.create({
//       userId: user._id,
//       token: verificationToken,
//       type: 'email-verification'
//     });

//     // Send verification email
//     await sendVerificationEmail(user, verificationToken);

//     // Generate JWT token
//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please check your email for verification.',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error creating user',
//       error: error.message
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     // Check password
//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     // Check if email is verified
//     if (!user.isVerified) {
//       return res.status(401).json({
//         success: false,
//         message: 'Please verify your email before logging in'
//       });
//     }

//     // Generate token
//     const token = generateToken(user._id);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         bio: user.bio,
//         likedBooks: user.likedBooks
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error logging in',
//       error: error.message
//     });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found with this email'
//       });
//     }

//     // Generate reset token
//     const resetToken = generateResetToken();
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
//     await user.save();

//     // Send reset email
//     await sendPasswordResetEmail(user, resetToken);

//     res.json({
//       success: true,
//       message: 'Password reset instructions sent to your email'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error processing forgot password',
//       error: error.message
//     });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired reset token'
//       });
//     }

//     // Update password
//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.json({
//       success: true,
//       message: 'Password reset successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error resetting password',
//       error: error.message
//     });
//   }
// };

// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const tokenDoc = await Token.findOne({
//       token,
//       type: 'email-verification',
//       expiresAt: { $gt: Date.now() }
//     });

//     if (!tokenDoc) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired verification token'
//       });
//     }

//     const user = await User.findById(tokenDoc.userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     user.isVerified = true;
//     await user.save();
//     await Token.deleteOne({ _id: tokenDoc._id });

//     res.json({
//       success: true,
//       message: 'Email verified successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error verifying email',
//       error: error.message
//     });
//   }
// };

//upd

import User from '../models/User.js';
import { generateToken, generateResetToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {      
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      isVerified: true // Set to true directly, no verification needed
    });

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        likedBooks: user.likedBooks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken: resetToken // Return token for direct use
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing forgot password',
      error: error.message
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    // Find user by email and valid reset token
    const user = await User.findOne({
      email: email,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email, token, or token has expired'
      });
    }

    // Update password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: error.message
    });
  }
};