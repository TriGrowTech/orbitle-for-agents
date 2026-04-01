import React, { useState } from 'react';
import { Link } from 'react-router';
import { Menu, Crown, Bell } from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserDropdown } from './UserDropdown';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm h-[65px]">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 ml-auto">
            {/* Current Plan Badge */}
            <Link
              to="/pricing"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
            >
              <Crown className="w-4 h-4" />
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">Yearly Plan</p>
                <p className="text-xs opacity-90 leading-tight">Active</p>
              </div>
            </Link>

            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <NotificationsDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            <UserDropdown 
              isOpen={userMenuOpen} 
              onClose={() => setUserMenuOpen(false)} 
              toggleOpen={() => setUserMenuOpen(!userMenuOpen)} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
