import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = [
    { email: 'user@servicepro.com', password: 'User123!', role: 'user', name: 'John Smith' },
    { email: 'provider@servicepro.com', password: 'Provider123!', role: 'servicer', name: 'Mike Johnson' },
    { email: 'admin@servicepro.com', password: 'Admin123!', role: 'user', name: 'Sarah Wilson' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        const userData = {
          id: Date.now(),
          firstName: user?.name?.split(' ')?.[0],
          lastName: user?.name?.split(' ')?.[1],
          email: user?.email,
          role: user?.role,
          loginAt: new Date()?.toISOString()
        };

        onSuccess(userData, user?.role);
      } else {
        setErrors({ 
          submit: `Invalid credentials. Try:\n• user@servicepro.com / User123!\n• provider@servicepro.com / Provider123!` 
        });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email || !/\S+@\S+\.\S+/?.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setErrors({ 
        success: 'Password reset link sent to your email address. Please check your inbox.' 
      });
      setShowForgotPassword(false);
    } catch (error) {
      setErrors({ submit: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const socialProviders = [
    { name: 'Google', icon: 'Chrome', color: 'text-red-600' },
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { name: 'Apple', icon: 'Apple', color: 'text-gray-800' }
  ];

  if (showForgotPassword) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Reset Your Password
          </h3>
          <p className="text-text-secondary">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form onSubmit={(e) => {
          e?.preventDefault();
          handleForgotPassword(formData?.email);
        }} className="space-y-4">
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

          <div className="flex space-x-3">
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              iconName="Mail"
              iconPosition="left"
            >
              Send Reset Link
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mock Credentials Info */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h4 className="font-medium text-primary mb-2 flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Demo Credentials</span>
        </h4>
        <div className="text-sm text-text-secondary space-y-1">
          <p><strong>User:</strong> user@servicepro.com / User123!</p>
          <p><strong>Provider:</strong> provider@servicepro.com / Provider123!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Error or Success */}
        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <pre className="text-error text-sm whitespace-pre-wrap">{errors?.submit}</pre>
          </div>
        )}

        {errors?.success && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-success text-sm">{errors?.success}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>
      {/* Social Login */}
      <div className="grid grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            size="default"
            onClick={() => {
              // Mock social login
              const mockUser = {
                id: Date.now(),
                firstName: 'Demo',
                lastName: 'User',
                email: `demo@${provider?.name?.toLowerCase()}.com`,
                role: 'user',
                loginAt: new Date()?.toISOString()
              };
              onSuccess(mockUser, 'user');
            }}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <Icon name={provider?.icon} size={20} className={provider?.color} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;