import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionButtons = ({ onPostService, onViewProviders, onEmergency }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Post New Service',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/service-categories-provider-grid'),
      description: 'Request a new service'
    },
    {
      label: 'Saved Providers',
      icon: 'Heart',
      variant: 'outline',
      onClick: onViewProviders,
      description: 'View your favorite providers'
    },
    {
      label: 'Emergency SOS',
      icon: 'AlertTriangle',
      variant: 'destructive',
      onClick: () => navigate('/sos-emergency-system'),
      description: 'Get immediate help'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <div key={index} className="space-y-2">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="h-12"
            >
              {action?.label}
            </Button>
            <p className="text-xs text-text-secondary text-center">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionButtons;