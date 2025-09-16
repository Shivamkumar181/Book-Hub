// src/hooks/useAuth.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setLikedBooks(user.likedBooks || []);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setLikedBooks(data.user.likedBooks || []);
        
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setLikedBooks(data.user.likedBooks || []);
        
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setLikedBooks([]);
    toast.info('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        setCurrentUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const toggleBookLike = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/books/${bookId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        let newLikedBooks;
        if (data.isLiked) {
          newLikedBooks = [...likedBooks, bookId];
        } else {
          newLikedBooks = likedBooks.filter(id => id !== bookId);
        }
        setLikedBooks(newLikedBooks);

        // Update current user data
        if (currentUser) {
          const updatedUser = { ...currentUser, likedBooks: newLikedBooks };
          setCurrentUser(updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        }

        return data.isLiked;
      }
      return false;
    } catch (error) {
      console.error('Error toggling book like:', error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    toggleBookLike,
    likedBooks
  };

  

  // return (
  //   <AuthContext.Provider value={value}>
  //     {!loading && children}
  //   </AuthContext.Provider>
  // );


  // update


  // Add this function to your useAuth hook
const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('userData', JSON.stringify(data.user));
      setCurrentUser(data.user);
      // Fetch liked books separately
      fetchLikedBooks();
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

const fetchLikedBooks = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/liked-books`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      setLikedBooks(data.books);
    }
  } catch (error) {
    console.error('Error fetching liked books:', error);
  }
};

// Update the useEffect to fetch profile if user is logged in
useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  
  if (token && userData) {
    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      // Fetch updated profile data
      getProfile();
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
  }
  setLoading(false);
}, []);

return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}