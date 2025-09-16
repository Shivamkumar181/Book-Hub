// import jwt from 'jsonwebtoken';

// export const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || '7d'
//   });
// };

// export const generateResetToken = () => {
//   return Math.random().toString(36).substring(2, 15) + 
//          Math.random().toString(36).substring(2, 15);
// };


import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const generateResetToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};