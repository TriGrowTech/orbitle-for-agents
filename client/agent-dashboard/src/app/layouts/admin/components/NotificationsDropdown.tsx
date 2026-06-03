import React from 'react';
import { useNavigate } from 'react-router';
import { Bell, Users, Sparkles, CreditCard, Info, Headphones, CheckCircle2, Loader2 } from 'lucide-react';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  Notification,
} from '../../../api/notificationApi';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// Type-based icon and color mapping
const typeConfig: Record<string, { icon: React.ElementType; bg: string; iconColor: string }> = {
  new_lead: { icon: Users, bg: 'bg-blue-100', iconColor: 'text-blue-600' },
  offer: { icon: CreditCard, bg: 'bg-green-100', iconColor: 'text-green-600' },
  trial_ending: { icon: Info, bg: 'bg-orange-100', iconColor: 'text-orange-600' },
  required_action: { icon: Sparkles, bg: 'bg-gradient-to-br from-purple-500 to-pink-500', iconColor: 'text-white' },
  support_resolution: { icon: Headphones, bg: 'bg-teal-100', iconColor: 'text-teal-600' },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(dateStr).toLocaleDateString();
}

function NotificationItem({ notif, onClick }: { notif: Notification; onClick: () => void }) {
  const config = typeConfig[notif.type] || typeConfig.required_action;
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${config.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{notif.title}</span>
        </p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
        <p className="text-[10px] text-gray-400 mt-1">{timeAgo(notif.createdAt)}</p>
      </div>
      {!notif.isRead && (
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
      )}
    </div>
  );
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetNotificationsQuery(undefined, { skip: !isOpen });
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  if (!isOpen) return null;

  const notifications = data?.data ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  const handleNotificationClick = async (notif: Notification) => {
    if (!notif.isRead) {
      try {
        await markAsRead(notif._id).unwrap();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
      }
    }

    if (notif.type === 'new_lead') {
      navigate('/leads');
    } else if (notif.type === 'support_resolution') {
      navigate('/support');
    }

    onClose();
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200/50 shadow-xl overflow-hidden z-50">
        <div className="p-3 border-b border-gray-200/50 flex items-center justify-between bg-gray-50/80">
          <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
          {hasUnread && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 font-medium">All caught up!</p>
              <p className="text-xs text-gray-400 mt-0.5">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <NotificationItem 
                key={notif._id} 
                notif={notif} 
                onClick={() => handleNotificationClick(notif)} 
              />
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-2 border-t border-gray-200/50 bg-gray-50/80 text-center">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium w-full py-1">
              View all notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
}
