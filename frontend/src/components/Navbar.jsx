// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useAuth } from '../hooks/useAuth'
// import { 
//   FaBook, 
//   FaHome, 
//   FaQuestionCircle, 
//   FaUser, 
//   FaSignOutAlt,
//   FaBars,
//   FaTimes
// } from 'react-icons/fa'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { currentUser, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//     setIsOpen(false)
//   }

//   const navItems = [
//     { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
//     { name: 'Library', path: '/library', icon: <FaBook className="mr-2" /> },
//     { name: 'Support', path: '/support', icon: <FaQuestionCircle className="mr-2" /> },
//   ]

//   return (
//     <motion.nav 
//       className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link to="/" className="text-2xl font-bold flex items-center">
//             <FaBook className="mr-2" />
//             Books
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             {navItems.map((item) => (
//               <Link 
//                 key={item.name} 
//                 to={item.path}
//                 className="hover:text-purple-200 transition duration-300 flex items-center"
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             ))}
            
//             {currentUser ? (
//               <div className="flex items-center space-x-4">
//                 <span className="flex items-center">
//                   <FaUser className="mr-2" />
//                   {currentUser.name}
//                 </span>
//                 <button 
//                   onClick={handleLogout}
//                   className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition duration-300 flex items-center"
//                 >
//                   <FaSignOutAlt className="mr-2" />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link 
//                   to="/login" 
//                   className="px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/register" 
//                   className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition duration-300"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white focus:outline-none"
//             >
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <motion.div 
//             className="md:hidden pb-4"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex flex-col space-y-4">
//               {navItems.map((item) => (
//                 <Link 
//                   key={item.name} 
//                   to={item.path}
//                   className="hover:text-purple-200 transition duration-300 flex items-center py-2"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               ))}
              
//               {currentUser ? (
//                 <>
//                   <div className="flex items-center py-2">
//                     <FaUser className="mr-2" />
//                     {currentUser.name}
//                   </div>
//                   <button 
//                     onClick={handleLogout}
//                     className="text-left hover:text-purple-200 transition duration-300 flex items-center py-2"
//                   >
//                     <FaSignOutAlt className="mr-2" />
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link 
//                     to="/login" 
//                     className="hover:text-purple-200 transition duration-300 py-2"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     to="/register" 
//                     className="hover:text-purple-200 transition duration-300 py-2"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.nav>
//   )
// }


// update



// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { 
  FaBook, 
  FaHome, 
  FaQuestionCircle, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
    { name: 'Library', path: '/library', icon: <FaBook className="mr-2" /> },
    { name: 'Support', path: '/support', icon: <FaQuestionCircle className="mr-2" /> },
  ]

  return (
    <motion.nav 
      className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <FaBook className="mr-2" />
            BookHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="hover:text-purple-200 transition duration-300 flex items-center"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* Make profile clickable */}
                <Link 
                  to="/profile" 
                  className="flex items-center hover:text-purple-200 transition duration-300"
                >
                  <FaUser className="mr-2" />
                  {currentUser.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition duration-300 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="hover:text-purple-200 transition duration-300 flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              
              {currentUser ? (
                <>
                  <Link 
                    to="/profile"
                    className="hover:text-purple-200 transition duration-300 flex items-center py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    {currentUser.name}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left hover:text-purple-200 transition duration-300 flex items-center py-2"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="hover:text-purple-200 transition duration-300 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="hover:text-purple-200 transition duration-300 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}