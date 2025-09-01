import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortOptions = ({ currentSort, onSortChange, resultCount, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { 
      value: 'relevance', 
      label: 'Best Match', 
      icon: 'Target',
      description: 'AI-powered recommendations'
    },
    { 
      value: 'distance', 
      label: 'Nearest First', 
      icon: 'MapPin',
      description: 'Closest to your location'
    },
    { 
      value: 'rating', 
      label: 'Highest Rated', 
      icon: 'Star',
      description: 'Best customer reviews'
    },
    { 
      value: 'price_low', 
      label: 'Price: Low to High', 
      icon: 'TrendingUp',
      description: 'Most affordable first'
    },
    { 
      value: 'price_high', 
      label: 'Price: High to Low', 
      icon: 'TrendingDown',
      description: 'Premium services first'
    },
    { 
      value: 'availability', 
      label: 'Available Now', 
      icon: 'Clock',
      description: 'Ready to start immediately'
    },
    { 
      value: 'experience', 
      label: 'Most Experienced', 
      icon: 'Award',
      description: 'Years of expertise'
    },
    { 
      value: 'newest', 
      label: 'Newest Providers', 
      icon: 'Plus',
      description: 'Recently joined platform'
    }
  ];

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Results count */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-text-secondary">
          {resultCount?.toLocaleString()} providers found
        </span>
        {currentSort !== 'relevance' && (
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <span>•</span>
            <span>Sorted by {currentSortOption?.label}</span>
          </div>
        )}
      </div>
      {/* Sort dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-border rounded-lg hover:border-primary transition-colors duration-200 text-sm font-medium"
        >
          <Icon 
            name={currentSortOption?.icon} 
            size={16} 
            className="text-text-secondary" 
          />
          <span className="text-text-primary">
            Sort: {currentSortOption?.label}
          </span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-secondary" 
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-strong z-50 animate-slide-down">
            <div className="py-2">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Sort Options
                </p>
              </div>
              
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-center space-x-3
                    ${currentSort === option?.value ? 'bg-primary/5 border-r-2 border-primary' : ''}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${currentSort === option?.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}
                  `}>
                    <Icon 
                      name={option?.icon} 
                      size={16} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`
                      text-sm font-medium
                      ${currentSort === option?.value ? 'text-primary' : 'text-text-primary'}
                    `}>
                      {option?.label}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {option?.description}
                    </p>
                  </div>
                  
                  {currentSort === option?.value && (
                    <Icon 
                      name="Check" 
                      size={16} 
                      className="text-primary flex-shrink-0" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortOptions;