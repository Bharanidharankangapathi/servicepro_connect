import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationTracker = ({ 
  onLocationUpdate = () => {},
  isEmergencyActive = false,
  showMap = true 
}) => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Start location tracking when emergency is active
  useEffect(() => {
    if (isEmergencyActive) {
      startLocationTracking();
    } else {
      stopLocationTracking();
    }

    return () => stopLocationTracking();
  }, [isEmergencyActive]);

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsTracking(true);
    setLocationError(null);

    // Get initial position with high accuracy
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          accuracy: position?.coords?.accuracy,
          timestamp: new Date()?.toISOString()
        };
        
        setLocation(newLocation);
        setAccuracy(position?.coords?.accuracy);
        setLastUpdate(new Date());
        onLocationUpdate(newLocation);
      },
      (error) => {
        setLocationError(error?.message);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    // Watch position for continuous updates
    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          accuracy: position?.coords?.accuracy,
          timestamp: new Date()?.toISOString()
        };
        
        setLocation(newLocation);
        setAccuracy(position?.coords?.accuracy);
        setLastUpdate(new Date());
        onLocationUpdate(newLocation);
      },
      (error) => {
        console.warn('Location tracking error:', error);
        setLocationError(error?.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000 // 30 seconds
      }
    );

    // Store watch ID for cleanup
    window.locationWatchId = watchId;
  };

  const stopLocationTracking = () => {
    if (window.locationWatchId) {
      navigator.geolocation?.clearWatch(window.locationWatchId);
      window.locationWatchId = null;
    }
    setIsTracking(false);
  };

  const handleManualRefresh = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy,
            timestamp: new Date()?.toISOString()
          };
          
          setLocation(newLocation);
          setAccuracy(position?.coords?.accuracy);
          setLastUpdate(new Date());
          onLocationUpdate(newLocation);
        },
        (error) => {
          setLocationError(error?.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  const getAccuracyStatus = () => {
    if (!accuracy) return { color: 'text-text-secondary', text: 'Unknown' };
    if (accuracy <= 10) return { color: 'text-success', text: 'Excellent' };
    if (accuracy <= 50) return { color: 'text-primary', text: 'Good' };
    if (accuracy <= 100) return { color: 'text-warning', text: 'Fair' };
    return { color: 'text-destructive', text: 'Poor' };
  };

  const formatCoordinate = (coord) => {
    return coord ? coord?.toFixed(6) : 'N/A';
  };

  const accuracyStatus = getAccuracyStatus();

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Location Tracker</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isTracking && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Live</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={!navigator.geolocation}
            iconName="RefreshCw"
            iconSize={14}
            className="touch-target"
          />
        </div>
      </div>
      {/* Location Information */}
      {location ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary">Latitude</p>
              <p className="text-sm font-mono text-text-primary">{formatCoordinate(location?.latitude)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Longitude</p>
              <p className="text-sm font-mono text-text-primary">{formatCoordinate(location?.longitude)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">Accuracy</p>
              <p className={`text-sm font-medium ${accuracyStatus?.color}`}>
                {accuracy ? `±${Math.round(accuracy)}m` : 'N/A'} ({accuracyStatus?.text})
              </p>
            </div>
            {lastUpdate && (
              <div className="text-right">
                <p className="text-xs text-text-secondary">Last Update</p>
                <p className="text-sm text-text-primary">{lastUpdate?.toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          {/* Map Display */}
          {showMap && (
            <div className="mt-4">
              <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Emergency Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=16&output=embed`}
                  className="border-0"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
                <span>Real-time location sharing active</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const url = `https://maps.google.com/?q=${location?.latitude},${location?.longitude}`;
                    window.open(url, '_blank');
                  }}
                  iconName="ExternalLink"
                  iconSize={12}
                  className="text-xs"
                >
                  Open in Maps
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : locationError ? (
        <div className="text-center py-6">
          <Icon name="AlertCircle" size={32} className="text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive font-medium mb-2">Location Access Error</p>
          <p className="text-xs text-text-secondary mb-4">{locationError}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
          >
            Retry Location Access
          </Button>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-text-secondary">Getting your location...</p>
        </div>
      )}
      {/* Location Sharing Status */}
      {isEmergencyActive && location && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <div className="text-sm">
              <p className="font-medium text-success">Location Shared with Emergency Services</p>
              <p className="text-xs text-text-secondary">Your precise location is being transmitted to responders</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;