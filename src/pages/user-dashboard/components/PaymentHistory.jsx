import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistory = ({ payments }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedPayments = showAll ? payments : payments?.slice(0, 5);

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      'completed': 'text-success bg-emerald-50 border-emerald-200',
      'pending': 'text-warning bg-amber-50 border-amber-200',
      'failed': 'text-error bg-red-50 border-red-200',
      'refunded': 'text-text-secondary bg-gray-50 border-gray-200'
    };
    return statusColors?.[status] || 'text-text-secondary bg-gray-50 border-gray-200';
  };

  const getPaymentIcon = (method) => {
    const iconMap = {
      'card': 'CreditCard',
      'paypal': 'Wallet',
      'bank': 'Building2',
      'cash': 'Banknote'
    };
    return iconMap?.[method] || 'CreditCard';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateTotal = () => {
    return payments?.filter(p => p?.status === 'completed')?.reduce((sum, p) => sum + p?.amount, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Payment History</h2>
          <p className="text-sm text-text-secondary">
            Total spent: <span className="font-medium text-success">${calculateTotal()?.toFixed(2)}</span>
          </p>
        </div>
        <Icon name="Receipt" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-3">
        {payments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No payment history</p>
          </div>
        ) : (
          displayedPayments?.map((payment) => (
            <div
              key={payment?.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-moderate transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-md bg-muted">
                  <Icon name={getPaymentIcon(payment?.method)} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">
                    {payment?.serviceTitle}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {payment?.providerName} • {formatDate(payment?.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    ${payment?.amount?.toFixed(2)}
                  </p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(payment?.status)}`}>
                    {payment?.status?.charAt(0)?.toUpperCase() + payment?.status?.slice(1)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  title="Download receipt"
                />
              </div>
            </div>
          ))
        )}
      </div>
      {payments?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `View All ${payments?.length} Payments`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;