import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilters = ({ selectedCategory, onCategoryChange, className = '' }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Mock service categories data
  const categories = [
    { id: 'all', name: 'All Services', icon: 'Grid3X3', count: 156, color: 'text-text-primary' },
    { id: 'plumber', name: 'Plumber', icon: 'Wrench', count: 24, color: 'text-blue-600' },
    { id: 'electrician', name: 'Electrician', icon: 'Zap', count: 18, color: 'text-yellow-600' },
    { id: 'housekeeper', name: 'Housekeeper', icon: 'Sparkles', count: 32, color: 'text-green-600' },
    { id: 'watchman', name: 'Watchman', icon: 'Shield', count: 12, color: 'text-red-600' },
    { id: 'gardener', name: 'Gardener', icon: 'Flower', count: 15, color: 'text-emerald-600' },
    { id: 'painter', name: 'Painter', icon: 'Paintbrush', count: 21, color: 'text-purple-600' },
    { id: 'carpenter', name: 'Carpenter', icon: 'Hammer', count: 19, color: 'text-orange-600' },
    { id: 'mechanic', name: 'Mechanic', icon: 'Settings', count: 8, color: 'text-gray-600' },
    { id: 'tutor', name: 'Tutor', icon: 'BookOpen', count: 7, color: 'text-indigo-600' }
  ];

  const visibleCategories = showAllCategories ? categories : categories?.slice(0, 6);

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className={`bg-white border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleCategoryClick(category?.id)}
                className={`
                  flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200
                  ${selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-subtle'
                    : 'bg-white text-text-primary border-border hover:border-primary hover:bg-primary/5'
                  }
                `}
              >
                <Icon 
                  name={category?.icon} 
                  size={16} 
                  className={selectedCategory === category?.id ? 'text-primary-foreground' : category?.color}
                />
                <span className="text-sm font-medium whitespace-nowrap">
                  {category?.name}
                </span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${selectedCategory === category?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                  }
                `}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Service Categories</h2>
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="flex items-center space-x-2 text-sm text-primary hover:text-blue-700 transition-colors duration-200"
            >
              <span>{showAllCategories ? 'Show Less' : 'Show All'}</span>
              <Icon 
                name={showAllCategories ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
              />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {visibleCategories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleCategoryClick(category?.id)}
                className={`
                  group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-subtle
                  ${selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-subtle'
                    : 'bg-white text-text-primary border-border hover:border-primary hover:bg-primary/5'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200
                    ${selectedCategory === category?.id
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted group-hover:bg-primary/10'
                    }
                  `}>
                    <Icon 
                      name={category?.icon} 
                      size={24} 
                      className={
                        selectedCategory === category?.id 
                          ? 'text-primary-foreground' 
                          : `${category?.color} group-hover:text-primary`
                      }
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {category?.name}
                    </p>
                    <p className={`
                      text-xs mt-1
                      ${selectedCategory === category?.id
                        ? 'text-primary-foreground/80'
                        : 'text-text-secondary'
                      }
                    `}>
                      {category?.count} providers
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {selectedCategory === category?.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={10} className="text-secondary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category stats */}
        <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
          <span>
            {selectedCategory === 'all' 
              ? `Showing all ${categories?.find(c => c?.id === 'all')?.count} providers`
              : `${categories?.find(c => c?.id === selectedCategory)?.count || 0} ${categories?.find(c => c?.id === selectedCategory)?.name} providers available`
            }
          </span>
          <span className="hidden sm:block">
            Updated {new Date()?.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;