import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const EarningsOverview = ({ earningsData, monthlyData }) => {
  const stats = [
    {
      label: 'Total Earnings',
      value: `$${earningsData?.totalEarnings?.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-success'
    },
    {
      label: 'This Month',
      value: `$${earningsData?.thisMonth?.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-primary'
    },
    {
      label: 'Pending Payments',
      value: `$${earningsData?.pending?.toLocaleString()}`,
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Completed Jobs',
      value: earningsData?.completedJobs,
      change: '+15.3%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <span className={`text-sm font-medium ${
                stat?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {stat?.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</h3>
            <p className="text-sm text-text-secondary">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Monthly Earnings</h3>
            <Icon name="BarChart3" size={20} className="text-text-secondary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="earnings" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Trend Line Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Earnings Trend</h3>
            <Icon name="TrendingUp" size={20} className="text-text-secondary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Payout Schedule */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Upcoming Payouts</h3>
          <Icon name="Calendar" size={20} className="text-text-secondary" />
        </div>
        <div className="space-y-3">
          {earningsData?.upcomingPayouts?.map((payout, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="DollarSign" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">${payout?.amount}</p>
                  <p className="text-sm text-text-secondary">{payout?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{payout?.date}</p>
                <p className="text-xs text-text-secondary">{payout?.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview;