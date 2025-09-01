import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/landing-page" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity duration-200">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Wrench" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-text-primary">
          ServicePro Connect
        </span>
      </Link>

      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        {title}
      </h1>
      <p className="text-text-secondary text-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;