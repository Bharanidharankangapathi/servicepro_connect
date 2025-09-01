import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NeighborNetworkSection = ({ 
  userLocation = null,
  onNeighborAlerted = () => {},
  isEmergencyActive = false 
}) => {
  const [selectedNeighbors, setSelectedNeighbors] = useState([]);
  const [alertsSent, setAlertsSent] = useState([]);
  const [isAlertingAll, setIsAlertingAll] = useState(false);

  // Mock trusted neighbors data
  const trustedNeighbors = [
    {
      id: 'neighbor-1',
      name: 'Sarah Johnson',
      relationship: 'Neighbor',
      distance: '0.2 miles',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 987-6543',
      status: 'online',
      responseTime: '2-3 min',
      trustLevel: 'high',
      lastSeen: '5 minutes ago'
    },
    {
      id: 'neighbor-2',
      name: 'Mike Chen',
      relationship: 'Friend',
      distance: '0.4 miles',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 876-5432',
      status: 'online',
      responseTime: '3-5 min',
      trustLevel: 'high',
      lastSeen: '2 minutes ago'
    },
    {
      id: 'neighbor-3',
      name: 'Emma Rodriguez',
      relationship: 'Emergency Contact',
      distance: '0.6 miles',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 765-4321',
      status: 'away',
      responseTime: '5-8 min',
      trustLevel: 'very-high',
      lastSeen: '15 minutes ago'
    },
    {
      id: 'neighbor-4',
      name: 'David Park',
      relationship: 'Neighbor',
      distance: '0.8 miles',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 654-3210',
      status: 'online',
      responseTime: '8-10 min',
      trustLevel: 'medium',
      lastSeen: '1 minute ago'
    }
  ];

  const handleNeighborSelect = (neighborId) => {
    setSelectedNeighbors(prev => 
      prev?.includes(neighborId) 
        ? prev?.filter(id => id !== neighborId)
        : [...prev, neighborId]
    );
  };

  const handleAlertSelected = async () => {
    if (selectedNeighbors?.length === 0) return;

    const alertPromises = selectedNeighbors?.map(async (neighborId) => {
      // Simulate alert sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      return neighborId;
    });

    try {
      const sentAlerts = await Promise.all(alertPromises);
      setAlertsSent(prev => [...prev, ...sentAlerts]);
      
      const alertedNeighbors = trustedNeighbors?.filter(n => sentAlerts?.includes(n?.id));
      onNeighborAlerted(alertedNeighbors);
      
      setSelectedNeighbors([]);
    } catch (error) {
      console.error('Failed to send neighbor alerts:', error);
    }
  };

  const handleAlertAll = async () => {
    setIsAlertingAll(true);
    
    try {
      // Simulate alerting all neighbors
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const allNeighborIds = trustedNeighbors?.map(n => n?.id);
      setAlertsSent(prev => [...prev, ...allNeighborIds]);
      onNeighborAlerted(trustedNeighbors);
    } catch (error) {
      console.error('Failed to alert all neighbors:', error);
    } finally {
      setIsAlertingAll(false);
    }
  };

  const handleDirectCall = (neighbor) => {
    window.open(`tel:${neighbor?.phone}`);
  };

  const handleDirectMessage = (neighbor) => {
    const message = `Emergency alert from ServicePro Connect. I need immediate assistance. My location: ${
      userLocation ? `${userLocation?.latitude}, ${userLocation?.longitude}` : 'Location unavailable'
    }`;
    window.open(`sms:${neighbor?.phone}?body=${encodeURIComponent(message)}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getTrustLevelColor = (level) => {
    switch (level) {
      case 'very-high': return 'text-success';
      case 'high': return 'text-primary';
      case 'medium': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="h-full bg-card border border-border rounded-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Users" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Neighbor Network</h2>
            <p className="text-sm text-text-secondary">Trusted community support</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-secondary">Available</p>
          <p className="text-lg font-bold text-success">{trustedNeighbors?.filter(n => n?.status === 'online')?.length}</p>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex space-x-3 mb-6">
        <Button
          variant="secondary"
          size="default"
          onClick={handleAlertAll}
          loading={isAlertingAll}
          disabled={alertsSent?.length === trustedNeighbors?.length}
          iconName="Bell"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Alert All
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={handleAlertSelected}
          disabled={selectedNeighbors?.length === 0}
          iconName="Send"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Alert Selected ({selectedNeighbors?.length})
        </Button>
      </div>
      {/* Neighbors List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {trustedNeighbors?.map((neighbor) => {
          const isSelected = selectedNeighbors?.includes(neighbor?.id);
          const isAlerted = alertsSent?.includes(neighbor?.id);
          
          return (
            <div
              key={neighbor?.id}
              className={`
                p-4 rounded-lg border transition-all duration-200 cursor-pointer
                ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                ${isAlerted ? 'bg-success/10 border-success' : ''}
              `}
              onClick={() => !isAlerted && handleNeighborSelect(neighbor?.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar with Status */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={neighbor?.avatar}
                      alt={neighbor?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(neighbor?.status)}`}></div>
                  {isAlerted && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>

                {/* Neighbor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-text-primary truncate">{neighbor?.name}</h3>
                    <span className={`text-xs font-medium ${getTrustLevelColor(neighbor?.trustLevel)}`}>
                      {neighbor?.trustLevel === 'very-high' ? '★★★' : neighbor?.trustLevel === 'high' ? '★★' : '★'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{neighbor?.relationship} • {neighbor?.distance}</p>
                  <p className="text-xs text-text-secondary">Response: {neighbor?.responseTime}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {isAlerted ? (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Check" size={16} />
                      <span className="text-xs font-medium">Alerted</span>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleDirectMessage(neighbor);
                        }}
                        iconName="MessageSquare"
                        iconSize={14}
                        className="touch-target"
                        title="Send message"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleDirectCall(neighbor);
                        }}
                        iconName="Phone"
                        iconSize={14}
                        className="touch-target"
                        title="Call directly"
                      />
                    </>
                  )}
                </div>
              </div>
              {/* Selection Indicator */}
              {isSelected && !isAlerted && (
                <div className="mt-2 pt-2 border-t border-primary/20">
                  <div className="flex items-center space-x-2 text-primary">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs font-medium">Selected for alert</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Network Status */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={16} className="text-success" />
            <span className="text-text-secondary">Network Status</span>
          </div>
          <span className="text-success font-medium">Connected</span>
        </div>
        <div className="mt-2 text-xs text-text-secondary">
          <p>• {alertsSent?.length} neighbors alerted</p>
          <p>• {trustedNeighbors?.filter(n => n?.status === 'online')?.length} neighbors online</p>
          <p>• Average response time: 3-5 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default NeighborNetworkSection;