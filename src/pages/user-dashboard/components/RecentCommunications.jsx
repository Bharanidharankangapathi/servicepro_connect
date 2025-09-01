import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentCommunications = ({ communications }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const formatMessageTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diff = now - messageTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const truncateMessage = (message, maxLength = 60) => {
    if (message?.length <= maxLength) return message;
    return message?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Recent Messages</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {communications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No recent messages</p>
          </div>
        ) : (
          communications?.map((comm) => (
            <div
              key={comm?.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer"
              onClick={() => setSelectedConversation(comm)}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                {comm?.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {comm?.providerName}
                  </h3>
                  <span className="text-xs text-text-secondary">
                    {formatMessageTime(comm?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary">
                  {truncateMessage(comm?.lastMessage)}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-text-secondary">
                    {comm?.serviceType}
                  </span>
                  {comm?.hasAttachment && (
                    <Icon name="Paperclip" size={12} className="text-text-secondary" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {communications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {communications?.filter(c => c?.unread)?.length} unread messages
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
            >
              Open Messages
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentCommunications;