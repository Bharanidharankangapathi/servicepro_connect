import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities: initialActivities }) => {
  const [activities, setActivities] = useState(initialActivities);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        id: Date.now(),
        type: 'update',
        title: 'Service Update',
        description: 'Your plumbing service request has been updated',
        timestamp: new Date(),
        icon: 'Bell',
        color: 'text-primary'
      };
      
      setActivities(prev => [newActivity, ...prev?.slice(0, 9)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'response': 'MessageSquare',
      'schedule': 'Calendar',
      'payment': 'CreditCard',
      'completion': 'CheckCircle',
      'update': 'Bell'
    };
    return iconMap?.[type] || 'Info';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'response': 'text-primary',
      'schedule': 'text-secondary',
      'payment': 'text-warning',
      'completion': 'text-success',
      'update': 'text-primary'
    };
    return colorMap?.[type] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
        >
          <Icon 
            name="RefreshCw" 
            size={18} 
            className={`text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <div className={`p-2 rounded-md bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {activity?.title}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {activity?.description}
                </p>
                <p className="text-xs text-text-secondary mt-2">
                  {formatTimestamp(activity?.timestamp)}
                </p>
              </div>
              {activity?.unread && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityFeed;