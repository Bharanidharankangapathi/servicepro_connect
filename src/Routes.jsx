import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ServicerDashboard from './pages/servicer-dashboard';
import LandingPage from './pages/landing-page';
import UserDashboard from './pages/user-dashboard';
import SOSEmergencySystem from './pages/sos-emergency-system';
import ServiceCategoriesProviderGrid from './pages/service-categories-provider-grid';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/servicer-dashboard" element={<ServicerDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/sos-emergency-system" element={<SOSEmergencySystem />} />
        <Route path="/service-categories-provider-grid" element={<ServiceCategoriesProviderGrid />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
