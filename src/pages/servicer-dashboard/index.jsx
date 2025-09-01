import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import { useAuth } from '../../components/ui/AuthenticationGate';

// Import components
import ServiceRequestCard from './components/ServiceRequestCard';
import EarningsOverview from './components/EarningsOverview';
import RequestFilters from './components/RequestFilters';
import PerformanceMetrics from './components/PerformanceMetrics';
import CalendarSchedule from './components/CalendarSchedule';
import QuickActions from './components/QuickActions';

const ServicerDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, setUserRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('requests');
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [notifications, setNotifications] = useState([]);

  // Mock data for service requests
  const [serviceRequests] = useState([
    {
      id: 1,
      client: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        verified: true
      },
      serviceType: "Plumbing Repair",
      description: "Kitchen sink is leaking and the water pressure is very low. Need urgent repair as it's affecting daily cooking activities.",
      location: "Downtown, 123 Main Street",
      distance: 2.5,
      budget: 150,
      urgency: "high",
      preferredTime: "Today, 2:00 PM - 4:00 PM",
      createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
      photos: ["photo1.jpg", "photo2.jpg"]
    },
    {
      id: 2,
      client: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        verified: true
      },
      serviceType: "Electrical Work",
      description: "Need to install new ceiling fan in living room and fix flickering lights in bedroom. All materials are already purchased.",
      location: "Suburbs, 456 Oak Avenue",
      distance: 5.2,
      budget: 200,
      urgency: "medium",
      preferredTime: "Tomorrow, 10:00 AM - 12:00 PM",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      photos: ["photo3.jpg"]
    },
    {
      id: 3,
      client: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        verified: false
      },
      serviceType: "House Cleaning",
      description: "Deep cleaning needed for 3-bedroom apartment. Focus on kitchen, bathrooms, and living areas. Pet-friendly cleaning products preferred.",
      location: "Midtown, 789 Pine Street",
      distance: 3.8,
      budget: 120,
      urgency: "low",
      preferredTime: "This Weekend, Flexible",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      photos: []
    }
  ]);

  // Mock earnings data
  const earningsData = {
    totalEarnings: 12450,
    thisMonth: 2850,
    pending: 450,
    completedJobs: 87,
    upcomingPayouts: [
      {
        amount: 450,
        description: "Completed services payout",
        date: "Sep 5, 2025",
        status: "Processing"
      },
      {
        amount: 320,
        description: "Weekly earnings",
        date: "Sep 8, 2025",
        status: "Scheduled"
      }
    ]
  };

  // Mock monthly data for charts
  const monthlyData = [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1450 },
    { month: 'Mar', earnings: 1800 },
    { month: 'Apr', earnings: 1650 },
    { month: 'May', earnings: 2100 },
    { month: 'Jun', earnings: 1950 },
    { month: 'Jul', earnings: 2300 },
    { month: 'Aug', earnings: 2850 }
  ];

  // Mock performance metrics
  const metricsData = {
    avgResponseTime: 12,
    completionRate: 94,
    avgRating: 4.7,
    repeatCustomers: 35,
    ratingBreakdown: {
      five: 70,
      four: 20,
      three: 7,
      two: 2,
      one: 1
    },
    recentReviews: [
      {
        clientName: "David Wilson",
        rating: 5,
        comment: "Excellent work! Very professional and completed the job quickly. Highly recommend!",
        date: "2 days ago"
      },
      {
        clientName: "Lisa Thompson",
        rating: 4,
        comment: "Good service, arrived on time and did quality work. Would hire again.",
        date: "5 days ago"
      },
      {
        clientName: "Robert Kim",
        rating: 5,
        comment: "Outstanding service! Fixed the issue perfectly and cleaned up afterwards.",
        date: "1 week ago"
      }
    ],
    suggestions: [
      {
        title: "Improve Response Time",
        description: "Try to respond to requests within 10 minutes to increase acceptance rates."
      },
      {
        title: "Add More Photos",
        description: "Upload more portfolio images to showcase your work quality."
      },
      {
        title: "Update Availability",
        description: "Keep your availability status updated to receive more relevant requests."
      },
      {
        title: "Follow Up",
        description: "Send follow-up messages after job completion to encourage reviews."
      }
    ]
  };

  // Mock appointments
  const appointments = [
    {
      id: 1,
      date: new Date(2025, 8, 2), // Sep 2, 2025
      time: "10:00 AM",
      clientName: "John Smith",
      service: "Plumbing",
      status: "confirmed"
    },
    {
      id: 2,
      date: new Date(2025, 8, 3), // Sep 3, 2025
      time: "2:00 PM",
      clientName: "Mary Johnson",
      service: "Electrical",
      status: "pending"
    },
    {
      id: 3,
      date: new Date(2025, 8, 5), // Sep 5, 2025
      time: "9:00 AM",
      clientName: "Bob Wilson",
      service: "Maintenance",
      status: "conflict"
    }
  ];

  // Filter state
  const [filters, setFilters] = useState({
    serviceType: 'All Services',
    sortBy: 'newest',
    urgency: 'All',
    maxDistance: '',
    minBudget: '',
    maxBudget: '',
    dateRange: 'all',
    verifiedClientsOnly: false,
    withPhotos: false,
    flexibleTiming: false
  });

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newNotification = {
          id: Date.now(),
          type: 'new_request',
          message: 'New service request received',
          timestamp: new Date()
        };
        setNotifications(prev => [newNotification, ...prev?.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAcceptRequest = async (requestId) => {
    console.log('Accepting request:', requestId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Request accepted successfully!');
  };

  const handleDeclineRequest = async (requestId) => {
    console.log('Declining request:', requestId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Request declined.');
  };

  const handleViewDetails = (request) => {
    console.log('Viewing request details:', request);
    // Navigate to detailed view or open modal
  };

  const handleUpdateAvailability = async (newStatus) => {
    setAvailabilityStatus(newStatus);
    console.log('Availability updated to:', newStatus);
  };

  const handleSendTemplate = (template) => {
    console.log('Using template:', template);
    // Open message composer with template
  };

  const handleViewProfile = () => {
    navigate('/service-categories-provider-grid');
  };

  const handleViewAppointment = (appointment) => {
    console.log('Viewing appointment:', appointment);
  };

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };

  const handleSignOut = () => {
    logout();
  };

  const tabs = [
    { id: 'requests', label: 'Service Requests', icon: 'Inbox', count: serviceRequests?.length },
    { id: 'earnings', label: 'Earnings', icon: 'DollarSign' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAwareHeader
        isAuthenticated={true}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onSignOut={handleSignOut}
        userName={user?.name || 'Service Provider'}
      />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Welcome back, {user?.name || 'Service Provider'}!
                </h1>
                <p className="text-text-secondary">
                  Manage your service requests and grow your business
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  availabilityStatus === 'available' ? 'bg-success/10 text-success' :
                  availabilityStatus === 'busy'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    availabilityStatus === 'available' ? 'bg-success' :
                    availabilityStatus === 'busy'? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="text-sm font-medium capitalize">{availabilityStatus}</span>
                </div>
                {notifications?.length > 0 && (
                  <div className="relative">
                    <Icon name="Bell" size={20} className="text-text-secondary" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications */}
          {notifications?.length > 0 && (
            <div className="mb-6">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Bell" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Recent Notifications</span>
                </div>
                <div className="space-y-1">
                  {notifications?.slice(0, 2)?.map((notification) => (
                    <p key={notification?.id} className="text-sm text-text-secondary">
                      {notification?.message} • {notification?.timestamp?.toLocaleTimeString()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'requests' && (
              <div>
                <RequestFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({
                    serviceType: 'All Services',
                    sortBy: 'newest',
                    urgency: 'All',
                    maxDistance: '',
                    minBudget: '',
                    maxBudget: '',
                    dateRange: 'all',
                    verifiedClientsOnly: false,
                    withPhotos: false,
                    flexibleTiming: false
                  })}
                  requestCount={serviceRequests?.length}
                />
                <div className="grid grid-cols-1 gap-6">
                  {serviceRequests?.map((request) => (
                    <ServiceRequestCard
                      key={request?.id}
                      request={request}
                      onAccept={handleAcceptRequest}
                      onDecline={handleDeclineRequest}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <EarningsOverview
                earningsData={earningsData}
                monthlyData={monthlyData}
              />
            )}

            {activeTab === 'schedule' && (
              <CalendarSchedule
                appointments={appointments}
                onUpdateAvailability={handleUpdateAvailability}
                onViewAppointment={handleViewAppointment}
              />
            )}

            {activeTab === 'performance' && (
              <PerformanceMetrics metricsData={metricsData} />
            )}

            {activeTab === 'actions' && (
              <QuickActions
                onUpdateAvailability={handleUpdateAvailability}
                onSendTemplate={handleSendTemplate}
                onViewProfile={handleViewProfile}
                availabilityStatus={availabilityStatus}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicerDashboard;