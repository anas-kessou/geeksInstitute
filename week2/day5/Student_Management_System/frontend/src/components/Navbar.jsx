import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">SMS</h1>
            <span className="ml-4 text-sm text-primary-100">
              Student Management System
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-primary-200 capitalize">
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-primary-700 hover:bg-primary-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
