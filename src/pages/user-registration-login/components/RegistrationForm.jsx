import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import RoleSelector from './RoleSelector';

const RegistrationForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    location: '',
    serviceCategory: '',
    licenseNumber: '',
    experience: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const serviceCategories = [
    { value: 'plumbing', label: 'Plumbing Services' },
    { value: 'electrical', label: 'Electrical Services' },
    { value: 'cleaning', label: 'Cleaning Services' },
    { value: 'security', label: 'Security Services' },
    { value: 'maintenance', label: 'General Maintenance' },
    { value: 'gardening', label: 'Gardening & Landscaping' },
    { value: 'painting', label: 'Painting Services' },
    { value: 'carpentry', label: 'Carpentry Services' }
  ];

  const experienceLevels = [
    { value: '1-2', label: '1-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const locations = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'phoenix', label: 'Phoenix, AZ' },
    { value: 'philadelphia', label: 'Philadelphia, PA' },
    { value: 'san-antonio', label: 'San Antonio, TX' },
    { value: 'san-diego', label: 'San Diego, CA' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Calculate password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email is invalid';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData?.location) newErrors.location = 'Location is required';
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    if (!formData?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';

    // Servicer-specific validation
    if (formData?.role === 'servicer') {
      if (!formData?.serviceCategory) newErrors.serviceCategory = 'Service category is required';
      if (!formData?.licenseNumber?.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData?.experience) newErrors.experience = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        role: formData?.role,
        location: formData?.location,
        ...(formData?.role === 'servicer' && {
          serviceCategory: formData?.serviceCategory,
          licenseNumber: formData?.licenseNumber,
          experience: formData?.experience
        }),
        registeredAt: new Date()?.toISOString()
      };

      onSuccess(userData, formData?.role);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <RoleSelector
        selectedRole={formData?.role}
        onRoleChange={(role) => handleInputChange('role', role)}
        disabled={isLoading}
      />
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            disabled={isLoading}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            disabled={isLoading}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
          disabled={isLoading}
        />

        <Select
          label="Location"
          placeholder="Select your location"
          options={locations}
          value={formData?.location}
          onChange={(value) => handleInputChange('location', value)}
          error={errors?.location}
          required
          searchable
          disabled={isLoading}
        />
      </div>
      {/* Service Provider Information */}
      {formData?.role === 'servicer' && (
        <div className="space-y-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Briefcase" size={20} className="text-secondary" />
            <span>Service Provider Details</span>
          </h3>

          <Select
            label="Service Category"
            placeholder="Select your primary service category"
            options={serviceCategories}
            value={formData?.serviceCategory}
            onChange={(value) => handleInputChange('serviceCategory', value)}
            error={errors?.serviceCategory}
            required
            disabled={isLoading}
          />

          <Input
            label="License Number"
            type="text"
            placeholder="Enter your professional license number"
            value={formData?.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e?.target?.value)}
            error={errors?.licenseNumber}
            description="This will be verified during the approval process"
            required
            disabled={isLoading}
          />

          <Select
            label="Years of Experience"
            placeholder="Select your experience level"
            options={experienceLevels}
            value={formData?.experience}
            onChange={(value) => handleInputChange('experience', value)}
            error={errors?.experience}
            required
            disabled={isLoading}
          />
        </div>
      )}
      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Account Security</h3>
        
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Password Strength:</span>
                <span className={`font-medium ${
                  passwordStrength < 50 ? 'text-error' : 
                  passwordStrength < 75 ? 'text-warning' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
      </div>
      {/* Terms and Privacy */}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />
        
        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
          disabled={isLoading}
        />
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-error text-sm">{errors?.submit}</p>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;