import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ 
  onUpdateAvailability, 
  onSendTemplate, 
  onViewProfile,
  availabilityStatus = 'available'
}) => {
  const [isUpdatingAvailability, setIsUpdatingAvailability] = useState(false);

  const quickTemplates = [
    {
      id: 'accept',
      title: 'Accept Request',
      message: `Thank you for choosing our services! I'm available for your request and will arrive at the scheduled time. I'll bring all necessary tools and materials. Looking forward to helping you!`,
      icon: 'Check',
      color: 'text-success'
    },
    {
      id: 'quote',
      title: 'Send Quote',
      message: `Based on your requirements, I can provide this service for $[AMOUNT]. This includes all materials and labor. The work will take approximately [TIME] to complete. Please let me know if you'd like to proceed.`,icon: 'DollarSign',color: 'text-primary'
    },
    {
      id: 'reschedule',title: 'Reschedule Request',
      message: `I apologize, but I need to reschedule our appointment. I have availability on [DATE] at [TIME]. Would this work for you? Thank you for your understanding.`,
      icon: 'Calendar',color: 'text-warning'
    },
    {
      id: 'followup',title: 'Follow Up',
      message: `Hi! I wanted to follow up on the service I provided. I hope everything is working well. If you have any questions or need additional assistance, please don't hesitate to reach out.`,
      icon: 'MessageCircle',
      color: 'text-secondary'
    }
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available', color: 'bg-success', icon: 'CheckCircle' },
    { value: 'busy', label: 'Busy', color: 'bg-warning', icon: 'Clock' },
    { value: 'offline', label: 'Offline', color: 'bg-error', icon: 'XCircle' }
  ];

  const handleAvailabilityChange = async (newStatus) => {
    setIsUpdatingAvailability(true);
    try {
      await onUpdateAvailability(newStatus);
    } finally {
      setIsUpdatingAvailability(false);
    }
  };

  const currentAvailability = availabilityOptions?.find(opt => opt?.value === availabilityStatus);

  return (
    <div className="space-y-6">
      {/* Availability Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Availability Status</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentAvailability?.color}`}></div>
            <span className="text-sm font-medium text-text-primary">{currentAvailability?.label}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {availabilityOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={availabilityStatus === option?.value ? 'default' : 'outline'}
              size="default"
              onClick={() => handleAvailabilityChange(option?.value)}
              disabled={isUpdatingAvailability}
              iconName={option?.icon}
              iconPosition="left"
              className="justify-center"
            >
              {option?.label}
            </Button>
          ))}
        </div>
        
        <p className="text-sm text-text-secondary mt-3">
          Your availability status is visible to potential clients when they browse services.
        </p>
      </div>
      {/* Quick Response Templates */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Quick Response Templates</h3>
          <Icon name="MessageSquare" size={20} className="text-text-secondary" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickTemplates?.map((template) => (
            <div key={template?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={template?.icon} size={16} className={template?.color} />
                </div>
                <h4 className="font-medium text-text-primary">{template?.title}</h4>
              </div>
              
              <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                {template?.message}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendTemplate(template)}
                iconName="Send"
                iconPosition="left"
                fullWidth
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Profile Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Profile Management</h3>
          <Icon name="User" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            size="default"
            onClick={onViewProfile}
            iconName="Eye"
            iconPosition="left"
            fullWidth
          >
            View Public Profile
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={() => {/* Handle edit profile */}}
            iconName="Edit"
            iconPosition="left"
            fullWidth
          >
            Edit Profile & Services
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={() => {/* Handle portfolio */}}
            iconName="Image"
            iconPosition="left"
            fullWidth
          >
            Manage Portfolio
          </Button>
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-text-primary">Emergency Actions</h3>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="destructive"
            size="default"
            onClick={() => {/* Handle emergency contact */}}
            iconName="Phone"
            iconPosition="left"
            fullWidth
          >
            Contact Emergency Support
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={() => {/* Handle report issue */}}
            iconName="Flag"
            iconPosition="left"
            fullWidth
          >
            Report Safety Issue
          </Button>
        </div>
        
        <p className="text-xs text-text-secondary mt-3">
          Use these options only in case of genuine emergencies or safety concerns.
        </p>
      </div>
    </div>
  );
};

export default QuickActions;