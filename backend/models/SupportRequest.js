// import mongoose from 'mongoose';

// const supportRequestSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   subject: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   issueType: {
//     type: String,
//     enum: ['general', 'technical', 'content', 'account', 'other'],
//     default: 'general'
//   },
//   status: {
//     type: String,
//     enum: ['open', 'in-progress', 'resolved', 'closed'],
//     default: 'open'
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('SupportRequest', supportRequestSchema);







// models/SupportRequest.js
import mongoose from 'mongoose';

const supportRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    enum: ['general', 'technical', 'content', 'account', 'other'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('SupportRequest', supportRequestSchema);