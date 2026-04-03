import React from 'react';
import { Link } from 'react-router';
import { User, Crown, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { authApi, useLogoutMutation } from '../../../api/authApi';
import { clearAuth } from '../../../features/auth/authSlice';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  toggleOpen: () => void;
}

export function UserDropdown({ isOpen, onClose, toggleOpen }: UserDropdownProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="flex items-center gap-3 pl-3 ml-3 border-l border-gray-200 hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-white text-sm font-semibold">{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200/50 shadow-xl overflow-hidden z-50">
            {/* User Plan Information */}
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4" />
                <p className="text-sm font-semibold">Current Plan</p>
              </div>
              <p className="text-lg font-bold">Yearly Plan</p>
              <p className="text-xs opacity-90 mt-1">Valid until: Dec 31, 2026</p>
              <Link
                to="/pricing"
                onClick={onClose}
                className="inline-block mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>

            {/* Account Management Links */}
            <div className="p-2">
              <Link
                to="/profile"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
              <button
                onClick={async () => {
                  onClose();
                  try {
                    await logout().unwrap();
                  } catch (err) {
                    console.error('Logout request error:', err);
                  }
                  // Clear local authentication state
                  dispatch(clearAuth());
                  // Reset API cache to ensure fresh state on re-login
                  dispatch(authApi.util.resetApiState());
                  
                  const landingUrl = (import.meta as any).env.VITE_LANDING_PAGE_URL || 'http://localhost:3000';
                  window.location.href = `${landingUrl}/agents`;
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
