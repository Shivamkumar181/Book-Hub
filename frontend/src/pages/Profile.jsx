// // src/pages/Profile.jsx
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../hooks/useAuth';
// import BookCard from '../components/BookCard';
// import { FaUser, FaEdit, FaSave, FaTimes, FaHistory, FaHeart } from 'react-icons/fa';

// export default function Profile() {
//   const { currentUser, updateProfile, likedBooks } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     bio: ''
//   });
//   const [activeTab, setActiveTab] = useState('liked');

//   // useEffect(() => {
//   //   if (currentUser) {
//   //     setFormData({
//   //       name: currentUser.name || '',
//   //       email: currentUser.email || '',
//   //       bio: currentUser.bio || ''
//   //     });
//   //   }
//   // }, [currentUser]);

//   // const handleChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.name]: e.target.value
//   //   });
//   // };

//   // const handleSave = async () => {
//   //   const result = await updateProfile(formData);
//   //   if (result.success) {
//   //     toast.success('Profile updated successfully!');
//   //     setIsEditing(false);
//   //   } else {
//   //     toast.error(result.error || 'Failed to update profile');
//   //   }
//   // };

//   // if (!currentUser) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center">
//   //       <div className="text-center">
//   //         <h2 className="text-2xl font-semibold text-gray-700">Please log in to view your profile</h2>
//   //       </div>
//   //     </div>
//   //   );
//   // }


//   // update
//    // Add this useEffect to fetch user data
// useEffect(() => {
//   const fetchUserData = async () => {
//     if (currentUser) {
//       try {
//         // Fetch updated profile
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${API_BASE_URL}/users/profile`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           setCurrentUser(data.user);
//           setFormData({
//             name: data.user.name || '',
//             email: data.user.email || '',
//             bio: data.user.bio || ''
//           });
//         }

//         // Fetch liked books
//         const likedResponse = await fetch(`${API_BASE_URL}/users/liked-books`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
        
//         const likedData = await likedResponse.json();
//         if (likedData.success) {
//           setLikedBooks(likedData.books);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     }
//   };

//   fetchUserData();
// }, [currentUser]);

// // Update the BookCard mapping to handle proper book objects
// {likedBooks.length > 0 ? (
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//     {likedBooks.slice(0, 4).map(book => (
//       <BookCard key={book._id || book.id} book={book} />
//     ))}
//   </div>
// ) : (
//   <p className="text-gray-500 py-4 text-center">You haven't liked any books yet.</p>
// )
// }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="container mx-auto max-w-4xl">
//         <motion.h1 
//           className="text-4xl font-bold text-center text-gray-800 mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Your Profile
//         </motion.h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Sidebar */}
//           <motion.div 
//             className="bg-white rounded-xl shadow-md p-6"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div className="flex flex-col items-center mb-6">
//               <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//                 <FaUser className="text-purple-600 text-3xl" />
//               </div>
//               <h2 className="text-xl font-semibold">{currentUser.name}</h2>
//               <p className="text-gray-600">{currentUser.email}</p>
//               <p className="text-gray-500 text-sm mt-2">Member since {new Date(currentUser.joinDate).toLocaleDateString()}</p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Liked Books</span>
//                 <span className="font-semibold">{likedBooks.length}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Books Read</span>
//                 <span className="font-semibold">12</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Profile Content */}
//           <motion.div 
//             className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-semibold">Profile Information</h3>
//               {isEditing ? (
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={handleSave}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
//                   >
//                     <FaSave className="mr-2" /> Save
//                   </button>
//                   <button 
//                     onClick={() => setIsEditing(false)}
//                     className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
//                   >
//                     <FaTimes className="mr-2" /> Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <button 
//                   onClick={() => setIsEditing(true)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   <FaEdit className="mr-2" /> Edit
//                 </button>
//               )}
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentUser.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentUser.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
//                 {isEditing ? (
//                   <textarea
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                 ) : (
//                   <p className="px-4 py-2 bg-gray-50 rounded-lg">
//                     {currentUser.bio || "No bio provided yet."}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Tabs for Liked Books and Reading History */}
//             <div className="mt-8">
//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8">
//                   <button
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                       activeTab === 'liked'
//                         ? 'border-purple-500 text-purple-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                     onClick={() => setActiveTab('liked')}
//                   >
//                     <FaHeart className="inline mr-2" /> Liked Books ({likedBooks.length})
//                   </button>
//                   <button
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                       activeTab === 'history'
//                         ? 'border-purple-500 text-purple-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                     onClick={() => setActiveTab('history')}
//                   >
//                     <FaHistory className="inline mr-2" /> Reading History
//                   </button>
//                 </nav>
//               </div>

//               <div className="mt-4">
//                 {activeTab === 'liked' && (
//                   <div>
//                     {likedBooks.length > 0 ? (
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {likedBooks.slice(0, 4).map(book => (
//                           <BookCard key={book.id} book={book} />
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 py-4 text-center">You haven't liked any books yet.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === 'history' && (
//                   <div className="py-4">
//                     <p className="text-gray-500 text-center">Your reading history will appear here.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }



//update
// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaUser, FaEdit, FaSave, FaTimes, FaHeart, FaBookUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simple BookCard component to avoid import issues
const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-500">Book Cover</span>
      </div>
      <h3 className="font-semibold text-lg mb-1">{book.title || 'Untitled'}</h3>
      <p className="text-gray-600 text-sm">by {book.author || 'Unknown'}</p>
    </div>
  );
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    bio: ''
  });
  const [activeTab, setActiveTab] = useState('liked');
  const [loading, setLoading] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token found:', !!token);
    
    if (!token) {
      setError('No authentication token found. Please log in.');
      toast.error('Please log in to access your profile');
      navigate('/login');
      return;
    }
    
    // Simulate loading user data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!localStorage.getItem('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Please log in to view your profile</h2>
          <Link to="/login" className="text-purple-600 hover:underline mt-4 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Profile
          </motion.h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FaUser className="text-purple-600 text-3xl" />
              </div>
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-gray-500 text-sm mt-2">
                Member since {new Date().toLocaleDateString()}
              </p>
              <p className="text-purple-600 text-sm mt-1 capitalize">
                User
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Liked Books</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uploaded Books</span>
                <span className="font-semibold">0</span>
              </div>
            </div>

            {/* Upload Book Button for All Users */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link 
                to="/upload-book"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300 flex items-center justify-center"
              >
                <FaBookUpload className="mr-2" />
                Upload Book
              </Link>
            </div>
          </motion.div>

          {/* Profile Content */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Profile Information</h3>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {formData.bio || "No bio provided yet."}
                  </p>
                )}
              </div>
            </div>

            {/* Tabs for Liked Books and Uploaded Books */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'liked'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('liked')}
                  >
                    <FaHeart className="inline mr-2" /> Liked Books (0)
                  </button>
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'uploaded'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('uploaded')}
                  >
                    <FaBookUpload className="inline mr-2" /> My Uploads (0)
                  </button>
                </nav>
              </div>

              <div className="mt-4">
                {activeTab === 'liked' && (
                  <div>
                    <p className="text-gray-500 py-4 text-center">You haven't liked any books yet.</p>
                  </div>
                )}

                {activeTab === 'uploaded' && (
                  <div>
                    <p className="text-gray-500 py-4 text-center">You haven't uploaded any books yet.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
