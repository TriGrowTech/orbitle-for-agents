import React from 'react';
import { Bell, Users, Sparkles, CreditCard, Info } from 'lucide-react';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200/50 shadow-xl overflow-hidden z-50">
        <div className="p-3 border-b border-gray-200/50 flex items-center justify-between bg-gray-50/80">
          <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium">Mark all as read</button>
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {/* New Lead */}
          <div className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900"><span className="font-semibold">New Lead:</span> Rahul Sharma</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Interested in Bali Package (2 Pax)</p>
              <p className="text-[10px] text-gray-400 mt-1">10 mins ago</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
          </div>

          {/* Superadmin Announcement */}
          <div className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Orbitle Team Update</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">Welcome to Orbitle! Check out our new AI destination generator feature.</p>
              <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
          </div>

          {/* Offer */}
          <div className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-green-700">Limited Time Offer! 🎁</p>
              <p className="text-xs text-gray-600 mt-0.5">Get 20% off when you upgrade to the Annual Plan today.</p>
              <p className="text-[10px] text-gray-400 mt-1">1 day ago</p>
            </div>
          </div>

          {/* Renewal Notice */}
          <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Action Required: Trial Ending</p>
              <p className="text-xs text-gray-600 mt-0.5">Your trial ends soon. Renew your plan to keep your website live.</p>
              <p className="text-[10px] text-gray-400 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
        <div className="p-2 border-t border-gray-200/50 bg-gray-50/80 text-center">
          <button className="text-sm text-gray-600 hover:text-gray-900 font-medium w-full py-1">View all notifications</button>
        </div>
      </div>
    </>
  );
}
