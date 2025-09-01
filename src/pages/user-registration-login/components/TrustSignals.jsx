import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'UserCheck',
      title: 'Verified Providers',
      description: 'All service providers are background checked'
    },
    {
      icon: 'AlertTriangle',
      title: 'Emergency SOS',
      description: 'Built-in safety system for your protection'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Payments',
      description: 'Protected transactions with escrow system'
    }
  ];

  const certifications = [
    { name: 'SSL Certified', icon: 'Lock' },
    { name: 'Privacy Compliant', icon: 'Eye' },
    { name: '24/7 Support', icon: 'Headphones' }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-text-secondary">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-center space-x-6">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name={cert?.icon} size={14} className="text-success" />
              <span>{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Privacy Links */}
      <div className="text-center space-y-2">
        <p className="text-xs text-text-secondary">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-200">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <span className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>256-bit SSL</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Lock" size={12} className="text-success" />
            <span>GDPR Compliant</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;