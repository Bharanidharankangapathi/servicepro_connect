import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-primary rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Connect with
            <span className="text-primary"> Trusted </span>
            Service Providers
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Find verified professionals for your home services with AI-powered matching, 
            secure payments, and innovative safety features including our SOS emergency system.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span>Verified Providers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-emergency" />
              <span>SOS Safety System</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-accent" />
              <span>Rated & Reviewed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/user-registration-login')}
              iconName="Search"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Find Services
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/user-registration-login')}
              iconName="Briefcase"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Become a Provider
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-text-secondary">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">50K+</div>
              <div className="text-text-secondary">Services Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">4.9</div>
              <div className="text-text-secondary">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-success mb-2">24/7</div>
              <div className="text-text-secondary">SOS Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;