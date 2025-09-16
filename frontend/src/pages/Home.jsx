import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { 
  FaBook, 
  FaDownload, 
  FaHeart, 
  FaSearch,
  FaArrowRight
} from 'react-icons/fa'

export default function Home() {
  const { currentUser } = useAuth()

  const features = [
    {
      title: "Extensive Library",
      description: "Access thousands of books across various genres",
      icon: <FaBook className="text-3xl text-purple-500" />
    },
    {
      title: "Easy Download",
      description: "Download your favorite books with a single click",
      icon: <FaDownload className="text-3xl text-purple-500" />
    },
    {
      title: "Personal Collection",
      description: "Save and organize books you love",
      icon: <FaHeart className="text-3xl text-purple-500" />
    },
    {
      title: "Advanced Search",
      description: "Find exactly what you're looking for quickly",
      icon: <FaSearch className="text-3xl text-purple-500" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Next <span className="text-purple-600">Favorite Book</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore thousands of books across various genres. Read, download, and expand your knowledge with our extensive library.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentUser ? (
              <Link 
                to="/library"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition duration-300 inline-flex items-center"
              >
                Explore Library <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <Link 
                to="/register"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition duration-300 inline-flex items-center"
              >
                Get Started <FaArrowRight className="ml-2" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-purple-600">BookHub</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white px-4">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Explore?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of readers who have already discovered their next favorite book on BookHub.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {currentUser ? (
              <Link 
                to="/library"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center"
              >
                Browse Library <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <Link 
                to="/register"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center"
              >
                Create Account <FaArrowRight className="ml-2" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}