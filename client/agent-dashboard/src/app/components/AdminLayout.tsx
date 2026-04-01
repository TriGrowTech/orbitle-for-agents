import { useState, useEffect } from 'react';
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
  ChevronRight,
  HelpCircle,
  LogOut,
  CreditCard,
  FileCheck,
  Clock,
  Sparkles,
  Info,
  User,
  IndianRupee,
  BarChart2
} from 'lucide-react';
import { CRMProvider } from '../context/CRMContext';
import { SettingsModal } from './SettingsModal';
import { Footer } from './Footer';
import orbitleLogo from "../../assets/orbitle-logo.png";

const globalNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads & Enquiries', href: '/leads', icon: Users },
  { name: 'Revenue Analytics', href: '/revenue', icon: BarChart2 },
  { name: 'Package Catalog', href: '/packages', icon: Package },
  { name: 'My Profile', href: '/profile', icon: User },
];

const contextData: Record<string, { title: string, items: { name: string, href: string, icon: any }[] }> = {
  'website': {
    title: 'Website Management',
    items: [
      { name: 'Branding & Theme', href: '/branding', icon: Palette },
      { name: 'Banners & Promos', href: '/banners', icon: Image },
      { name: 'Content Setup', href: '/content', icon: FileText },
      { name: 'Testimonials', href: '/testimonials', icon: Star },
    ]
  },
  'admin': {
    title: 'Admin & Operations',
    items: [
      { name: 'SEO & Analytics', href: '/seo', icon: TrendingUp },
      { name: 'Billing Plan', href: '/pricing', icon: CreditCard },
      { name: 'Legal Pages', href: '/legal', icon: FileCheck },
    ]
  }
};

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [activeContext, setActiveContext] = useState<'website' | 'admin' | null>(() => {
    const currentPath = location.pathname;
    if (contextData['website'].items.some(i => i.href === currentPath)) return 'website';
    if (contextData['admin'].items.some(i => i.href === currentPath)) return 'admin';
    return null;
  });

  useEffect(() => {
    const currentPath = location.pathname;
    if (contextData['website'].items.some(i => i.href === currentPath)) {
      setActiveContext('website');
    } else if (contextData['admin'].items.some(i => i.href === currentPath)) {
      setActiveContext('admin');
    } else {
      setActiveContext(null);
    }
  }, [location.pathname]);

  const [timeLeft, setTimeLeft] = useState(() => {
    // 6 days, 14 hours, 32 mins
    return (6 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (32 * 60 * 1000);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Using a threshold of 60px (approx footer height)
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 60;
      setIsAtBottom(scrolledToBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CRMProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative">
      <div className="flex-1 flex w-full max-w-[100vw]">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-56 
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 
          bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shrink-0 
          transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
        `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo — same height as topbar so they form one seamless band */}
          <div className="flex items-center justify-between px-4 border-b border-gray-200/50 h-[65px] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <img src={orbitleLogo} alt="Orbitle" className="w-7 h-7" />
              <div>
                <h2 className="text-sm font-bold text-gray-900">Rahul's Dashboard</h2>
                
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
          <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-2">
            {!activeContext ? (
              // GLOBAL NAVIGATION VIEW
              <>
                <div className="space-y-1 pb-4">
                  {globalNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-semibold
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="px-3 mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Setup & Settings
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveContext('website')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 group"
                    >
                      <div className="flex items-center gap-3">
                        <Palette className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                        <span>Website Management</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => setActiveContext('admin')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 group"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span >Admin & Operations</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // ACTIVE CONTEXT VIEW
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <button
                  onClick={() => setActiveContext(null)}
                  className="w-full flex items-center gap-2 px-2 py-2 mb-4 text-xs font-semibold text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 flex-shrink-0" />
                  <span>Back to Main Menu</span>
                </button>

                <h3 className="px-3 mb-3 text-xs font-bold tracking-widest text-gray-900 uppercase">
                  {contextData[activeContext].title}
                </h3>

                <div className="space-y-1">
                  {contextData[activeContext].items.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-semibold
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className={`p-4 mt-auto border-t border-gray-100 bg-white/50 backdrop-blur-md transition-all duration-300 transform ${isAtBottom ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={orbitleLogo} alt="Orbitle" className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest text-black uppercase">Orbitle</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
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

                <div className="relative">
                  <button 
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
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
                  )}
                </div>

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
                          <Link
                            to="/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span>My Profile</span>
                          </Link>
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
                      Your free trial ends in <span className="mr-1">{days} days, {hours} hours, {minutes} mins, {seconds} secs</span>
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
      </div>
      </div>

      {/* Unified Full-Width Footer */}
      <div className="w-full relative z-[60] bg-white border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <Footer />
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
    </CRMProvider>
  );
}