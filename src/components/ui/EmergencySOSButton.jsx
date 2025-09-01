import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

const EmergencySOSButton = ({ 
  className = '',
  size = 'default',
  showLabel = true,
  onEmergencyActivated = () => {},
  disabled = false 
}) => {
  const [isActivating, setIsActivating] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const navigate = useNavigate();

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy
          });
        },
        (error) => {
          setLocationError(error?.message);
          console.warn('Location access denied:', error?.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

  const handleSOSActivation = async () => {
    if (disabled || isActivating) return;

    setIsActivating(true);

    try {
      // Prepare emergency data
      const emergencyData = {
        timestamp: new Date()?.toISOString(),
        location: location,
        userAgent: navigator.userAgent,
        url: window.location?.href,
        emergencyType: 'sos_button_activation'
      };

      // Store emergency data in localStorage for offline access
      localStorage.setItem('emergency_data', JSON.stringify(emergencyData));

      // Call the emergency callback
      onEmergencyActivated(emergencyData);

      // Navigate to emergency screen immediately
      navigate('/sos-emergency-system', { 
        state: { 
          emergencyData,
          autoActivated: true 
        } 
      });

    } catch (error) {
      console.error('Emergency activation error:', error);
      // Still navigate to emergency screen even if data preparation fails
      navigate('/sos-emergency-system', { 
        state: { 
          emergencyData: { 
            timestamp: new Date()?.toISOString(),
            error: error?.message 
          },
          autoActivated: true 
        } 
      });
    } finally {
      // Reset activation state after a short delay
      setTimeout(() => setIsActivating(false), 1000);
    }
  };

  const buttonSizes = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  };

  return (
    <Button
      variant="destructive"
      size={size}
      onClick={handleSOSActivation}
      disabled={disabled || isActivating}
      loading={isActivating}
      className={`
        sos-button emergency-accessible font-semibold
        ${isActivating ? 'animate-pulse-emergency' : ''}
        ${className}
      `}
      iconName="AlertTriangle"
      iconPosition="left"
      iconSize={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
      title="Emergency SOS - Click for immediate help"
      aria-label="Emergency SOS Button - Activate emergency assistance"
    >
      {showLabel && (size !== 'icon') && (
        isActivating ? 'Activating...' : 'SOS'
      )}
    </Button>
  );
};

export default EmergencySOSButton;