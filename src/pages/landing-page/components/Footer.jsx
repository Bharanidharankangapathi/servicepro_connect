import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Find Providers", path: "/service-categories-provider-grid" },
        { name: "Become a Provider", path: "/user-registration-login" },
        { name: "Emergency SOS", path: "/sos-emergency-system" },
        { name: "How It Works", path: "/landing-page" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/landing-page" },
        { name: "Safety Guidelines", path: "/landing-page" },
        { name: "Contact Us", path: "/landing-page" },
        { name: "Report Issue", path: "/landing-page" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/landing-page" },
        { name: "Careers", path: "/landing-page" },
        { name: "Press", path: "/landing-page" },
        { name: "Blog", path: "/landing-page" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/landing-page" },
        { name: "Terms of Service", path: "/landing-page" },
        { name: "Cookie Policy", path: "/landing-page" },
        { name: "Compliance", path: "/landing-page" }
      ]
    }
  ];

  const trustBadges = [
    { name: "SSL Secured", icon: "Shield" },
    { name: "Privacy Protected", icon: "Lock" },
    { name: "24/7 Support", icon: "Phone" },
    { name: "Verified Providers", icon: "Award" }
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">ServicePro Connect</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting you with trusted service providers through AI-powered matching, 
              secure payments, and innovative safety features.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section?.title}</h3>
              <ul className="space-y-3">
                {section?.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link?.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges?.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon name={badge?.icon} size={16} className="text-success" />
                </div>
                <span className="text-sm">{badge?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 p-6 bg-emergency/10 border border-emergency/20 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="AlertTriangle" size={24} className="text-emergency" />
            <h4 className="text-lg font-semibold text-emergency">Emergency Support</h4>
          </div>
          <p className="text-gray-300 mb-4">
            For immediate assistance or emergency situations, use our SOS system or contact emergency services directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/sos-emergency-system"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emergency text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Icon name="AlertTriangle" size={16} />
              <span>SOS Emergency</span>
            </Link>
            <a
              href="tel:911"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Icon name="Phone" size={16} />
              <span>Call 911</span>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} ServicePro Connect. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>Made with ❤️ for safer communities</span>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>United States</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;