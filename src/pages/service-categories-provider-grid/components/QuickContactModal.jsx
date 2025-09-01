import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickContactModal = ({ 
  isOpen, 
  onClose, 
  provider, 
  onSendMessage,
  className = '' 
}) => {
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [preferredContact, setPreferredContact] = useState('message');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600', description: 'Within 24 hours' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600', description: 'Within 4-6 hours' },
    { value: 'high', label: 'Urgent', color: 'text-orange-600', description: 'Within 1-2 hours' },
    { value: 'emergency', label: 'Emergency', color: 'text-red-600', description: 'Immediate response' }
  ];

  const contactMethods = [
    { value: 'message', label: 'Platform Message', icon: 'MessageCircle', description: 'Secure messaging' },
    { value: 'phone', label: 'Phone Call', icon: 'Phone', description: 'Direct call' },
    { value: 'video', label: 'Video Call', icon: 'Video', description: 'Video consultation' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!message?.trim()) return;

    setIsSubmitting(true);
    
    try {
      const contactData = {
        providerId: provider?.id,
        message: message?.trim(),
        urgency,
        preferredContact,
        timestamp: new Date()?.toISOString()
      };

      await onSendMessage(contactData);
      
      // Reset form
      setMessage('');
      setUrgency('normal');
      setPreferredContact('message');
      
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !provider) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${className}
      `}>
        <div className="bg-white rounded-2xl shadow-strong max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-down">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-border px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={provider?.image}
                    alt={provider?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Contact {provider?.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {provider?.specialty}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Provider Quick Info */}
          <div className="px-6 py-4 bg-muted/30">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                  <span className="font-medium">{provider?.rating}</span>
                  <span className="text-text-secondary">({provider?.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{provider?.distance} away</span>
                </div>
              </div>
              
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1
                ${provider?.availability === 'available' ? 'bg-green-50 text-green-600' :
                  provider?.availability === 'busy'? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}
              `}>
                <div className={`w-2 h-2 rounded-full ${
                  provider?.availability === 'available' ? 'bg-green-500' :
                  provider?.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span>
                  {provider?.availability === 'available' ? 'Available Now' :
                   provider?.availability === 'busy' ? 'Busy' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Your Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                placeholder="Describe your service needs, timeline, and any specific requirements..."
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-sm"
                required
              />
              <p className="text-xs text-text-secondary mt-1">
                {message?.length}/500 characters
              </p>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Urgency Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {urgencyOptions?.map((option) => (
                  <label
                    key={option?.value}
                    className={`
                      relative flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors duration-200
                      ${urgency === option?.value 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={option?.value}
                      checked={urgency === option?.value}
                      onChange={(e) => setUrgency(e?.target?.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${option?.color}`}>
                        {option?.label}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {option?.description}
                      </p>
                    </div>
                    {urgency === option?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Contact Method
              </label>
              <div className="space-y-2">
                {contactMethods?.map((method) => (
                  <label
                    key={method?.value}
                    className={`
                      flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors duration-200
                      ${preferredContact === method?.value 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="contact"
                      value={method?.value}
                      checked={preferredContact === method?.value}
                      onChange={(e) => setPreferredContact(e?.target?.value)}
                      className="sr-only"
                    />
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${preferredContact === method?.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}
                    `}>
                      <Icon name={method?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        {method?.label}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {method?.description}
                      </p>
                    </div>
                    {preferredContact === method?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Shield" size={16} className="text-secondary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Privacy Protected
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Your contact information is protected. The provider will receive an AI-generated contact number for secure communication.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                className="flex-1"
                iconName="Send"
                iconPosition="left"
                disabled={!message?.trim() || isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuickContactModal;