// import mongoose from 'mongoose';

// const tokenSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   token: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['email-verification', 'password-reset'],
//     required: true
//   },
//   expiresAt: {
//     type: Date,
//     required: true,
//     default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
//   }
// }, {
//   timestamps: true
// });

// // Auto-delete expired tokens
// tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// // Change this line from named export to default export
// export default mongoose.model('Token', tokenSchema);