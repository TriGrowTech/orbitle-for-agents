import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { CRMProvider } from '../context/CRMContext';
import { SettingsModal } from '../components/SettingsModal';
import { Footer } from '../components/Footer';
import { Sidebar } from './admin/components/Sidebar';
import { Topbar } from './admin/components/Topbar';
import { TrialBanner } from './admin/components/TrialBanner';
import { TrialExpiredScreen } from './admin/components/TrialExpiredScreen';
import { useGetMeQuery } from '../api/authApi';

const websiteItems = ['/branding', '/banners', '/content', '/testimonials'];
const adminItems = ['/seo', '/pricing', '/legal'];
// Pages that remain accessible even when trial has expired
const allowedWhenExpired = ['/pricing', '/support'];

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

  const { data } = useGetMeQuery();
  const agent = data?.agent;
  
  // Trial / expiry logic
  const isTrial = agent?.planType === 'trial' || !agent?.planType;
  const isPlanExpired = agent?.planExpiredAt ? new Date(agent.planExpiredAt) < new Date() : false;

  const [trialEndsAt, setTrialEndsAt] = useState<number>(() => {
    if (!agent) return Date.now() + 7 * 24 * 60 * 60 * 1000;
    return new Date(agent.trialEndsAt || Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();
  });

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!agent || (!isTrial && !isPlanExpired)) return;
    if (agent.trialEndsAt) setTrialEndsAt(new Date(agent.trialEndsAt).getTime());
  }, [agent]);

  useEffect(() => {
    if (!isTrial && !isPlanExpired) return;

    const updateTimer = () => {
      const now = Date.now();
      const difference = trialEndsAt - now;
      setTimeLeft(Math.max(0, difference));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [trialEndsAt, isTrial, isPlanExpired]);

  // Dev-mode reset: extend trial by 7 days from now
  const handleDevReset = () => {
    setTrialEndsAt(Date.now() + 7 * 24 * 60 * 60 * 1000);
  };

  // Dev-mode end trial: immediately expire
  const handleDevEndTrial = () => {
    setTrialEndsAt(Date.now() - 1000);
  };

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

  const isExpired = (isTrial || isPlanExpired) && timeLeft <= 0 && agent !== undefined;
  const isAllowedWhenExpired = allowedWhenExpired.some(p => location.pathname.startsWith(p));

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
              {isTrial && !isExpired && <TrialBanner days={days} hours={hours} minutes={minutes} seconds={seconds} onDevEndTrial={handleDevEndTrial} />}
              {isExpired && !isAllowedWhenExpired
                ? <TrialExpiredScreen onDevReset={handleDevReset} />
                : <Outlet />
              }
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