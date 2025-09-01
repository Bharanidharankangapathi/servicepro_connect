import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverviewCard = ({ stats }) => {
  const statusItems = [
    {
      key: 'active',
      label: 'Active Jobs',
      value: stats?.active,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      key: 'pending',
      label: 'Pending',
      value: stats?.pending,
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      key: 'completed',
      label: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Service Overview</h2>
        <Icon name="BarChart3" size={20} className="text-text-secondary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statusItems?.map((item) => (
          <div
            key={item?.key}
            className={`p-4 rounded-lg border ${item?.bgColor} ${item?.borderColor} transition-all duration-200 hover:shadow-moderate`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-md ${item?.bgColor} ${item?.color}`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <span className={`text-2xl font-bold ${item?.color}`}>
                {item?.value}
              </span>
            </div>
            <p className="text-sm text-text-secondary font-medium">{item?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusOverviewCard;