import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyHeader = ({ 
  emergencyActive = false,
  emergencyStartTime = null,
  onDeactivateEmergency = () => {},
  userLocation = null 
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const navigate = useNavigate();

  // Timer for emergency duration
  useEffect(() => {
    if (emergencyActive && emergencyStartTime) {
      const interval = setInterval(() => {
        const now = new Date()?.getTime();
        const start = new Date(emergencyStartTime)?.getTime();
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [emergencyActive, emergencyStartTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleDeactivateEmergency = () => {
    if (showDeactivateConfirm) {
      onDeactivateEmergency();
      setShowDeactivateConfirm(false);
    } else {
      setShowDeactivateConfirm(true);
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => setShowDeactivateConfirm(false), 5000);
    }
  };

  const handleBackToSafety = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="bg-destructive text-destructive-foreground p-4 shadow-strong">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Emergency Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-lg font-bold">EMERGENCY ACTIVE</span>
            </div>
            
            {emergencyActive && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Duration: {formatTime(elapsedTime)}</span>
                </div>
                {userLocation && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>Location Shared</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {emergencyActive && (
              <Button
                variant={showDeactivateConfirm ? "destructive" : "outline"}
                size="sm"
                onClick={handleDeactivateEmergency}
                className={`
                  ${showDeactivateConfirm ? 'bg-white text-destructive hover:bg-gray-100' : 'border-white text-white hover:bg-white hover:text-destructive'}
                  font-semibold transition-all duration-200
                `}
                iconName={showDeactivateConfirm ? "AlertTriangle" : "Square"}
                iconPosition="left"
                iconSize={16}
              >
                {showDeactivateConfirm ? 'Confirm End Emergency' : 'End Emergency'}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToSafety}
              className="border-white text-white hover:bg-white hover:text-destructive font-semibold"
              iconName="Home"
              iconPosition="left"
              iconSize={16}
            >
              Back to Safety
            </Button>
          </div>
        </div>

        {/* Emergency Instructions Bar */}
        <div className="mt-3 p-3 bg-white/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Emergency Protocol Active:</p>
              <div className="flex flex-wrap gap-4 text-xs">
                <span>• Stay in a safe location</span>
                <span>• Keep your phone accessible</span>
                <span>• Wait for emergency responders</span>
                <span>• Do not leave your current location unless instructed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deactivation Warning */}
        {showDeactivateConfirm && (
          <div className="mt-3 p-3 bg-warning/20 border border-warning/30 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-semibold">
                Are you sure you want to end the emergency? Click "Confirm End Emergency" again to proceed.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyHeader;