import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: '',
    category: '',
    dateRange: '',
    priceRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'security', label: 'Security' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      category: '',
      dateRange: '',
      priceRange: ''
    };
    setActiveFilters(clearedFilters);
    setSearchQuery('');
    onFilter(clearedFilters);
    onSearch('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value !== '')?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Search & Filter</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          iconName={showFilters ? "ChevronUp" : "Filter"}
          iconPosition="left"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder="Search services, providers, or requests..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
      </div>
      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-border animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={activeFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={activeFilters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              placeholder="Select category"
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={activeFilters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select period"
            />

            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={activeFilters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
              placeholder="Select price"
            />
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-text-secondary">
              {getActiveFilterCount() > 0 ? (
                `${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`
              ) : (
                'No filters applied'
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                disabled={getActiveFilterCount() === 0 && !searchQuery}
              >
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Search"
                iconPosition="left"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;