import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingServices = ({ services }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const calculateCountdown = (scheduledDate) => {
    const now = currentTime;
    const scheduled = new Date(scheduledDate);
    const diff = scheduled - now;

    if (diff <= 0) return 'Starting soon';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getServiceIcon = (category) => {
    const iconMap = {
      'plumbing': 'Wrench',
      'electrical': 'Zap',
      'cleaning': 'Sparkles',
      'security': 'Shield',
      'maintenance': 'Settings'
    };
    return iconMap?.[category] || 'Tool';
  };

  const getUrgencyColor = (scheduledDate) => {
    const now = currentTime;
    const scheduled = new Date(scheduledDate);
    const diff = scheduled - now;
    const hours = diff / (1000 * 60 * 60);

    if (hours <= 2) return 'text-error border-error/20 bg-red-50';
    if (hours <= 24) return 'text-warning border-amber-200 bg-amber-50';
    return 'text-primary border-primary/20 bg-primary/5';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Upcoming Services</h2>
        <Icon name="Calendar" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-4">
        {services?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CalendarX" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No upcoming services</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              iconName="Plus"
              iconPosition="left"
            >
              Schedule Service
            </Button>
          </div>
        ) : (
          services?.map((service) => (
            <div
              key={service?.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-moderate ${getUrgencyColor(service?.scheduledDate)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-white">
                    <Icon name={getServiceIcon(service?.category)} size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{service?.title}</h3>
                    <p className="text-sm text-text-secondary">{service?.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {calculateCountdown(service?.scheduledDate)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {new Date(service.scheduledDate)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{service?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={14} />
                    <span>${service?.price}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingServices;