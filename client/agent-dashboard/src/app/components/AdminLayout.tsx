import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Palette, 
  Package, 
  Users, 
  Image, 
  FileText, 
  Star, 
  TrendingUp,
  Menu,
  X,
  Bell,
  Settings,
  Crown,
  ChevronDown,
  HelpCircle,
  LogOut,
  CreditCard,
  FileCheck,
  Clock
} from 'lucide-react';
import { SettingsModal } from './SettingsModal';
import { Footer } from './Footer';
import orbitleLogo from "../../assets/orbitle-logo.png";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Branding & Settings', href: '/branding', icon: Palette },
  { name: 'Packages', href: '/packages', icon: Package },
  { name: 'Leads & Enquiries', href: '/leads', icon: Users },
  { name: 'Banners & Promotions', href: '/banners', icon: Image },
  { name: 'Content Sections', href: '/content', icon: FileText },
  { name: 'Testimonials', href: '/testimonials', icon: Star },
  { name: 'SEO & Analytics', href: '/seo', icon: TrendingUp },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'Legal Pages', href: '/legal', icon: FileCheck },
];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-56 bg-white/80 backdrop-blur-xl border-r border-gray-200/50
        transform transition-transform duration-300 ease-in-out shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo — same height as topbar so they form one seamless band */}
          <div className="flex items-center justify-between px-4 border-b border-gray-200/50 h-[65px] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <img src={orbitleLogo} alt="Orbitle" className="w-7 h-7" />
              <div>
                <h1 className="text-base font-bold text-gray-900">Orbitle</h1>
                <p className="text-[9px] text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-200 text-xs
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-700 hover:bg-gray-100/80'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-center gap-1.5">
              <p className="text-[9px] text-gray-600">Powered by</p>
              <img src={orbitleLogo} alt="Orbitle" className="w-3.5 h-3.5" />
              <span className="text-[9px] font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Orbitle</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-56 min-h-screen flex flex-col">
        {/* Top bar — h-[65px] matches sidebar logo height exactly */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm h-[65px]">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setSidebarOpen(true)}
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

                <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 pl-3 ml-3 border-l border-gray-200 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <span className="text-white text-sm font-semibold">A</span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@orbitle.com</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200/50 shadow-xl overflow-hidden z-50">
                        {/* Plan Info */}
                        <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-4 h-4" />
                            <p className="text-sm font-semibold">Current Plan</p>
                          </div>
                          <p className="text-lg font-bold">Yearly Plan</p>
                          <p className="text-xs opacity-90 mt-1">Valid until: Dec 31, 2026</p>
                          <Link
                            to="/pricing"
                            onClick={() => setUserMenuOpen(false)}
                            className="inline-block mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
                          >
                            Upgrade Plan
                          </Link>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <button
                            onClick={() => setUserMenuOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                          </button>
                          <button
                            onClick={() => {
                              localStorage.removeItem('orbitle_onboarding_complete');
                              window.location.reload();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Reset Onboarding (Test)</span>
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              // Add logout logic here
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
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-3 sm:p-4 lg:p-5 flex-1">
          {/* Trial Banner */}
          {localStorage.getItem('orbitle_onboarding_complete') === 'true' && (
            <div className="mb-4 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border border-orange-200 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Your free trial ends in 6 days
                    </h3>
                    <p className="text-sm text-gray-700">
                      Connect your domain to go live publicly and continue after trial
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
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
          )}
          
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}