import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Post Your Job",
      description: "Describe your service needs with photos and details. Our AI helps match you with the right providers.",
      icon: "PlusCircle",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Get Matched",
      description: "Receive quotes from verified providers in your area. Compare ratings, prices, and availability.",
      icon: "Users",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: 3,
      title: "Schedule Service",
      description: "Choose your preferred provider and schedule a convenient time. Communicate securely through our platform.",
      icon: "Calendar",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 4,
      title: "Secure Payment",
      description: "Pay safely through our escrow system. Funds are released only after service completion and your approval.",
      icon: "CreditCard",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 5,
      title: "Rate & Review",
      description: "Share your experience to help other users. Build trust in our community through honest feedback.",
      icon: "Star",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            How ServicePro Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our streamlined process makes finding and booking trusted service providers simple, 
            secure, and stress-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Step Card */}
              <div className="trust-card p-6 h-full hover:shadow-moderate transition-shadow duration-300">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step?.id}
                  </div>
                  <div className={`w-12 h-12 ${step?.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon name={step?.icon} size={24} className={step?.color} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {step?.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step?.description}
                </p>
              </div>

              {/* Connector Arrow (Desktop Only) */}
              {index < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center">
                    <Icon name="ArrowRight" size={14} className="text-primary" />
                  </div>
                </div>
              )}

              {/* Connector Arrow (Mobile/Tablet) */}
              {index < steps?.length - 1 && (
                <div className="lg:hidden flex justify-center mt-6 mb-2">
                  <div className="w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center">
                    <Icon name="ArrowDown" size={14} className="text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            Ready to experience the future of home services?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Get Started Today
            </button>
            <button className="px-8 py-3 border border-border text-text-primary rounded-lg hover:bg-muted transition-colors duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;