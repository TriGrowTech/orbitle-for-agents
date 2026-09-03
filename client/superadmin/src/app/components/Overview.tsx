import { Bell, Clock, AlertCircle, CheckCircle } from "lucide-react";

export function Overview() {
  const todaysActions = [
    { id: 1, type: "trial_expiring", agent: "Rahul Travels", action: "Trial expires today", priority: "high", time: "Today" },
    { id: 2, type: "kyc_pending", agent: "Mumbai Tours Co", action: "KYC documents pending review", priority: "medium", time: "2 hours ago" },
    { id: 3, type: "payment_failed", agent: "Hyderabad Tours", action: "Payment failed - follow up needed", priority: "high", time: "3 hours ago" },
    { id: 4, type: "support_open", agent: "Chennai Trips", action: "Support ticket needs attention", priority: "medium", time: "5 hours ago" },
    { id: 5, type: "call_scheduled", agent: "Mumbai Tours Co", action: "Scheduled call at 2:00 PM", priority: "low", time: "In 4 hours" },
  ];

  const stats = [
    { label: "Total Agents", value: "1,247" },
    { label: "Active Trials", value: "342" },
    { label: "Paid Agents", value: "905" },
    { label: "Expired Today", value: "12" },
    { label: "Total Revenue", value: "₹24.5L" },
    { label: "Open Support Tickets", value: "18" },
  ];

  const recentSignups = [
    { name: "Rahul Travels", email: "rahul@example.com", date: "Apr 26, 2026" },
    { name: "Mumbai Tours Co", email: "contact@mumbai.com", date: "Apr 26, 2026" },
    { name: "Kerala Holidays", email: "info@kerala.com", date: "Apr 25, 2026" },
    { name: "Delhi Explorers", email: "delhi@example.com", date: "Apr 25, 2026" },
  ];

  const recentTickets = [
    { agent: "Rahul Travels", subject: "Payment gateway issue", status: "Open" },
    { agent: "Goa Adventures", subject: "Need invoice copy", status: "Open" },
    { agent: "Jaipur Tours", subject: "Feature request", status: "Resolved" },
    { agent: "Chennai Trips", subject: "Login problem", status: "Open" },
  ];

  const recentPayments = [
    { agent: "Mumbai Tours Co", amount: "₹2,999", plan: "Monthly", date: "Apr 26, 2026" },
    { agent: "Kerala Holidays", amount: "₹29,999", plan: "Annual", date: "Apr 26, 2026" },
    { agent: "Delhi Explorers", amount: "₹2,999", plan: "Monthly", date: "Apr 25, 2026" },
    { agent: "Bangalore Trips", amount: "₹2,999", plan: "Monthly", date: "Apr 25, 2026" },
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]";
    if (priority === "medium") return "bg-[#fef3c7] text-[#92400e] border-[#fde68a]";
    return "bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "trial_expiring": return <Clock size={16} />;
      case "kyc_pending": return <AlertCircle size={16} />;
      case "payment_failed": return <AlertCircle size={16} />;
      case "support_open": return <Bell size={16} />;
      case "call_scheduled": return <CheckCircle size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Overview Dashboard</h1>

      {/* Today's Actions */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#1e293b] flex items-center gap-2" style={{ fontSize: '16px', fontWeight: 600 }}>
            <Bell size={18} />
            Today's Actions
          </h2>
          <span className="px-2.5 py-1 bg-[#2563eb] text-white rounded-full" style={{ fontSize: '12px', fontWeight: 500 }}>
            {todaysActions.length} pending
          </span>
        </div>
        <div className="space-y-2">
          {todaysActions.map((action) => (
            <div
              key={action.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${getPriorityColor(action.priority)}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {getIcon(action.type)}
                <div className="flex-1">
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{action.agent}</div>
                  <div style={{ fontSize: '13px', opacity: 0.8 }}>{action.action}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '12px', opacity: 0.7 }}>{action.time}</span>
                <button
                  onClick={() => alert(`Taking action for ${action.agent}`)}
                  className="px-3 py-1.5 bg-white border border-current rounded hover:opacity-80 transition-opacity"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e2e8f0] rounded-lg p-4">
            <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>{stat.label}</div>
            <div className="text-[#1e293b]" style={{ fontSize: '24px', fontWeight: 600 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Activity Tables */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Signups */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]" style={{ fontSize: '16px', fontWeight: 600 }}>Recent Signups</h3>
          </div>
          <div>
            {recentSignups.map((signup, idx) => (
              <div key={idx} className={`p-4 ${idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}`}>
                <div className="text-[#1e293b] mb-0.5" style={{ fontSize: '14px', fontWeight: 500 }}>{signup.name}</div>
                <div className="text-[#64748b]" style={{ fontSize: '12px' }}>{signup.email}</div>
                <div className="text-[#64748b] mt-1" style={{ fontSize: '11px' }}>{signup.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Support Tickets */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]" style={{ fontSize: '16px', fontWeight: 600 }}>Recent Support Tickets</h3>
          </div>
          <div>
            {recentTickets.map((ticket, idx) => (
              <div key={idx} className={`p-4 ${idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}`}>
                <div className="text-[#1e293b] mb-0.5" style={{ fontSize: '14px', fontWeight: 500 }}>{ticket.agent}</div>
                <div className="text-[#64748b] mb-2" style={{ fontSize: '12px' }}>{ticket.subject}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full ${ticket.status === 'Open' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#d1fae5] text-[#065f46]'}`} style={{ fontSize: '11px' }}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]" style={{ fontSize: '16px', fontWeight: 600 }}>Recent Payments</h3>
          </div>
          <div>
            {recentPayments.map((payment, idx) => (
              <div key={idx} className={`p-4 ${idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}`}>
                <div className="text-[#1e293b] mb-0.5" style={{ fontSize: '14px', fontWeight: 500 }}>{payment.agent}</div>
                <div className="text-[#2563eb] mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>{payment.amount}</div>
                <div className="text-[#64748b]" style={{ fontSize: '11px' }}>{payment.plan} • {payment.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
