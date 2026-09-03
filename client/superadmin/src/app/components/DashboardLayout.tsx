import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Bell,
  Headphones,
  Building2,
  FileCheck,
  DollarSign,
  Tag,
  CalendarDays,
  LogOut,
} from "lucide-react";

import logoImg from "../../imports/orbitle-logo.png";

import { useEffect } from "react";

export function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("sa_key");
    if (!key) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sa_key");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#f0f4fa]">
      {/* Sidebar */}
      <div className="w-60 bg-[#0d1b2e] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="Orbitle Logo"
              className="h-8 w-auto rounded-sm"
            />

            <span className="text-white text-xl font-semibold tracking-wide">
              Orbitle
            </span>
          </div>

          <div
            className="text-[#64748b]"
            style={{ fontSize: "13px", marginTop: "2px" }}
          >
            SuperAdmin Panel
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={18} />}
            label="Overview"
          />
           <NavItem
            to="/calendar"
            icon={<CalendarDays size={18} />}
            label="Calendar"
          />
          <NavItem to="/agents" icon={<Users size={18} />} label="Agents" />
          <NavItem to="/kyc" icon={<FileCheck size={18} />} label="KYC" />
          <NavItem
            to="/payments"
            icon={<CreditCard size={18} />}
            label="Payments"
          />
          <NavItem
            to="/pricing-plans"
            icon={<DollarSign size={18} />}
            label="Pricing Plans"
          />
          <NavItem to="/offers" icon={<Tag size={18} />} label="Offers" />
          <NavItem
            to="/notifications"
            icon={<Bell size={18} />}
            label="Notifications"
          />
          <NavItem
            to="/support"
            icon={<Headphones size={18} />}
            label="Support"
          />
         
          <NavItem
            to="/operators"
            icon={<Building2 size={18} />}
            label="Operators"
            badge="Coming Soon"
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-end px-6">
          <div className="flex items-center gap-4">
            <span className="text-[#1e293b]" style={{ fontSize: "14px" }}>
              Admin User
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#64748b] hover:text-[#1e293b] transition-colors"
              style={{ fontSize: "14px" }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  badge,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
          isActive
            ? "bg-[#2563eb] text-white"
            : "text-[#94a3b8] hover:text-white hover:bg-white/5"
        }`
      }
    >
      {icon}
      <span style={{ fontSize: "14px" }}>{label}</span>
      {badge && (
        <span
          className="ml-auto px-2 py-0.5 bg-[#64748b] text-white rounded"
          style={{ fontSize: "10px" }}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
}
