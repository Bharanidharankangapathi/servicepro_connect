import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Authentication Context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  userRole: 'user',
  login: () => {},
  logout: () => {},
  setUserRole: () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGate');
  }
  return context;
};

// Authentication Provider Component
export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedAuth = localStorage.getItem('servicepro_auth');
        const storedUser = localStorage.getItem('servicepro_user');
        const storedRole = localStorage.getItem('servicepro_role');

        if (storedAuth === 'true' && storedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
          setUserRole(storedRole || 'user');
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);
        // Clear corrupted data
        localStorage.removeItem('servicepro_auth');
        localStorage.removeItem('servicepro_user');
        localStorage.removeItem('servicepro_role');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, role = 'user') => {
    try {
      setIsAuthenticated(true);
      setUser(userData);
      setUserRole(role);
      
      // Persist to localStorage
      localStorage.setItem('servicepro_auth', 'true');
      localStorage.setItem('servicepro_user', JSON.stringify(userData));
      localStorage.setItem('servicepro_role', role);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      setUserRole('user');
      
      // Clear localStorage
      localStorage.removeItem('servicepro_auth');
      localStorage.removeItem('servicepro_user');
      localStorage.removeItem('servicepro_role');
      
      // Clear any emergency data
      localStorage.removeItem('emergency_data');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const changeUserRole = (newRole) => {
    if (isAuthenticated && (newRole === 'user' || newRole === 'servicer')) {
      setUserRole(newRole);
      localStorage.setItem('servicepro_role', newRole);
    }
  };

  const contextValue = {
    isAuthenticated,
    user,
    userRole,
    isLoading,
    login,
    logout,
    setUserRole: changeUserRole
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Loading ServicePro Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/user-registration-login' }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = userRole === 'servicer' ? '/servicer-dashboard' : '/user-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

// Public Route Component (redirects authenticated users)
export const PublicRoute = ({ children, redirectTo = null }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (isAuthenticated && !redirectTo) {
    // Default redirect based on user role
    const dashboardPath = userRole === 'servicer' ? '/servicer-dashboard' : '/user-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

// Role-based navigation helper
export const useRoleNavigation = () => {
  const { userRole, isAuthenticated } = useAuth();

  const getDashboardPath = () => {
    if (!isAuthenticated) return '/user-registration-login';
    return userRole === 'servicer' ? '/servicer-dashboard' : '/user-dashboard';
  };

  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Services',
        path: '/service-categories-provider-grid',
        icon: 'Search',
        roles: ['user', 'servicer', 'guest']
      }
    ];

    if (isAuthenticated) {
      baseItems?.push({
        label: userRole === 'servicer' ? 'Provider Dashboard' : 'My Dashboard',
        path: getDashboardPath(),
        icon: userRole === 'servicer' ? 'BarChart3' : 'Home',
        roles: ['user', 'servicer']
      });
    }

    return baseItems;
  };

  return {
    getDashboardPath,
    getNavigationItems,
    userRole,
    isAuthenticated
  };
};

// Main Authentication Gate Component
const AuthenticationGate = ({ children }) => {
  return (
    <AuthenticationProvider>
      {children}
    </AuthenticationProvider>
  );
};

export default AuthenticationGate;