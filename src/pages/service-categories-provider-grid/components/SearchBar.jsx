import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onSuggestionSelect, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock AI-powered suggestions data
  const mockSuggestions = [
    { id: 1, type: 'provider', name: 'Mike Rodriguez - Plumber', specialty: 'Emergency Plumbing', rating: 4.8, location: '0.5 miles away' },
    { id: 2, type: 'provider', name: 'Sarah Johnson - Electrician', specialty: 'Home Wiring', rating: 4.9, location: '1.2 miles away' },
    { id: 3, type: 'service', name: 'Drain Cleaning', category: 'Plumbing', providers: 12 },
    { id: 4, type: 'service', name: 'Electrical Repair', category: 'Electrical', providers: 8 },
    { id: 5, type: 'provider', name: 'Maria Garcia - Housekeeper', specialty: 'Deep Cleaning', rating: 4.7, location: '0.8 miles away' },
    { id: 6, type: 'service', name: 'Security Installation', category: 'Security', providers: 5 },
    { id: 7, type: 'provider', name: 'David Chen - Watchman', specialty: 'Night Security', rating: 4.6, location: '2.1 miles away' },
    { id: 8, type: 'service', name: 'House Cleaning', category: 'Cleaning', providers: 15 }
  ];

  // Simulate AI search with debouncing
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery?.trim()?.length > 0) {
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
          const filtered = mockSuggestions?.filter(item =>
            item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            (item?.specialty && item?.specialty?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
            (item?.category && item?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
          )?.slice(0, 6);
          
          setSuggestions(filtered);
          setShowSuggestions(true);
          setIsLoading(false);
        }, 300);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    onSearch(e?.target?.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setShowSuggestions(false);
    onSuggestionSelect(suggestion);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setShowSuggestions(false);
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon 
              name="Search" 
              size={20} 
              className="text-text-secondary" 
            />
          </div>
          
          <Input
            ref={searchRef}
            type="search"
            placeholder="Search for services, providers, or specialties..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-12 pr-12 py-3 text-base bg-white border-2 border-border focus:border-primary rounded-xl shadow-subtle"
          />
          
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-text-primary transition-colors duration-150"
            >
              <Icon 
                name="X" 
                size={18} 
                className="text-text-secondary hover:text-text-primary" 
              />
            </button>
          )}
        </div>
      </form>
      {/* AI-Powered Suggestions Dropdown */}
      {(showSuggestions || isLoading) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-strong z-50 max-h-96 overflow-y-auto animate-slide-down"
        >
          {isLoading ? (
            <div className="p-4 flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-text-secondary">Searching...</span>
            </div>
          ) : suggestions?.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  AI-Powered Suggestions
                </p>
              </div>
              
              {suggestions?.map((suggestion) => (
                <button
                  key={suggestion?.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${suggestion?.type === 'provider' ? 'bg-primary/10' : 'bg-secondary/10'}
                  `}>
                    <Icon 
                      name={suggestion?.type === 'provider' ? 'User' : 'Wrench'} 
                      size={16} 
                      className={suggestion?.type === 'provider' ? 'text-primary' : 'text-secondary'}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {suggestion?.name}
                    </p>
                    
                    {suggestion?.type === 'provider' ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-text-secondary">
                          {suggestion?.specialty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-text-secondary">{suggestion?.rating}</span>
                        </div>
                        <span className="text-xs text-text-secondary">
                          {suggestion?.location}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-text-secondary">
                          {suggestion?.category}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {suggestion?.providers} providers available
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Icon 
                    name="ArrowUpRight" 
                    size={16} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No suggestions found</p>
              <p className="text-xs text-text-secondary mt-1">
                Try searching for services like "plumbing" or "electrical"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;