import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SafetyInnovationSection = () => {
  const navigate = useNavigate();

  const safetyFeatures = [
    {
      title: "Police Alert System",
      description: "One-tap emergency notification to local law enforcement with live location sharing and service details.",
      icon: "Shield",
      features: [
        "Instant police notification",
        "GPS location sharing",
        "Service provider details",
        "Emergency contact alerts"
      ]
    },
    {
      title: "Neighbor Network",
      description: "Connect with trusted neighbors and emergency contacts who can respond quickly to your location.",
      icon: "Users",
      features: [
        "Trusted neighbor alerts",
        "Community safety network",
        "Real-time notifications",
        "Proximity-based response"
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emergency/10 text-emergency px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="AlertTriangle" size={16} />
            <span>Safety Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Introducing our revolutionary SOS emergency system that connects you to police 
            and trusted neighbors for unparalleled safety during service interactions.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {safetyFeatures?.map((feature, index) => (
            <div key={index} className="trust-card p-8 hover:shadow-strong transition-shadow duration-300">
              {/* Feature Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-emergency/10 rounded-xl flex items-center justify-center">
                  <Icon name={feature?.icon} size={32} className="text-emergency" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature?.description}
                  </p>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                {feature?.features?.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SOS Demo Section */}
        <div className="trust-card p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-6">
              Experience the SOS System
            </h3>
            <p className="text-text-secondary mb-8 text-lg">
              Our emergency system is always accessible through the prominent SOS button in our navigation. 
              Test the interface and see how quickly help can be summoned when you need it most.
            </p>

            {/* SOS Button Demo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="Smartphone" size={24} />
                <span>One-tap activation</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border"></div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="MapPin" size={24} />
                <span>Live location sharing</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border"></div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="Clock" size={24} />
                <span>Instant response</span>
              </div>
            </div>

            <Button
              variant="destructive"
              size="lg"
              onClick={() => navigate('/sos-emergency-system')}
              iconName="AlertTriangle"
              iconPosition="left"
              className="sos-button text-lg px-8 py-4"
            >
              Try SOS Demo
            </Button>

            <p className="text-sm text-text-secondary mt-4">
              * Demo mode - No actual emergency services will be contacted
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-8">Trusted by emergency services and communities nationwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={24} className="text-success" />
              <span className="text-text-secondary font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={24} className="text-success" />
              <span className="text-text-secondary font-medium">Safety Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={24} className="text-success" />
              <span className="text-text-secondary font-medium">Community Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={24} className="text-success" />
              <span className="text-text-secondary font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyInnovationSection;