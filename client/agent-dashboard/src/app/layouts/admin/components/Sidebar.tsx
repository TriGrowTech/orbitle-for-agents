import React from 'react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  LayoutDashboard,
  Palette,
  Package,
  Users,
  Image,
  FileText,
  Star,
  TrendingUp,
  X,
  Settings,
  ChevronRight,
  CreditCard,
  FileCheck,
  User,
  BarChart2,
  Headphones,
} from 'lucide-react';
import orbitleLogo from "../../../../assets/orbitle-logo.png";

const globalNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads & Enquiries', href: '/leads', icon: Users },
  { name: 'Revenue Analytics', href: '/revenue', icon: BarChart2 },
  { name: 'Package Catalog', href: '/packages', icon: Package },
  { name: 'My Profile', href: '/profile', icon: User },
  { name: 'Support', href: '/support', icon: Headphones },
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext: 'website' | 'admin' | null;
  setActiveContext: (context: 'website' | 'admin' | null) => void;
  isAtBottom: boolean;
}

export function Sidebar({ isOpen, onClose, activeContext, setActiveContext, isAtBottom }: SidebarProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-56 
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 
        bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shrink-0 
        transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 border-b border-gray-200/50 h-[65px] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <img src={orbitleLogo} alt="Orbitle" className="w-7 h-7" />
              <div>
                <h2 className="text-sm font-bold text-gray-900 line-clamp-1 break-all">
                  {user?.name ? `${user.name.split(' ')[0]}'s Dashboard` : 'Dashboard'}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {!activeContext ? (
              <>
                <div className="space-y-1 pb-4">
                  {globalNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
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
                        <span>Admin & Operations</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
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
                        onClick={onClose}
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

          {/* Sidebar Footer */}
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
    </>
  );
}
