// components/ProtectedRoute.js
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;