import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RequestFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  requestCount = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const serviceTypes = [
    'All Services',
    'Plumbing',
    'Electrical',
    'Housekeeping',
    'Security',
    'Maintenance',
    'Gardening',
    'Painting',
    'Carpentry'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget_high', label: 'Highest Budget' },
    { value: 'budget_low', label: 'Lowest Budget' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'urgency', label: 'Most Urgent' }
  ];

  const urgencyLevels = ['All', 'High', 'Medium', 'Low'];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters?.serviceType !== 'All Services' ||
           filters?.urgency !== 'All' ||
           filters?.minBudget ||
           filters?.maxBudget ||
           filters?.maxDistance ||
           filters?.dateRange !== 'all';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Filter Requests</h3>
          <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {requestCount} requests
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Service Type</label>
          <select
            value={filters?.serviceType}
            onChange={(e) => handleFilterChange('serviceType', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {serviceTypes?.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Sort By</label>
          <select
            value={filters?.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Priority</label>
          <select
            value={filters?.urgency}
            onChange={(e) => handleFilterChange('urgency', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {urgencyLevels?.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Max Distance */}
        <div>
          <Input
            label="Max Distance (km)"
            type="number"
            placeholder="e.g., 10"
            value={filters?.maxDistance}
            onChange={(e) => handleFilterChange('maxDistance', e?.target?.value)}
            min="1"
            max="100"
          />
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Budget Range */}
            <div>
              <Input
                label="Min Budget ($)"
                type="number"
                placeholder="e.g., 50"
                value={filters?.minBudget}
                onChange={(e) => handleFilterChange('minBudget', e?.target?.value)}
                min="0"
              />
            </div>
            <div>
              <Input
                label="Max Budget ($)"
                type="number"
                placeholder="e.g., 500"
                value={filters?.maxBudget}
                onChange={(e) => handleFilterChange('maxBudget', e?.target?.value)}
                min="0"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
              <select
                value={filters?.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-4 flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.verifiedClientsOnly}
                onChange={(e) => handleFilterChange('verifiedClientsOnly', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className="text-sm text-text-primary">Verified clients only</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.withPhotos}
                onChange={(e) => handleFilterChange('withPhotos', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className="text-sm text-text-primary">Requests with photos</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.flexibleTiming}
                onChange={(e) => handleFilterChange('flexibleTiming', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className="text-sm text-text-primary">Flexible timing</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;