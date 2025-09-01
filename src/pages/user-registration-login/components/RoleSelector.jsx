import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, disabled = false }) => {
  const roles = [
    {
      value: 'user',
      label: 'User',
      icon: 'User',
      title: 'Find Services',
      description: 'Book trusted professionals for your home and business needs',
      benefits: [
        'Access verified service providers',
        'Secure payment protection',
        'Emergency SOS system',
        'Real-time tracking'
      ]
    },
    {
      value: 'servicer',
      label: 'Service Provider',
      icon: 'Briefcase',
      title: 'Offer Services',
      description: 'Grow your business by connecting with customers who need your expertise',
      benefits: [
        'Reach more customers',
        'Secure payment processing',
        'Professional verification',
        'Earnings dashboard'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary text-center">
        Choose Your Account Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles?.map((role) => (
          <div
            key={role?.value}
            className={`
              relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedRole === role?.value
                ? 'border-primary bg-primary/5 shadow-moderate'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-subtle'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !disabled && onRoleChange(role?.value)}
          >
            {/* Selection Indicator */}
            <div className={`
              absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selectedRole === role?.value
                ? 'border-primary bg-primary' :'border-border bg-transparent'
              }
            `}>
              {selectedRole === role?.value && (
                <Icon name="Check" size={16} color="white" />
              )}
            </div>

            {/* Role Icon */}
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center mb-4
              ${selectedRole === role?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary'
              }
            `}>
              <Icon name={role?.icon} size={24} />
            </div>

            {/* Role Info */}
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold text-text-primary">
                  {role?.title}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {role?.description}
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-1">
                {role?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;