import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { 
  FaHeart, 
  FaRegHeart, 
  FaDownload, 
  FaEye,
  FaBook
} from 'react-icons/fa'

export default function BookCard({ book }) {
  const [imageError, setImageError] = useState(false)
  const { currentUser, toggleBookLike } = useAuth()
  
  const isLiked = currentUser && currentUser.likedBooks.includes(book.id)

  const handleLike = () => {
    if (!currentUser) {
      toast.error('Please login to like books')
      return
    }
    
    const wasLiked = toggleBookLike(book.id)
    if (wasLiked) {
      toast.success('Book added to your favorites!')
    } else {
      toast.info('Book removed from your favorites')
    }
  }

  const handleRead = () => {
    window.open(book.pdfUrl, '_blank')
  }

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = book.pdfUrl
    link.download = `${book.title.replace(/\s+/g, '_')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Download started!')
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Book Cover */}
      <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
        {imageError ? (
          <div className="text-gray-400 flex flex-col items-center">
            <FaBook className="text-5xl mb-2" />
            <span>No image available</span>
          </div>
        ) : (
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{book.year}</span>
          <span>{book.pages} pages</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {book.categories.slice(0, 2).map((category, index) => (
            <span 
              key={index}
              className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
          {book.categories.length > 2 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              +{book.categories.length - 2}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className="text-red-500 hover:text-red-600 transition duration-300"
            aria-label={isLiked ? 'Unlike book' : 'Like book'}
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={handleRead}
              className="bg-purple-100 text-purple-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition duration-300 flex items-center"
            >
              <FaEye className="mr-1" />
              Read
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-300 flex items-center"
            >
              <FaDownload className="mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}





