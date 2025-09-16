// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 50
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   bio: {
//     type: String,
//     maxlength: 500,
//     default: ''
//   },
//   likedBooks: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Book'
//   }],
//   readingHistory: [{
//     book: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Book'
//     },
//     readAt: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   joinDate: {
//     type: Date,
//     default: Date.now
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   resetPasswordToken: String,
//   resetPasswordExpire: Date
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Remove password from JSON output
// userSchema.methods.toJSON = function() {
//   const user = this.toObject();
//   delete user.password;
//   delete user.resetPasswordToken;
//   delete user.resetPasswordExpire;
//   return user;
// };

// // Change this line from named export to default export
// export default mongoose.model('User', userSchema);




import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  likedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  readingHistory: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  joinDate: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: true // Always true, no email verification
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  return user;
};

export default mongoose.model('User', userSchema);