import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationPreferences = ({ preferences: initialPreferences, onSave }) => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isSaving, setIsSaving] = useState(false);

  const notificationTypes = [
    {
      id: 'serviceUpdates',
      label: 'Service Updates',
      description: 'Get notified when your service requests are updated',
      icon: 'Bell'
    },
    {
      id: 'providerMessages',
      label: 'Provider Messages',
      description: 'Receive notifications for new messages from providers',
      icon: 'MessageSquare'
    },
    {
      id: 'paymentAlerts',
      label: 'Payment Alerts',
      description: 'Notifications for payment confirmations and receipts',
      icon: 'CreditCard'
    },
    {
      id: 'emergencyAlerts',
      label: 'Emergency Alerts',
      description: 'Critical safety and emergency notifications',
      icon: 'AlertTriangle'
    },
    {
      id: 'promotions',
      label: 'Promotions & Offers',
      description: 'Special deals and promotional offers',
      icon: 'Tag'
    }
  ];

  const deliveryMethods = [
    {
      id: 'email',
      label: 'Email',
      icon: 'Mail'
    },
    {
      id: 'sms',
      label: 'SMS',
      icon: 'Smartphone'
    },
    {
      id: 'push',
      label: 'Push Notifications',
      icon: 'Bell'
    }
  ];

  const handleNotificationToggle = (notificationId) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [notificationId]: !prev?.notifications?.[notificationId]
      }
    }));
  };

  const handleDeliveryToggle = (methodId) => {
    setPreferences(prev => ({
      ...prev,
      delivery: {
        ...prev?.delivery,
        [methodId]: !prev?.delivery?.[methodId]
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(preferences);
      // Show success feedback
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Notification Preferences</h2>
        <Icon name="Settings" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-6">
        {/* Notification Types */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-4">What would you like to be notified about?</h3>
          <div className="space-y-4">
            {notificationTypes?.map((type) => (
              <div key={type?.id} className="flex items-start space-x-3">
                <Checkbox
                  checked={preferences?.notifications?.[type?.id]}
                  onChange={() => handleNotificationToggle(type?.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={type?.icon} size={16} className="text-text-secondary" />
                    <label className="text-sm font-medium text-text-primary">
                      {type?.label}
                    </label>
                  </div>
                  <p className="text-xs text-text-secondary">{type?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-text-primary mb-4">How would you like to receive notifications?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {deliveryMethods?.map((method) => (
              <div
                key={method?.id}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  preferences?.delivery?.[method?.id]
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleDeliveryToggle(method?.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={preferences?.delivery?.[method?.id]}
                    onChange={() => handleDeliveryToggle(method?.id)}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={method?.icon} size={18} className="text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">
                      {method?.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-text-primary mb-4">Quiet Hours</h3>
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={preferences?.quietHours?.enabled}
              onChange={() => setPreferences(prev => ({
                ...prev,
                quietHours: {
                  ...prev?.quietHours,
                  enabled: !prev?.quietHours?.enabled
                }
              }))}
            />
            <span className="text-sm text-text-primary">
              Enable quiet hours (10:00 PM - 8:00 AM)
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-2 ml-6">
            Non-emergency notifications will be silenced during these hours
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;