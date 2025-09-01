import React, { useState } from 'react';
import Icon from '../AppIcon';

const RoleToggleSwitch = ({ 
  currentRole = 'user',
  onRoleChange = () => {},
  disabled = false,
  showLabel = true,
  size = 'default',
  className = ''
}) => {
  const [isChanging, setIsChanging] = useState(false);

  const handleRoleToggle = async () => {
    if (disabled || isChanging) return;

    setIsChanging(true);
    
    try {
      const newRole = currentRole === 'user' ? 'servicer' : 'user';
      
      // Simulate role change processing
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onRoleChange(newRole);
    } catch (error) {
      console.error('Role change error:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const roleConfig = {
    user: {
      label: 'User',
      icon: 'User',
      description: 'Find and book services',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    servicer: {
      label: 'Provider',
      icon: 'Briefcase',
      description: 'Offer your services',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  };

  const currentConfig = roleConfig?.[currentRole];
  const nextRole = currentRole === 'user' ? 'servicer' : 'user';
  const nextConfig = roleConfig?.[nextRole];

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showLabel && (
        <div className="hidden sm:block">
          <span className="text-sm text-text-secondary">Role:</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleRoleToggle}
          disabled={disabled || isChanging}
          className={`
            role-toggle flex items-center space-x-2 rounded-lg border border-border
            ${sizeClasses?.[size]}
            ${currentConfig?.bgColor}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-subtle cursor-pointer'}
            ${isChanging ? 'animate-pulse' : ''}
            transition-all duration-200 ease-out
          `}
          title={`Switch to ${nextConfig?.label} mode`}
          aria-label={`Current role: ${currentConfig?.label}. Click to switch to ${nextConfig?.label}`}
        >
          {/* Current Role Icon */}
          <div className={`
            flex items-center justify-center w-6 h-6 rounded-md
            ${currentRole === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
          `}>
            <Icon 
              name={currentConfig?.icon} 
              size={14} 
            />
          </div>
          
          {/* Role Label */}
          <span className={`font-medium ${currentConfig?.color}`}>
            {currentConfig?.label}
          </span>
          
          {/* Toggle Indicator */}
          <div className="flex items-center">
            {isChanging ? (
              <Icon 
                name="Loader2" 
                size={16} 
                className="animate-spin text-text-secondary" 
              />
            ) : (
              <Icon 
                name="RefreshCw" 
                size={14} 
                className="text-text-secondary" 
              />
            )}
          </div>
        </button>

        {/* Tooltip on hover (desktop only) */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-moderate text-sm text-popover-foreground opacity-0 pointer-events-none transition-opacity duration-200 hover:opacity-100 z-dropdown hidden lg:block">
          <div className="text-center">
            <p className="font-medium">Switch to {nextConfig?.label}</p>
            <p className="text-xs text-text-secondary mt-1">{nextConfig?.description}</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
        </div>
      </div>
      {/* Mobile Role Description */}
      {showLabel && (
        <div className="sm:hidden">
          <p className="text-xs text-text-secondary">{currentConfig?.description}</p>
        </div>
      )}
    </div>
  );
};

// Compact version for mobile/tight spaces
export const CompactRoleToggle = ({ 
  currentRole = 'user',
  onRoleChange = () => {},
  disabled = false 
}) => {
  const [isChanging, setIsChanging] = useState(false);

  const handleToggle = async () => {
    if (disabled || isChanging) return;
    
    setIsChanging(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newRole = currentRole === 'user' ? 'servicer' : 'user';
    onRoleChange(newRole);
    setIsChanging(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled || isChanging}
      className={`
        relative w-12 h-6 rounded-full transition-colors duration-200
        ${currentRole === 'user' ? 'bg-primary' : 'bg-secondary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      title={`Switch to ${currentRole === 'user' ? 'Provider' : 'User'} mode`}
    >
      <div className={`
        absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200
        ${currentRole === 'user' ? 'left-0.5' : 'left-6'}
        flex items-center justify-center
      `}>
        <Icon 
          name={currentRole === 'user' ? 'User' : 'Briefcase'} 
          size={12} 
          className={currentRole === 'user' ? 'text-primary' : 'text-secondary'}
        />
      </div>
    </button>
  );
};

export default RoleToggleSwitch;