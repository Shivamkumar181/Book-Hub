// import { useState, useEffect } from 'react'  working 
// import { motion, AnimatePresence } from 'framer-motion'
// import BookCard from '../components/BookCard'
// import CategoryFilter from '../components/CategoryFilter'
// import BackToTop from '../components/BackToTop'
// import { books as sampleBooks } from '../data/books'
// import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'

// export default function Library() {
//   const [books, setBooks] = useState(sampleBooks)
//   const [filteredBooks, setFilteredBooks] = useState(sampleBooks)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [showFilters, setShowFilters] = useState(false)
//   const [sortBy, setSortBy] = useState('title')

//   // Filter and search books
//   useEffect(() => {
//     let result = books
    
//     // Filter by category
//     if (selectedCategory !== 'All') {
//       result = result.filter(book => 
//         book.categories.includes(selectedCategory)
//       )
//     }
    
//     // Search by title or author
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       result = result.filter(book => 
//         book.title.toLowerCase().includes(query) || 
//         book.author.toLowerCase().includes(query)
//       )
//     }
    
//     // Sort results
//     result = [...result].sort((a, b) => {
//       if (sortBy === 'title') {
//         return a.title.localeCompare(b.title)
//       } else if (sortBy === 'author') {
//         return a.author.localeCompare(b.author)
//       } else if (sortBy === 'year') {
//         return b.year - a.year
//       }
//       return 0
//     })
    
//     setFilteredBooks(result)
//   }, [books, selectedCategory, searchQuery, sortBy])

//   const categories = [
//     'All',
//     'Fiction',
//     'Non-Fiction',
//     'Science Fiction',
//     'Fantasy',
//     'Mystery',
//     'Thriller',
//     'Romance',
//     'Biography',
//     'History',
//     'Science',
//     'Technology',
//     'Business',
//     'Philosophy',
//     'Psychology'
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="container mx-auto">
//         <motion.h1 
//           className="text-4xl font-bold text-center text-gray-800 mb-2"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Library
//         </motion.h1>
//         <motion.p 
//           className="text-center text-gray-600 mb-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Discover {books.length} books waiting to be explored
//         </motion.p>

//         {/* Search and Filter Bar */}
//         <motion.div 
//           className="bg-white rounded-xl shadow-md p-6 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="relative w-full md:w-1/2">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by title or author..."
//                 className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="flex gap-4 w-full md:w-auto">
//               <select
//                 className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="title">Sort by Title</option>
//                 <option value="author">Sort by Author</option>
//                 <option value="year">Sort by Year</option>
//               </select>

//               <button
//                 className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 {showFilters ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//               </button>
//             </div>
//           </div>

//           {/* Category Filters */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4"
//               >
//                 <CategoryFilter
//                   categories={categories}
//                   selectedCategory={selectedCategory}
//                   onSelectCategory={setSelectedCategory}
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Books Grid */}
//         {filteredBooks.length > 0 ? (
//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <AnimatePresence>
//               {filteredBooks.map((book) => (
//                 <BookCard key={book.id} book={book} />
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         ) : (
//           <motion.div 
//             className="text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h3 className="text-2xl font-semibold text-gray-700 mb-4">No books found</h3>
//             <p className="text-gray-600">
//               Try adjusting your search or filter criteria
//             </p>
//           </motion.div>
//         )}
//       </div>
      
//       <BackToTop />
//     </div>
//   )
// }



// src/pages/Library.jsx
// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import BookCard from '../components/BookCard'
// import CategoryFilter from '../components/CategoryFilter'
// import BackToTop from '../components/BackToTop'
// import { books as sampleBooks } from '../data/books'
// import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'

// export default function Library() {
//   const [books, setBooks] = useState([])
//   const [filteredBooks, setFilteredBooks] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [showFilters, setShowFilters] = useState(false)
//   const [sortBy, setSortBy] = useState('title')
//   const [loading, setLoading] = useState(true)

//   // Load books on component mount
//   useEffect(() => {
//     // Simulate API call with timeout
//     const loadBooks = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500))
//         setBooks(sampleBooks)
//         setFilteredBooks(sampleBooks)
//       } catch (error) {
//         console.error('Error loading books:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadBooks()
//   }, [])

//   // Filter and search books
//   useEffect(() => {
//     if (books.length === 0) return
    
//     let result = [...books]
    
//     // Filter by category
//     if (selectedCategory !== 'All') {
//       result = result.filter(book => 
//         book.categories && book.categories.includes(selectedCategory)
//       )
//     }
    
//     // Search by title or author
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       result = result.filter(book => 
//         (book.title && book.title.toLowerCase().includes(query)) || 
//         (book.author && book.author.toLowerCase().includes(query))
//       )
//     }
    
//     // Sort results
//     result = result.sort((a, b) => {
//       if (sortBy === 'title') {
//         return a.title.localeCompare(b.title)
//       } else if (sortBy === 'author') {
//         return a.author.localeCompare(b.author)
//       } else if (sortBy === 'year') {
//         return b.year - a.year
//       }
//       return 0
//     })
    
//     setFilteredBooks(result)
//   }, [books, selectedCategory, searchQuery, sortBy])

//   const categories = [
//     'All',
//     'Fiction',
//     'Non-Fiction',
//     'Science Fiction',
//     'Fantasy',
//     'Mystery',
//     'Thriller',
//     'Romance',
//     'Biography',
//     'History',
//     'Science',
//     'Technology',
//     'Business',
//     'Philosophy',
//     'Psychology'
//   ]

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading library...</p>
//         </div>
//       </div>
//     )
//   }






// src/pages/Library.jsx - Updated with API call
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';
import CategoryFilter from '../components/CategoryFilter';
import BackToTop from '../components/BackToTop';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [currentPage, searchQuery, selectedCategory, sortBy]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        sortBy: sortBy
      });

      const response = await fetch(`${API_BASE_URL}/books?${params}`);
      const data = await response.json();

      if (data.success) {
        setBooks(data.books);
        setFilteredBooks(data.books);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(['All', ...data.categories]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Library
        </motion.h1>
        <motion.p 
          className="text-center text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover {books.length} books waiting to be explored
        </motion.p>

        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="year">Sort by Year</option>
              </select>

              <button
                className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No books found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
      
      <BackToTop />
    </div>
  )
}
