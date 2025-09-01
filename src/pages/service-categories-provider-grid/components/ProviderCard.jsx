import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderCard = ({ provider, onQuickContact, className = '' }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // Navigate to provider detail page (would be implemented)
    console.log('Navigate to provider profile:', provider?.id);
  };

  const handleQuickContact = (e) => {
    e?.stopPropagation();
    onQuickContact(provider);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const truncateText = (text, maxLength = 100) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'busy': return 'text-yellow-600 bg-yellow-50';
      case 'offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available Now';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`
      bg-white rounded-xl border border-border hover:border-primary hover:shadow-moderate 
      transition-all duration-200 overflow-hidden group cursor-pointer
      ${className}
    `}>
      {/* Provider Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <Image
          src={provider?.image}
          alt={`${provider?.name} - ${provider?.specialty}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={handleImageLoad}
          onClick={handleViewProfile}
        />
        
        {/* Verification Badge */}
        {provider?.isVerified && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
            <Icon name="ShieldCheck" size={12} />
            <span>Verified</span>
          </div>
        )}
        
        {/* Availability Status */}
        <div className={`
          absolute top-3 right-3 px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium
          ${getAvailabilityColor(provider?.availability)}
        `}>
          <div className={`w-2 h-2 rounded-full ${
            provider?.availability === 'available' ? 'bg-green-500' :
            provider?.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span>{getAvailabilityText(provider?.availability)}</span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            variant="default"
            size="sm"
            onClick={handleViewProfile}
            iconName="Eye"
            iconPosition="left"
            className="bg-white text-text-primary hover:bg-gray-50"
          >
            View Profile
          </Button>
        </div>
      </div>
      {/* Provider Info */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {provider?.name}
            </h3>
            <p className="text-sm text-text-secondary">
              {provider?.specialty}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-text-primary">
              {provider?.rating}
            </span>
            <span className="text-xs text-text-secondary">
              ({provider?.reviewCount})
            </span>
          </div>
        </div>

        {/* Experience & Location */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>{provider?.experience} years exp</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{provider?.distance} away</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-text-secondary leading-relaxed">
            {showFullDescription ? provider?.description : truncateText(provider?.description)}
          </p>
          {provider?.description?.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs text-primary hover:text-blue-700 mt-1 font-medium"
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Skills/Services */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {provider?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {provider?.skills?.length > 3 && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                +{provider?.skills?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-text-secondary">Starting from</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-text-primary">
                ${provider?.startingPrice}
              </span>
              <span className="text-sm text-text-secondary">/hour</span>
            </div>
          </div>
          
          {provider?.responseTime && (
            <div className="text-right">
              <span className="text-xs text-text-secondary">Response time</span>
              <p className="text-sm font-medium text-text-primary">
                {provider?.responseTime}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            className="flex-1"
            iconName="User"
            iconPosition="left"
          >
            View Profile
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleQuickContact}
            className="flex-1"
            iconName="MessageCircle"
            iconPosition="left"
            disabled={provider?.availability === 'offline'}
          >
            Contact
          </Button>
        </div>

        {/* Last Active */}
        {provider?.lastActive && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-text-secondary text-center">
              Last active {provider?.lastActive}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;