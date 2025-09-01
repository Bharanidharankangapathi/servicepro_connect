import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import { useAuth } from '../../components/ui/AuthenticationGate';
import SearchBar from './components/SearchBar';
import CategoryFilters from './components/CategoryFilters';
import FilterPanel from './components/FilterPanel';
import SortOptions from './components/SortOptions';
import ProviderGrid from './components/ProviderGrid';
import QuickContactModal from './components/QuickContactModal';

import Button from '../../components/ui/Button';

const ServiceCategoriesProviderGrid = () => {
  const { isAuthenticated, user, userRole, setUserRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    location: { radius: 10, city: '' },
    priceRange: { min: 0, max: 500 },
    rating: 0,
    availability: [],
    verified: false,
    experience: 0
  });

  // Mock providers data
  const mockProviders = [
    {
      id: 1,
      name: "Mike Rodriguez",
      specialty: "Emergency Plumbing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 127,
      experience: 8,
      distance: "0.5 miles",
      availability: "available",
      startingPrice: 75,
      responseTime: "< 30 min",
      isVerified: true,
      description: "Experienced plumber specializing in emergency repairs, drain cleaning, and pipe installations. Available 24/7 for urgent plumbing issues with quick response times.",
      skills: ["Emergency Repairs", "Drain Cleaning", "Pipe Installation", "Water Heater Repair"],
      lastActive: "2 minutes ago"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "Residential Electrician",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 89,
      experience: 6,
      distance: "1.2 miles",
      availability: "available",
      startingPrice: 85,
      responseTime: "< 1 hour",
      isVerified: true,
      description: "Licensed electrician with expertise in home wiring, electrical panel upgrades, and smart home installations. Committed to safety and quality workmanship.",
      skills: ["Home Wiring", "Panel Upgrades", "Smart Home", "Lighting Installation"],
      lastActive: "15 minutes ago"
    },
    {
      id: 3,
      name: "Maria Garcia",
      specialty: "Deep Cleaning Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 203,
      experience: 4,
      distance: "0.8 miles",
      availability: "busy",
      startingPrice: 45,
      responseTime: "< 2 hours",
      isVerified: true,
      description: "Professional housekeeper offering comprehensive cleaning services including deep cleaning, regular maintenance, and eco-friendly cleaning options.",
      skills: ["Deep Cleaning", "Regular Maintenance", "Eco-Friendly", "Move-in/out Cleaning"],
      lastActive: "1 hour ago"
    },
    {
      id: 4,
      name: "David Chen",
      specialty: "Security & Surveillance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 56,
      experience: 12,
      distance: "2.1 miles",
      availability: "available",
      startingPrice: 25,
      responseTime: "< 45 min",
      isVerified: true,
      description: "Experienced security professional providing watchman services, property surveillance, and security system installation with 24/7 monitoring capabilities.",
      skills: ["Night Security", "Surveillance", "Access Control", "Emergency Response"],
      lastActive: "30 minutes ago"
    },
    {
      id: 5,
      name: "Jennifer Wilson",
      specialty: "Garden & Landscape",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      rating: 4.5,
      reviewCount: 78,
      experience: 5,
      distance: "1.5 miles",
      availability: "available",
      startingPrice: 40,
      responseTime: "< 3 hours",
      isVerified: false,
      description: "Professional gardener specializing in landscape design, plant care, and seasonal garden maintenance. Creating beautiful outdoor spaces for homes and businesses.",
      skills: ["Landscape Design", "Plant Care", "Seasonal Maintenance", "Irrigation"],
      lastActive: "3 hours ago"
    },
    {
      id: 6,
      name: "Robert Taylor",
      specialty: "Interior Painting",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 145,
      experience: 10,
      distance: "1.8 miles",
      availability: "available",
      startingPrice: 55,
      responseTime: "< 4 hours",
      isVerified: true,
      description: "Professional painter with extensive experience in interior and exterior painting, color consultation, and surface preparation. Quality guaranteed.",
      skills: ["Interior Painting", "Exterior Painting", "Color Consultation", "Surface Prep"],
      lastActive: "45 minutes ago"
    },
    {
      id: 7,
      name: "Lisa Anderson",
      specialty: "Custom Carpentry",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 92,
      experience: 7,
      distance: "2.3 miles",
      availability: "busy",
      startingPrice: 65,
      responseTime: "< 6 hours",
      isVerified: true,
      description: "Skilled carpenter specializing in custom furniture, built-in storage solutions, and home renovations. Attention to detail and craftsmanship excellence.",
      skills: ["Custom Furniture", "Built-ins", "Renovations", "Repair Work"],
      lastActive: "2 hours ago"
    },
    {
      id: 8,
      name: "James Mitchell",
      specialty: "Auto Mechanic",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      rating: 4.4,
      reviewCount: 67,
      experience: 15,
      distance: "3.2 miles",
      availability: "available",
      startingPrice: 80,
      responseTime: "< 2 hours",
      isVerified: true,
      description: "Certified automotive technician providing comprehensive car repair and maintenance services. Mobile service available for convenience.",
      skills: ["Engine Repair", "Brake Service", "Oil Changes", "Diagnostics"],
      lastActive: "1 hour ago"
    }
  ];

  // Initialize providers on component mount
  useEffect(() => {
    const initializeProviders = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProviders(mockProviders);
      setLoading(false);
    };

    initializeProviders();
  }, []);

  // Filter providers based on current filters and search
  const filteredProviders = providers?.filter(provider => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery?.toLowerCase();
      const matchesSearch = 
        provider?.name?.toLowerCase()?.includes(searchLower) ||
        provider?.specialty?.toLowerCase()?.includes(searchLower) ||
        provider?.skills?.some(skill => skill?.toLowerCase()?.includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const categoryMatch = provider?.specialty?.toLowerCase()?.includes(selectedCategory?.toLowerCase());
      if (!categoryMatch) return false;
    }

    // Rating filter
    if (filters?.rating > 0 && provider?.rating < filters?.rating) return false;

    // Verification filter
    if (filters?.verified && !provider?.isVerified) return false;

    // Experience filter
    if (filters?.experience > 0 && provider?.experience < filters?.experience) return false;

    // Price range filter
    if (provider?.startingPrice < filters?.priceRange?.min || provider?.startingPrice > filters?.priceRange?.max) {
      return false;
    }

    // Availability filter
    if (filters?.availability?.length > 0) {
      const availabilityMatch = filters?.availability?.some(avail => {
        switch (avail) {
          case 'today': case'tomorrow': case'weekend':
            return provider?.availability === 'available';
          case 'emergency':
            return provider?.availability === 'available' && provider?.responseTime?.includes('30 min');
          default:
            return true;
        }
      });
      if (!availabilityMatch) return false;
    }

    return true;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders]?.sort((a, b) => {
    switch (currentSort) {
      case 'distance':
        return parseFloat(a?.distance) - parseFloat(b?.distance);
      case 'rating':
        return b?.rating - a?.rating;
      case 'price_low':
        return a?.startingPrice - b?.startingPrice;
      case 'price_high':
        return b?.startingPrice - a?.startingPrice;
      case 'experience':
        return b?.experience - a?.experience;
      case 'availability':
        return a?.availability === 'available' ? -1 : 1;
      case 'newest':
        return new Date(b.lastActive) - new Date(a.lastActive);
      default: // relevance
        return b?.rating * b?.reviewCount - a?.rating * a?.reviewCount;
    }
  });

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    if (suggestion?.type === 'provider') {
      setSearchQuery(suggestion?.name);
    } else {
      setSearchQuery(suggestion?.name);
      // Could also set category based on suggestion
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setCurrentSort(sort);
    setPage(1);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setIsFilterPanelOpen(false);
    setPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      location: { radius: 10, city: '' },
      priceRange: { min: 0, max: 500 },
      rating: 0,
      availability: [],
      verified: false,
      experience: 0
    });
    setPage(1);
  };

  // Handle load more (for infinite scroll)
  const handleLoadMore = async () => {
    // Simulate loading more data
    return new Promise(resolve => {
      setTimeout(() => {
        setPage(prev => prev + 1);
        resolve();
      }, 1000);
    });
  };

  // Handle quick contact
  const handleQuickContact = (provider) => {
    setSelectedProvider(provider);
    setIsContactModalOpen(true);
  };

  // Handle send message
  const handleSendMessage = async (contactData) => {
    // Simulate sending message
    console.log('Sending message:', contactData);
    
    // Show success notification (would be implemented with toast)
    alert(`Message sent to ${selectedProvider?.name}! They will respond within ${selectedProvider?.responseTime}.`);
    
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  };

  // Handle role change
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };

  // Handle sign out
  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAwareHeader
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onSignOut={handleSignOut}
        userName={user?.name}
      />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section with Search */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Find Trusted Service Providers
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Connect with verified professionals in your area. From emergency repairs to regular maintenance, we've got you covered.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              className="mb-6"
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary">{sortedProviders?.length}</div>
                <div className="text-sm text-text-secondary">Available Providers</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-secondary">4.7</div>
                <div className="text-sm text-text-secondary">Average Rating</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-text-secondary">Emergency Support</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-success">98%</div>
                <div className="text-sm text-text-secondary">Verified Providers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onApplyFilters={handleApplyFilters}
                  onClearFilters={handleClearFilters}
                  className="bg-white rounded-xl border border-border shadow-subtle"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-6">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                </Button>

                {/* Sort Options */}
                <div className="flex-1 lg:flex-none">
                  <SortOptions
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                    resultCount={sortedProviders?.length}
                  />
                </div>
              </div>

              {/* Provider Grid */}
              <ProviderGrid
                providers={sortedProviders}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onQuickContact={handleQuickContact}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Quick Contact Modal */}
        <QuickContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          provider={selectedProvider}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default ServiceCategoriesProviderGrid;