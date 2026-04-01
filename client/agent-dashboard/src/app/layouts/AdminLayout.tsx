import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { CRMProvider } from '../context/CRMContext';
import { SettingsModal } from '../components/SettingsModal';
import { Footer } from '../components/Footer';
import { Sidebar } from './admin/components/Sidebar';
import { Topbar } from './admin/components/Topbar';
import { TrialBanner } from './admin/components/TrialBanner';

const websiteItems = ['/branding', '/banners', '/content', '/testimonials'];
const adminItems = ['/seo', '/pricing', '/legal'];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [activeContext, setActiveContext] = useState<'website' | 'admin' | null>(() => {
    const currentPath = location.pathname;
    if (websiteItems.some(path => path === currentPath)) return 'website';
    if (adminItems.some(path => path === currentPath)) return 'admin';
    return null;
  });

  useEffect(() => {
    const currentPath = location.pathname;
    if (websiteItems.some(path => path === currentPath)) {
      setActiveContext('website');
    } else if (adminItems.some(path => path === currentPath)) {
      setActiveContext('admin');
    } else {
      setActiveContext(null);
    }
  }, [location.pathname]);

  const [timeLeft, setTimeLeft] = useState(() => {
    // Initial: 6 days, 14 hours, 32 mins
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

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 60;
      setIsAtBottom(scrolledToBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CRMProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative">
        <div className="flex-1 flex w-full max-w-[100vw]">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            activeContext={activeContext}
            setActiveContext={setActiveContext}
            isAtBottom={isAtBottom}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

            <main className="p-3 sm:p-4 lg:p-5 flex-1">
              <TrialBanner days={days} hours={hours} minutes={minutes} seconds={seconds} />
              <Outlet />
            </main>
          </div>
        </div>

        <div className="w-full relative z-[60] bg-white border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <Footer />
        </div>

        <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </CRMProvider>
  );
}