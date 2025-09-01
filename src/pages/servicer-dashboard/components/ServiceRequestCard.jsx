import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceRequestCard = ({ 
  request, 
  onAccept, 
  onDecline, 
  onViewDetails 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAccept(request?.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      await onDecline(request?.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error bg-red-50 border-red-200';
      case 'medium': return 'text-warning bg-amber-50 border-amber-200';
      default: return 'text-success bg-green-50 border-green-200';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const requestTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - requestTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={request?.client?.avatar}
              alt={request?.client?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {request?.client?.verified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{request?.client?.name}</h3>
            <p className="text-sm text-text-secondary">{formatTimeAgo(request?.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request?.urgency)}`}>
            {request?.urgency} priority
          </span>
          <div className="flex items-center text-text-secondary">
            <Icon name="MapPin" size={16} />
            <span className="text-sm ml-1">{request?.distance}km</span>
          </div>
        </div>
      </div>
      {/* Service Details */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Wrench" size={18} className="text-primary" />
          <h4 className="font-medium text-text-primary">{request?.serviceType}</h4>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">{request?.description}</p>
      </div>
      {/* Location & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{request?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{request?.preferredTime}</span>
        </div>
      </div>
      {/* Budget & Photos */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} className="text-success" />
          <span className="font-semibold text-success">${request?.budget}</span>
          <span className="text-sm text-text-secondary">budget</span>
        </div>
        {request?.photos && request?.photos?.length > 0 && (
          <div className="flex items-center space-x-2">
            <Icon name="Camera" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">{request?.photos?.length} photos</span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          size="default"
          onClick={() => onViewDetails(request)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="destructive"
          size="default"
          onClick={handleDecline}
          disabled={isProcessing}
          iconName="X"
          iconPosition="left"
          className="flex-1"
        >
          Decline
        </Button>
        <Button
          variant="success"
          size="default"
          onClick={handleAccept}
          disabled={isProcessing}
          loading={isProcessing}
          iconName="Check"
          iconPosition="left"
          className="flex-1"
        >
          Accept Request
        </Button>
      </div>
    </div>
  );
};

export default ServiceRequestCard;