import { Link } from 'react-router';
import { Lock, CreditCard, ShieldAlert, Trash2, RefreshCw } from 'lucide-react';

interface TrialExpiredScreenProps {
  onDevReset?: () => void;
}

const isDev = (import.meta as any).env.DEV;

export function TrialExpiredScreen({ onDevReset }: TrialExpiredScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh] p-6">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-red-100 shadow-2xl shadow-red-500/10 overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500" />

          <div className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-red-50">
              <Lock className="w-9 h-9 text-red-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Trial Has Ended</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
              Your free trial period has expired. Purchase a plan to regain full access to your dashboard and keep your travel website live.
            </p>

            {/* Warning chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-xs font-semibold mb-7">
              <Trash2 className="w-3.5 h-3.5" />
              All data will be permanently deleted in 7 days
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
              >
                <CreditCard className="w-4 h-4" />
                Purchase a Plan
              </Link>
              <Link
                to="/support"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                Contact Support
              </Link>
            </div>

            {/* Dev-only reset */}
            {isDev && onDevReset && (
              <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">🛠 Dev Tools</p>
                <button
                  onClick={onDevReset}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Trial (Dev Only)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Subtle brand footer */}
        <p className="text-center text-[11px] text-gray-400 mt-5">
          Powered by <span className="font-bold text-gray-500">Orbitle</span> · Your subdomain has been temporarily suspended
        </p>
      </div>
    </div>
  );
}
