import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleAwareHeader = ({ 
  isAuthenticated = false, 
  userRole = 'user', 
  onRoleChange = () => {}, 
  onSignOut = () => {},
  userName = '',
  isCollapsed = false 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSOSClick = () => {
    navigate('/sos-emergency-system');
    setIsMobileMenuOpen(false);
  };

  const handleRoleToggle = () => {
    const newRole = userRole === 'user' ? 'servicer' : 'user';
    onRoleChange(newRole);
    
    // Navigate to appropriate dashboard
    if (newRole === 'servicer') {
      navigate('/servicer-dashboard');
    } else {
      navigate('/user-dashboard');
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    navigate('/landing-page');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
      if (!event?.target?.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigationItems = [
    {
      label: 'Services',
      path: '/service-categories-provider-grid',
      icon: 'Search',
      roles: ['user', 'servicer', 'guest']
    },
    {
      label: userRole === 'servicer' ? 'Provider Dashboard' : 'My Dashboard',
      path: userRole === 'servicer' ? '/servicer-dashboard' : '/user-dashboard',
      icon: userRole === 'servicer' ? 'BarChart3' : 'Home',
      roles: ['user', 'servicer']
    }
  ];

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Wrench" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-text-primary">
        ServicePro Connect
      </span>
    </Link>
  );

  const RoleToggle = () => (
    <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
      <span className="text-sm text-text-secondary">Role:</span>
      <button
        onClick={handleRoleToggle}
        className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
      >
        <Icon 
          name={userRole === 'servicer' ? 'Briefcase' : 'User'} 
          size={16} 
        />
        <span className="capitalize">{userRole}</span>
        <Icon name="RefreshCw" size={14} />
      </button>
    </div>
  );

  const SOSButton = () => (
    <Button
      variant="destructive"
      size="default"
      onClick={handleSOSClick}
      className="sos-button emergency-accessible font-semibold"
      iconName="AlertTriangle"
      iconPosition="left"
      iconSize={18}
    >
      SOS
    </Button>
  );

  const UserMenu = () => (
    <div className="relative user-menu-container">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <span className="text-sm font-medium text-text-primary hidden sm:block">
          {userName || 'Account'}
        </span>
        <Icon name="ChevronDown" size={16} className="text-text-secondary" />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-moderate z-dropdown animate-slide-down">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-text-primary">{userName}</p>
              <p className="text-xs text-text-secondary capitalize">{userRole} Account</p>
            </div>
            <button
              onClick={() => {
                setShowUserMenu(false);
                navigate('/user-dashboard');
              }}
              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Settings</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Items */}
            <nav className="flex items-center space-x-1">
              {navigationItems?.filter(item => 
                  !isAuthenticated ? item?.roles?.includes('guest') : 
                  item?.roles?.includes(userRole)
                )?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`nav-item px-3 py-2 text-sm font-medium flex items-center space-x-2 ${
                      location?.pathname === item?.path
                        ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
            </nav>

            {/* Role Toggle (authenticated users only) */}
            {isAuthenticated && <RoleToggle />}

            {/* SOS Button */}
            <SOSButton />

            {/* Authentication */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/user-registration-login"
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/user-registration-login')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <SOSButton />
            <div className="mobile-menu-container">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon 
                  name={isMobileMenuOpen ? "X" : "Menu"} 
                  size={24} 
                  className="text-text-primary" 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-slide-down">
            <div className="py-4 space-y-2">
              {/* Navigation Items */}
              {navigationItems?.filter(item => 
                  !isAuthenticated ? item?.roles?.includes('guest') : 
                  item?.roles?.includes(userRole)
                )?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`block px-4 py-3 text-base font-medium rounded-lg mx-2 flex items-center space-x-3 ${
                      location?.pathname === item?.path
                        ? 'text-primary bg-primary/10' :'text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}

              {/* Role Toggle (authenticated users only) */}
              {isAuthenticated && (
                <div className="px-4 py-2">
                  <RoleToggle />
                </div>
              )}

              {/* Authentication */}
              {isAuthenticated ? (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-text-primary">{userName}</p>
                    <p className="text-xs text-text-secondary capitalize">{userRole} Account</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/user-dashboard');
                    }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-text-primary hover:bg-muted flex items-center space-x-3"
                  >
                    <Icon name="Settings" size={20} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-base font-medium text-text-primary hover:bg-muted flex items-center space-x-3"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-4 mt-4 px-4 space-y-3">
                  <Link
                    to="/user-registration-login"
                    className="block w-full text-center py-3 text-base font-medium text-text-primary hover:bg-muted rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Button
                    variant="default"
                    size="default"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/user-registration-login');
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default RoleAwareHeader;