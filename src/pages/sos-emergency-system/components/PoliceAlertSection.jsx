import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PoliceAlertSection = ({ 
  onEmergencyActivated = () => {},
  userLocation = null,
  isEmergencyActive = false 
}) => {
  const [isActivating, setIsActivating] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('ready');
  const [emergencyId, setEmergencyId] = useState(null);

  // Mock emergency services data
  const emergencyServices = [
    {
      id: 'police',
      name: 'Police Department',
      number: '911',
      directNumber: '(555) 123-4567',
      responseTime: '3-5 minutes',
      status: 'available'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      number: '911',
      directNumber: '(555) 234-5678',
      responseTime: '4-6 minutes',
      status: 'available'
    },
    {
      id: 'medical',
      name: 'Emergency Medical',
      number: '911',
      directNumber: '(555) 345-6789',
      responseTime: '5-8 minutes',
      status: 'available'
    }
  ];

  const handleEmergencyActivation = async () => {
    if (isActivating || alertSent) return;

    setIsActivating(true);
    setConnectionStatus('connecting');

    try {
      // Generate emergency ID
      const newEmergencyId = `EMG-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)}`;
      setEmergencyId(newEmergencyId);

      // Simulate emergency alert process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setConnectionStatus('connected');
      setAlertSent(true);
      
      const emergencyData = {
        id: newEmergencyId,
        timestamp: new Date()?.toISOString(),
        location: userLocation,
        type: 'police_alert',
        status: 'active'
      };

      onEmergencyActivated(emergencyData);

      // Auto-update status
      setTimeout(() => {
        setConnectionStatus('dispatched');
      }, 3000);

    } catch (error) {
      console.error('Emergency activation failed:', error);
      setConnectionStatus('error');
    } finally {
      setIsActivating(false);
    }
  };

  const handleDirectCall = (service) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${service?.directNumber}`);
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connecting': return 'text-warning';
      case 'connected': return 'text-success';
      case 'dispatched': return 'text-primary';
      case 'error': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'connecting': return 'Connecting to emergency services...';
      case 'connected': return 'Emergency alert sent successfully';
      case 'dispatched': return 'Emergency responders dispatched';
      case 'error': return 'Connection failed - try direct call';
      default: return 'Ready to send emergency alert';
    }
  };

  return (
    <div className="h-full bg-card border border-border rounded-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
            <Icon name="Shield" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Police Alert System</h2>
            <p className="text-sm text-text-secondary">Immediate emergency response</p>
          </div>
        </div>
        {emergencyId && (
          <div className="text-right">
            <p className="text-xs text-text-secondary">Emergency ID</p>
            <p className="text-sm font-mono text-text-primary">{emergencyId}</p>
          </div>
        )}
      </div>
      {/* Emergency Button */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <Button
            variant="destructive"
            size="xl"
            onClick={handleEmergencyActivation}
            disabled={isActivating || alertSent}
            loading={isActivating}
            className={`
              w-32 h-32 rounded-full text-xl font-bold shadow-strong
              ${alertSent ? 'bg-success hover:bg-success' : ''}
              ${isActivating ? 'animate-pulse' : ''}
            `}
            iconName={alertSent ? "Check" : "AlertTriangle"}
            iconSize={32}
          >
            {alertSent ? 'SENT' : 'SOS'}
          </Button>
          
          <div className="mt-4">
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusMessage()}
            </p>
            {userLocation && (
              <p className="text-xs text-text-secondary mt-1">
                Location: {userLocation?.latitude?.toFixed(4)}, {userLocation?.longitude?.toFixed(4)}
              </p>
            )}
          </div>
        </div>

        {/* Connection Status Indicator */}
        {(isActivating || alertSent) && (
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connecting' ? 'bg-warning animate-pulse' :
              connectionStatus === 'connected' ? 'bg-success' :
              connectionStatus === 'dispatched'? 'bg-primary' : 'bg-destructive'
            }`}></div>
            <span className="text-sm text-text-secondary">
              {connectionStatus === 'connecting' && 'Establishing connection...'}
              {connectionStatus === 'connected' && 'Connected to dispatch'}
              {connectionStatus === 'dispatched' && 'Help is on the way'}
              {connectionStatus === 'error' && 'Connection failed'}
            </span>
          </div>
        )}
      </div>
      {/* Emergency Services List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Direct Emergency Contacts</h3>
        {emergencyServices?.map((service) => (
          <div key={service?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <Icon 
                  name={service?.id === 'police' ? 'Shield' : service?.id === 'fire' ? 'Flame' : 'Heart'} 
                  size={16} 
                  color="white" 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{service?.name}</p>
                <p className="text-xs text-text-secondary">Response: {service?.responseTime}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDirectCall(service)}
              iconName="Phone"
              iconPosition="left"
              iconSize={14}
              className="touch-target"
            >
              Call
            </Button>
          </div>
        ))}
      </div>
      {/* Emergency Instructions */}
      <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-warning mt-0.5" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium text-warning mb-1">Emergency Instructions:</p>
            <ul className="space-y-1">
              <li>• Stay calm and in a safe location</li>
              <li>• Keep your phone charged and accessible</li>
              <li>• Provide clear location details when asked</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceAlertSection;