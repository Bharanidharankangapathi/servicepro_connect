import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onApplyFilters,
  onClearFilters,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      location: { radius: 10, city: '' },
      priceRange: { min: 0, max: 500 },
      rating: 0,
      availability: [],
      verified: false,
      experience: 0
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const availabilityOptions = [
    { id: 'today', label: 'Available Today', count: 23 },
    { id: 'tomorrow', label: 'Available Tomorrow', count: 45 },
    { id: 'weekend', label: 'Weekend Available', count: 67 },
    { id: 'emergency', label: 'Emergency Service', count: 12 }
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings', count: 156 },
    { value: 4.5, label: '4.5+ Stars', count: 89 },
    { value: 4.0, label: '4.0+ Stars', count: 124 },
    { value: 3.5, label: '3.5+ Stars', count: 142 }
  ];

  const experienceOptions = [
    { value: 0, label: 'Any Experience' },
    { value: 1, label: '1+ Years' },
    { value: 3, label: '3+ Years' },
    { value: 5, label: '5+ Years' },
    { value: 10, label: '10+ Years' }
  ];

  // Mobile overlay
  if (isOpen) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
        {/* Mobile slide-out panel */}
        <div className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-strong z-50 transform transition-transform duration-300
          md:relative md:w-full md:h-auto md:shadow-none md:transform-none
          ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          ${className}
        `}>
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 md:hidden"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Location Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>Location</span>
                </h4>
                
                <Input
                  label="City or Area"
                  type="text"
                  placeholder="Enter city or area"
                  value={localFilters?.location?.city || ''}
                  onChange={(e) => handleFilterChange('location', { 
                    ...localFilters?.location, 
                    city: e?.target?.value 
                  })}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Radius: {localFilters?.location?.radius || 10} miles
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={localFilters?.location?.radius || 10}
                    onChange={(e) => handleFilterChange('location', { 
                      ...localFilters?.location, 
                      radius: parseInt(e?.target?.value) 
                    })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>1 mile</span>
                    <span>50 miles</span>
                  </div>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-primary" />
                  <span>Price Range</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Min Price"
                    type="number"
                    placeholder="$0"
                    value={localFilters?.priceRange?.min || ''}
                    onChange={(e) => handleFilterChange('priceRange', { 
                      ...localFilters?.priceRange, 
                      min: parseInt(e?.target?.value) || 0 
                    })}
                  />
                  <Input
                    label="Max Price"
                    type="number"
                    placeholder="$500"
                    value={localFilters?.priceRange?.max || ''}
                    onChange={(e) => handleFilterChange('priceRange', { 
                      ...localFilters?.priceRange, 
                      max: parseInt(e?.target?.value) || 500 
                    })}
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-primary" />
                  <span>Minimum Rating</span>
                </h4>
                
                <div className="space-y-2">
                  {ratingOptions?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={option?.value}
                        checked={localFilters?.rating === option?.value}
                        onChange={(e) => handleFilterChange('rating', parseFloat(e?.target?.value))}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-sm text-text-primary">{option?.label}</span>
                        <span className="text-xs text-text-secondary">({option?.count})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>Availability</span>
                </h4>
                
                <div className="space-y-2">
                  {availabilityOptions?.map((option) => (
                    <Checkbox
                      key={option?.id}
                      label={
                        <div className="flex items-center justify-between w-full">
                          <span>{option?.label}</span>
                          <span className="text-xs text-text-secondary">({option?.count})</span>
                        </div>
                      }
                      checked={localFilters?.availability?.includes(option?.id) || false}
                      onChange={(e) => {
                        const currentAvailability = localFilters?.availability || [];
                        const updatedAvailability = e?.target?.checked
                          ? [...currentAvailability, option?.id]
                          : currentAvailability?.filter(id => id !== option?.id);
                        handleFilterChange('availability', updatedAvailability);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Experience Level</span>
                </h4>
                
                <div className="space-y-2">
                  {experienceOptions?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={option?.value}
                        checked={localFilters?.experience === option?.value}
                        onChange={(e) => handleFilterChange('experience', parseInt(e?.target?.value))}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Provider Filter */}
              <div className="space-y-3">
                <Checkbox
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name="ShieldCheck" size={16} className="text-secondary" />
                      <span>Verified Providers Only</span>
                    </div>
                  }
                  checked={localFilters?.verified || false}
                  onChange={(e) => handleFilterChange('verified', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-border p-6">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button
                  variant="default"
                  onClick={handleApply}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default FilterPanel;