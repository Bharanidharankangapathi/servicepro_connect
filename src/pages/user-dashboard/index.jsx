import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGate';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import StatusOverviewCard from './components/StatusOverviewCard';
import QuickActionButtons from './components/QuickActionButtons';
import RecentActivityFeed from './components/RecentActivityFeed';
import UpcomingServices from './components/UpcomingServices';
import RecentCommunications from './components/RecentCommunications';
import PaymentHistory from './components/PaymentHistory';
import SearchAndFilter from './components/SearchAndFilter';
import NotificationPreferences from './components/NotificationPreferences';

const UserDashboard = () => {
  const { user, userRole, setUserRole, logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Mock data for dashboard components
  const [dashboardStats] = useState({
    active: 3,
    pending: 2,
    completed: 15
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'response',
      title: 'Provider Response',
      description: 'John Smith accepted your plumbing service request',
      timestamp: new Date(Date.now() - 300000),
      unread: true
    },
    {
      id: 2,
      type: 'schedule',
      title: 'Service Scheduled',
      description: 'Electrical repair scheduled for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 1800000),
      unread: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Processed',
      description: 'Payment of $85.00 processed for cleaning service',
      timestamp: new Date(Date.now() - 3600000),
      unread: false
    },
    {
      id: 4,
      type: 'completion',
      title: 'Service Completed',
      description: 'House cleaning service has been completed',
      timestamp: new Date(Date.now() - 7200000),
      unread: false
    },
    {
      id: 5,
      type: 'update',
      title: 'Service Update',
      description: 'Your security system installation is in progress',
      timestamp: new Date(Date.now() - 10800000),
      unread: true
    }
  ]);

  const [upcomingServices] = useState([
    {
      id: 1,
      title: 'Kitchen Sink Repair',
      provider: 'John Smith Plumbing',
      category: 'plumbing',
      scheduledDate: new Date(Date.now() + 7200000), // 2 hours from now
      location: '123 Main St',
      price: 120
    },
    {
      id: 2,
      title: 'Electrical Outlet Installation',
      provider: 'PowerPro Electric',
      category: 'electrical',
      scheduledDate: new Date(Date.now() + 86400000), // 1 day from now
      location: '456 Oak Ave',
      price: 85
    },
    {
      id: 3,
      title: 'Weekly House Cleaning',
      provider: 'CleanCo Services',
      category: 'cleaning',
      scheduledDate: new Date(Date.now() + 172800000), // 2 days from now
      location: '789 Pine St',
      price: 150
    }
  ]);

  const [recentCommunications] = useState([
    {
      id: 1,
      providerName: 'John Smith',
      serviceType: 'Plumbing',
      lastMessage: 'I can start the repair work tomorrow morning. Will arrive between 9-10 AM.',
      timestamp: new Date(Date.now() - 1800000),
      unread: true,
      hasAttachment: false
    },
    {
      id: 2,
      providerName: 'Sarah Johnson',
      serviceType: 'Cleaning',
      lastMessage: 'Thank you for the positive review! Looking forward to our next appointment.',
      timestamp: new Date(Date.now() - 3600000),
      unread: false,
      hasAttachment: false
    },
    {
      id: 3,
      providerName: 'Mike Wilson',
      serviceType: 'Electrical',
      lastMessage: 'Here are the photos of the completed outlet installation.',
      timestamp: new Date(Date.now() - 7200000),
      unread: false,
      hasAttachment: true
    }
  ]);

  const [paymentHistory] = useState([
    {
      id: 1,
      serviceTitle: 'Kitchen Sink Repair',
      providerName: 'John Smith Plumbing',
      amount: 120.00,
      date: '2025-08-30',
      status: 'completed',
      method: 'card'
    },
    {
      id: 2,
      serviceTitle: 'House Cleaning',
      providerName: 'CleanCo Services',
      amount: 85.00,
      date: '2025-08-28',
      status: 'completed',
      method: 'paypal'
    },
    {
      id: 3,
      serviceTitle: 'Security System Check',
      providerName: 'SecureHome Pro',
      amount: 65.00,
      date: '2025-08-25',
      status: 'pending',
      method: 'card'
    },
    {
      id: 4,
      serviceTitle: 'Electrical Repair',
      providerName: 'PowerPro Electric',
      amount: 150.00,
      date: '2025-08-22',
      status: 'completed',
      method: 'bank'
    },
    {
      id: 5,
      serviceTitle: 'Plumbing Maintenance',
      providerName: 'AquaFix Services',
      amount: 95.00,
      date: '2025-08-20',
      status: 'refunded',
      method: 'card'
    }
  ]);

  const [notificationPreferences] = useState({
    notifications: {
      serviceUpdates: true,
      providerMessages: true,
      paymentAlerts: true,
      emergencyAlerts: true,
      promotions: false
    },
    delivery: {
      email: true,
      sms: true,
      push: true
    },
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  // Handle pull-to-refresh functionality
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    // Simulate periodic updates
    const interval = setInterval(handleRefresh, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleFilter = (filters) => {
    console.log('Applying filters:', filters);
    // Implement filter functionality
  };

  const handlePostService = () => {
    console.log('Post new service request');
  };

  const handleViewProviders = () => {
    console.log('View saved providers');
  };

  const handleEmergency = () => {
    console.log('Emergency SOS activated');
  };

  const handleSaveNotificationPreferences = async (preferences) => {
    console.log('Saving notification preferences:', preferences);
    // Implement save functionality
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleAwareHeader
        isAuthenticated={true}
        userRole={userRole}
        onRoleChange={setUserRole}
        onSignOut={logout}
        userName={user?.name || 'User'}
      />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-text-secondary">
              Manage your service requests and track your ongoing jobs from your dashboard.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              filters={{}}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Overview */}
              <StatusOverviewCard stats={dashboardStats} />

              {/* Quick Actions */}
              <QuickActionButtons
                onPostService={handlePostService}
                onViewProviders={handleViewProviders}
                onEmergency={handleEmergency}
              />

              {/* Upcoming Services */}
              <UpcomingServices services={upcomingServices} />

              {/* Payment History */}
              <PaymentHistory payments={paymentHistory} />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-8">
              {/* Recent Activity Feed */}
              <RecentActivityFeed initialActivities={recentActivities} />

              {/* Recent Communications */}
              <RecentCommunications communications={recentCommunications} />

              {/* Notification Preferences */}
              <NotificationPreferences
                initialPreferences={notificationPreferences}
                onSave={handleSaveNotificationPreferences}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;