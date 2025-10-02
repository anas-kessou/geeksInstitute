import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const userRole = getUserRole();
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard if user doesn't have access
    switch (userRole) {
      case 'director':
        return <Navigate to="/director-dashboard" replace />;
      case 'teacher':
        return <Navigate to="/teacher-dashboard" replace />;
      case 'student':
        return <Navigate to="/student-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
