import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCategoriesPreview = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 1,
      name: "Plumbing",
      description: "Pipes, leaks, installations",
      icon: "Wrench",
      providerCount: "1,200+",
      avgRating: 4.8,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      name: "Electrical",
      description: "Wiring, repairs, installations",
      icon: "Zap",
      providerCount: "950+",
      avgRating: 4.9,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      name: "Housekeeping",
      description: "Cleaning, organizing, maintenance",
      icon: "Home",
      providerCount: "2,100+",
      avgRating: 4.7,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      name: "Security",
      description: "Watchman, surveillance, safety",
      icon: "Shield",
      providerCount: "800+",
      avgRating: 4.9,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 5,
      name: "Gardening",
      description: "Landscaping, maintenance, design",
      icon: "Leaf",
      providerCount: "650+",
      avgRating: 4.6,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: 6,
      name: "Carpentry",
      description: "Furniture, repairs, installations",
      icon: "Hammer",
      providerCount: "750+",
      avgRating: 4.8,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 7,
      name: "Painting",
      description: "Interior, exterior, touch-ups",
      icon: "Paintbrush",
      providerCount: "900+",
      avgRating: 4.7,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 8,
      name: "HVAC",
      description: "Heating, cooling, ventilation",
      icon: "Wind",
      providerCount: "550+",
      avgRating: 4.8,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Popular Service Categories
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover thousands of verified professionals ready to help with your home service needs. 
            From emergency repairs to routine maintenance, we've got you covered.
          </p>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {serviceCategories?.map((category) => (
              <div
                key={category?.id}
                className="flex-shrink-0 w-64 trust-card p-6 hover:shadow-moderate transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate('/service-categories-provider-grid')}
              >
                <div className={`w-16 h-16 ${category?.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={category?.icon} size={32} className={category?.color} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {category?.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {category?.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{category?.providerCount} providers</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-text-primary font-medium">{category?.avgRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-12">
          {serviceCategories?.map((category) => (
            <div
              key={category?.id}
              className="trust-card p-6 hover:shadow-moderate transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => navigate('/service-categories-provider-grid')}
            >
              <div className={`w-16 h-16 ${category?.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={category?.icon} size={32} className={category?.color} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {category?.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {category?.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{category?.providerCount} providers</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-text-primary font-medium">{category?.avgRating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/service-categories-provider-grid')}
            iconName="ArrowRight"
            iconPosition="right"
            className="px-8"
          >
            View All Categories
          </Button>
          <p className="text-text-secondary mt-4">
            Browse 50+ service categories with thousands of verified providers
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-text-secondary">Service Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">10K+</div>
            <div className="text-text-secondary">Verified Providers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">4.8</div>
            <div className="text-text-secondary">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">24/7</div>
            <div className="text-text-secondary">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesPreview;