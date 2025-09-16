// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaBook, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to send password reset email
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call your backend API
      console.log('Password reset requested for:', email);
      
      toast.success('Password reset instructions sent to your email!');
      setEmailSent(true);
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check Your Email
          </h2>
          
          <p className="text-gray-600">
            We've sent password reset instructions to <strong>{email}</strong>. 
            Please check your inbox and follow the link to reset your password.
          </p>
          
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setEmailSent(false)}
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              try again
            </button>
          </p>
          
          <div className="pt-4">
            <Link 
              to="/login"
              className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex justify-center">
            <FaBook className="text-purple-600 text-5xl" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </div>
          
          <div className="text-center">
            <Link 
              to="/login"
              className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium text-sm"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}