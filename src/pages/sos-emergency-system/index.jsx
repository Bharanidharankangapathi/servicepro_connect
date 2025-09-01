import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGate';
import EmergencyHeader from './components/EmergencyHeader';
import PoliceAlertSection from './components/PoliceAlertSection';
import NeighborNetworkSection from './components/NeighborNetworkSection';
import LocationTracker from './components/LocationTracker';

const SOSEmergencySystem = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyStartTime, setEmergencyStartTime] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [emergencyData, setEmergencyData] = useState(null);
  const [alertedNeighbors, setAlertedNeighbors] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Initialize emergency state from navigation state or localStorage
  useEffect(() => {
    // Check if emergency was auto-activated from SOS button
    if (location?.state?.autoActivated) {
      setIsEmergencyActive(true);
      setEmergencyStartTime(new Date()?.toISOString());
      setEmergencyData(location?.state?.emergencyData);
    }

    // Check for existing emergency data in localStorage
    const storedEmergencyData = localStorage.getItem('emergency_data');
    if (storedEmergencyData) {
      try {
        const parsedData = JSON.parse(storedEmergencyData);
        setEmergencyData(parsedData);
        
        // Check if emergency is still active (within last hour)
        const emergencyTime = new Date(parsedData.timestamp);
        const now = new Date();
        const hoursDiff = (now - emergencyTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 1) {
          setIsEmergencyActive(true);
          setEmergencyStartTime(parsedData?.timestamp);
        }
      } catch (error) {
        console.error('Error parsing stored emergency data:', error);
      }
    }

    // Get user location on component mount
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy
          });
        },
        (error) => {
          console.warn('Location access denied:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    }
  }, [location?.state]);

  // Auto-save emergency state to localStorage
  useEffect(() => {
    if (isEmergencyActive && emergencyData) {
      localStorage.setItem('emergency_data', JSON.stringify({
        ...emergencyData,
        isActive: true,
        startTime: emergencyStartTime
      }));
    }
  }, [isEmergencyActive, emergencyData, emergencyStartTime]);

  const handleEmergencyActivated = (data) => {
    setIsEmergencyActive(true);
    setEmergencyStartTime(new Date()?.toISOString());
    setEmergencyData(data);
    
    // Store in localStorage for persistence
    localStorage.setItem('emergency_data', JSON.stringify({
      ...data,
      isActive: true,
      startTime: new Date()?.toISOString()
    }));
  };

  const handleDeactivateEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyStartTime(null);
    setAlertedNeighbors([]);
    
    // Clear emergency data from localStorage
    localStorage.removeItem('emergency_data');
    
    // Navigate to safety dashboard
    navigate('/user-dashboard', { 
      state: { 
        message: 'Emergency deactivated successfully. You are now safe.',
        type: 'success'
      }
    });
  };

  const handleLocationUpdate = (newLocation) => {
    setUserLocation(newLocation);
    
    // Update emergency data with new location
    if (isEmergencyActive && emergencyData) {
      const updatedData = {
        ...emergencyData,
        location: newLocation,
        lastLocationUpdate: new Date()?.toISOString()
      };
      setEmergencyData(updatedData);
      localStorage.setItem('emergency_data', JSON.stringify(updatedData));
    }
  };

  const handleNeighborAlerted = (neighbors) => {
    setAlertedNeighbors(prev => [...prev, ...neighbors]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Header */}
      <EmergencyHeader
        emergencyActive={isEmergencyActive}
        emergencyStartTime={emergencyStartTime}
        onDeactivateEmergency={handleDeactivateEmergency}
        userLocation={userLocation}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Emergency Status Banner */}
        {!isEmergencyActive && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">!</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-warning">Emergency System Ready</h2>
                <p className="text-sm text-text-secondary">
                  Click the SOS button in either section below to activate emergency protocols.
                  Your location will be shared with emergency services and trusted contacts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Police Alert Section */}
          <div className="h-[600px]">
            <PoliceAlertSection
              onEmergencyActivated={handleEmergencyActivated}
              userLocation={userLocation}
              isEmergencyActive={isEmergencyActive}
            />
          </div>

          {/* Neighbor Network Section */}
          <div className="h-[600px]">
            <NeighborNetworkSection
              userLocation={userLocation}
              onNeighborAlerted={handleNeighborAlerted}
              isEmergencyActive={isEmergencyActive}
            />
          </div>
        </div>

        {/* Location Tracker */}
        <div className="mb-6">
          <LocationTracker
            onLocationUpdate={handleLocationUpdate}
            isEmergencyActive={isEmergencyActive}
            showMap={true}
          />
        </div>

        {/* Emergency Statistics */}
        {isEmergencyActive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-destructive">
                {emergencyData?.id ? '1' : '0'}
              </div>
              <div className="text-sm text-text-secondary">Active Emergency</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {alertedNeighbors?.length}
              </div>
              <div className="text-sm text-text-secondary">Neighbors Alerted</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {userLocation ? '✓' : '✗'}
              </div>
              <div className="text-sm text-text-secondary">Location Shared</div>
            </div>
          </div>
        )}

        {/* Safety Instructions */}
        <div className="mt-6 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Emergency Safety Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text-primary mb-2">During an Emergency:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Stay calm and move to a safe location</li>
                <li>• Keep your phone charged and accessible</li>
                <li>• Do not leave your location unless instructed</li>
                <li>• Provide clear information to responders</li>
                <li>• Follow instructions from emergency personnel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">System Features:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Automatic location sharing with emergency services</li>
                <li>• Instant neighbor network alerts</li>
                <li>• Real-time GPS tracking</li>
                <li>• Direct communication with emergency contacts</li>
                <li>• Secure and private emergency protocols</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSEmergencySystem;