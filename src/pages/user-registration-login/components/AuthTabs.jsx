import React from 'react';


const AuthTabs = ({ activeTab, onTabChange, disabled = false }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', description: 'Access your existing account' },
    { id: 'register', label: 'Create Account', description: 'Join ServicePro Connect today' }
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => !disabled && onTabChange(tab?.id)}
            disabled={disabled}
            className={`
              flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200
              ${activeTab === tab?.id
                ? 'bg-background text-text-primary shadow-subtle'
                : 'text-text-secondary hover:text-text-primary'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Tab Description */}
      <div className="text-center mb-6">
        <p className="text-text-secondary">
          {tabs?.find(tab => tab?.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default AuthTabs;