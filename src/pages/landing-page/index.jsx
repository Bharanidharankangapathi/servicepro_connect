import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import SafetyInnovationSection from './components/SafetyInnovationSection';
import ServiceCategoriesPreview from './components/ServiceCategoriesPreview';
import Footer from './components/Footer';
import { useAuth } from '../../components/ui/AuthenticationGate';

const LandingPage = () => {
  const { isAuthenticated, user, userRole, setUserRole, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };

  const handleSignOut = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Loading ServicePro Connect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ServicePro Connect - Trusted Home Services with Safety First</title>
        <meta 
          name="description" 
          content="Connect with verified service providers for all your home needs. AI-powered matching, secure payments, and innovative SOS emergency system for your safety." 
        />
        <meta name="keywords" content="home services, plumber, electrician, housekeeping, emergency services, SOS, trusted providers" />
        <meta property="og:title" content="ServicePro Connect - Trusted Home Services" />
        <meta property="og:description" content="Find verified professionals with AI-powered matching and emergency safety features." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://serviceproconnect.com/landing-page" />
      </Helmet>

      {/* Header */}
      <RoleAwareHeader
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onSignOut={handleSignOut}
        userName={user?.name || user?.email || ''}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Safety Innovation Section */}
        <SafetyInnovationSection />

        {/* Service Categories Preview */}
        <ServiceCategoriesPreview />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;