import React from 'react';
import { Link } from 'react-router';
import { Clock, SquareX } from 'lucide-react';

interface TrialBannerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  onDevEndTrial?: () => void;
}

const isDev = (import.meta as any).env.DEV;

export function TrialBanner({ days, hours, minutes, seconds, onDevEndTrial }: TrialBannerProps) {
  return (
    <div className="mb-4 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border border-orange-200 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              Your free trial ends in <span className="mr-1">{days} days, {hours} hours, {minutes} mins, {seconds} secs</span>
            </h3>
            <p className="text-sm text-gray-700">
              Connect your domain to go live publicly and continue after trial
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {isDev && onDevEndTrial && (
            <button
              onClick={onDevEndTrial}
              title="Dev: Immediately expire the trial"
              className="flex-1 sm:flex-none px-3 py-2 bg-gray-800 hover:bg-gray-900 border border-gray-700 text-gray-200 rounded-lg transition-colors font-medium text-xs text-center flex items-center gap-1.5 justify-center"
            >
              <SquareX className="w-3.5 h-3.5 text-red-400" />
              🛠 End Trial
            </button>
          )}
          <Link
            to="/branding"
            className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm text-center"
          >
            Connect Domain
          </Link>
          <Link
            to="/pricing"
            className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold text-sm text-center"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
