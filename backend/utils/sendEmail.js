// import nodemailer from 'nodemailer';

// const createTransporter = () => {
//   return nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
// };

// export const sendVerificationEmail = async (user, token) => {
//   try {
//     const transporter = createTransporter();
//     const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Verify Your Email - BookHub',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Welcome to BookHub!</h2>
//           <p>Please verify your email address to complete your registration.</p>
//           <a href="${verificationUrl}" 
//              style="display: inline-block; padding: 12px 24px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 6px;">
//             Verify Email
//           </a>
//           <p>Or copy this link: ${verificationUrl}</p>
//           <p>This link will expire in 24 hours.</p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     throw new Error('Failed to send verification email');
//   }
// };

// export const sendPasswordResetEmail = async (user, token) => {
//   try {
//     const transporter = createTransporter();
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Reset Your Password - BookHub',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Password Reset Request</h2>
//           <p>You requested to reset your password. Click the button below to proceed:</p>
//           <a href="${resetUrl}" 
//              style="display: inline-block; padding: 12px 24px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 6px;">
//             Reset Password
//           </a>
//           <p>Or copy this link: ${resetUrl}</p>
//           <p>This link will expire in 1 hour.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     throw new Error('Failed to send password reset email');
//   }
// };