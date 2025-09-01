import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metricsData }) => {
  const performanceStats = [
    {
      label: 'Response Time',
      value: `${metricsData?.avgResponseTime} min`,
      target: '< 15 min',
      status: metricsData?.avgResponseTime <= 15 ? 'good' : 'needs-improvement',
      icon: 'Clock'
    },
    {
      label: 'Completion Rate',
      value: `${metricsData?.completionRate}%`,
      target: '> 90%',
      status: metricsData?.completionRate >= 90 ? 'good' : 'needs-improvement',
      icon: 'CheckCircle'
    },
    {
      label: 'Customer Rating',
      value: `${metricsData?.avgRating}/5.0`,
      target: '> 4.5',
      status: metricsData?.avgRating >= 4.5 ? 'good' : 'needs-improvement',
      icon: 'Star'
    },
    {
      label: 'Repeat Customers',
      value: `${metricsData?.repeatCustomers}%`,
      target: '> 30%',
      status: metricsData?.repeatCustomers >= 30 ? 'good' : 'needs-improvement',
      icon: 'Users'
    }
  ];

  const ratingDistribution = [
    { name: '5 Stars', value: metricsData?.ratingBreakdown?.five, color: '#10B981' },
    { name: '4 Stars', value: metricsData?.ratingBreakdown?.four, color: '#059669' },
    { name: '3 Stars', value: metricsData?.ratingBreakdown?.three, color: '#F59E0B' },
    { name: '2 Stars', value: metricsData?.ratingBreakdown?.two, color: '#EF4444' },
    { name: '1 Star', value: metricsData?.ratingBreakdown?.one, color: '#DC2626' }
  ];

  const getStatusColor = (status) => {
    return status === 'good' ? 'text-success' : 'text-warning';
  };

  const getStatusIcon = (status) => {
    return status === 'good' ? 'TrendingUp' : 'AlertTriangle';
  };

  return (
    <div className="space-y-6">
      {/* Performance Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </div>
              <Icon 
                name={getStatusIcon(stat?.status)} 
                size={16} 
                className={getStatusColor(stat?.status)} 
              />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</h3>
            <p className="text-sm text-text-secondary mb-2">{stat?.label}</p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-secondary">Target:</span>
              <span className={`text-xs font-medium ${getStatusColor(stat?.status)}`}>
                {stat?.target}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Rating Distribution</h3>
            <Icon name="Star" size={20} className="text-text-secondary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratingDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {ratingDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item?.name}: {item?.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Recent Reviews</h3>
            <Icon name="MessageSquare" size={20} className="text-text-secondary" />
          </div>
          <div className="space-y-4">
            {metricsData?.recentReviews?.map((review, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-text-primary text-sm">{review?.clientName}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review?.rating ? 'text-warning' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{review?.comment}</p>
                    <p className="text-xs text-text-secondary mt-2">{review?.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Improvement Suggestions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-text-primary">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metricsData?.suggestions?.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-text-primary text-sm mb-1">{suggestion?.title}</p>
                <p className="text-sm text-text-secondary">{suggestion?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;