// src/pages/BookDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { books } from '../data/books';
import { FaArrowLeft, FaHeart, FaRegHeart, FaDownload, FaEye, FaBook } from 'react-icons/fa';

export default function BookDetail() {
  const { id } = useParams();
  const { currentUser, toggleBookLike } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchBook = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundBook = books.find(b => b.id === parseInt(id));
      setBook(foundBook);
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const handleLike = () => {
    if (!currentUser) {
      toast.error('Please login to like books');
      return;
    }
    
    const wasLiked = toggleBookLike(book.id);
    if (wasLiked) {
      toast.success('Book added to your favorites!');
    } else {
      toast.info('Book removed from your favorites');
    }
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  const handleRead = () => {
    toast.info('Opening book in reader...');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Book not found</h2>
          <Link to="/library" className="text-purple-600 hover:underline mt-4 inline-block">
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const isLiked = currentUser && currentUser.likedBooks && currentUser.likedBooks.includes(book.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/library" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Library
        </Link>

        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex items-center justify-center">
              {imageError ? (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  <FaBook className="text-5xl text-gray-400" />
                </div>
              ) : (
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                </div>
                
                <button
                  onClick={handleLike}
                  className="text-red-500 hover:text-red-600 transition duration-300"
                  aria-label={isLiked ? 'Unlike book' : 'Like book'}
                >
                  {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Published Year</p>
                  <p className="font-semibold">{book.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-semibold">{book.pages}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{book.description}</p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleRead}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300 flex items-center"
                >
                  <FaEye className="mr-2" /> Read Now
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition duration-300 flex items-center"
                >
                  <FaDownload className="mr-2" /> Download
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Books Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">More by {book.author}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter(b => b.author === book.author && b.id !== book.id)
              .slice(0, 3)
              .map(relatedBook => (
                <div key={relatedBook.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <FaBook className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{relatedBook.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{relatedBook.year}</p>
                  <Link 
                    to={`/books/${relatedBook.id}`}
                    className="text-purple-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}