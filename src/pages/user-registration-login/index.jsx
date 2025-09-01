import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGate';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import EmergencySOSButton from '../../components/ui/EmergencySOSButton';
import Icon from '../../components/AppIcon';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get redirect path from location state
  const from = location?.state?.from?.pathname || null;

  const handleAuthSuccess = async (userData, userRole) => {
    setIsProcessing(true);

    try {
      // Login user through auth context
      login(userData, userRole);

      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Determine redirect path
      let redirectPath;
      if (from && from !== '/user-registration-login') {
        redirectPath = from;
      } else {
        redirectPath = userRole === 'servicer' ? '/servicer-dashboard' : '/user-dashboard';
      }

      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Authentication error:', error);
      setIsProcessing(false);
    }
  };

  const handleTabChange = (tabId) => {
    if (!isProcessing) {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency SOS Button - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <EmergencySOSButton size="default" />
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <AuthHeader
              title={activeTab === 'login' ? 'Welcome Back' : 'Join ServicePro Connect'}
              subtitle={
                activeTab === 'login' ?'Sign in to access your account and manage your services' :'Create your account and start connecting with trusted professionals'
              }
            />

            {/* Processing Overlay */}
            {isProcessing && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-card p-6 rounded-lg shadow-strong flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-text-primary font-medium">Setting up your account...</p>
                </div>
              </div>
            )}

            {/* Auth Tabs */}
            <AuthTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              disabled={isProcessing}
            />

            {/* Auth Forms */}
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} />
              ) : (
                <RegistrationForm onSuccess={handleAuthSuccess} />
              )}
            </div>

            {/* Navigation Links */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button
                  onClick={() => navigate('/landing-page')}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                  disabled={isProcessing}
                >
                  <Icon name="ArrowLeft" size={16} />
                  <span>Back to Home</span>
                </button>
                <span className="text-border">|</span>
                <button
                  onClick={() => navigate('/service-categories-provider-grid')}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                  disabled={isProcessing}
                >
                  <Icon name="Search" size={16} />
                  <span>Browse Services</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Signals & Features */}
        <div className="lg:w-96 bg-muted p-4 sm:p-6 lg:p-8 flex items-center">
          <div className="w-full space-y-8">
            {/* Welcome Message */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Why Choose ServicePro Connect?
              </h2>
              <p className="text-text-secondary">
                Join thousands of satisfied customers and verified service providers in our trusted marketplace.
              </p>
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-xs text-text-secondary">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">50K+</div>
                <div className="text-xs text-text-secondary">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">99.9%</div>
                <div className="text-xs text-text-secondary">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-xs text-text-secondary">Support</div>
              </div>
            </div>

            {/* Customer Testimonial */}
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <p className="text-sm text-text-primary mb-2">
                    "ServicePro Connect made finding a reliable plumber so easy. The SOS feature gives me peace of mind!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-text-primary">Sarah Johnson</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationLogin;