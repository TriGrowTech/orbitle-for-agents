import { useState } from "react";
import { Search, Calendar } from "lucide-react";

export function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const allPayments = [
    { agent: "Mumbai Tours Co", amount: "₹2,999", plan: "Monthly", status: "Success", gateway: "Razorpay", txnId: "pay_M7N8O9P0Q1R2", date: "Apr 26, 2026" },
    { agent: "Kerala Holidays", amount: "₹29,999", plan: "Annual", status: "Success", gateway: "Razorpay", txnId: "pay_S3T4U5V6W7X8", date: "Apr 26, 2026" },
    { agent: "Delhi Explorers", amount: "₹2,999", plan: "Monthly", status: "Success", gateway: "PayU", txnId: "pau_Y9Z0A1B2C3D4", date: "Apr 25, 2026" },
    { agent: "Bangalore Trips", amount: "₹2,999", plan: "Monthly", status: "Success", gateway: "Razorpay", txnId: "pay_E5F6G7H8I9J0", date: "Apr 25, 2026" },
    { agent: "Hyderabad Tours", amount: "₹2,999", plan: "Monthly", status: "Failed", gateway: "Razorpay", txnId: "pay_K1L2M3N4O5P6", date: "Apr 24, 2026" },
    { agent: "Pune Travels", amount: "₹29,999", plan: "Annual", status: "Success", gateway: "PayU", txnId: "pau_Q7R8S9T0U1V2", date: "Apr 24, 2026" },
    { agent: "Kolkata Trips", amount: "₹2,999", plan: "Monthly", status: "Pending", gateway: "Razorpay", txnId: "pay_W3X4Y5Z6A7B8", date: "Apr 23, 2026" },
  ];

  const filteredPayments = allPayments.filter(payment => {
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
    const matchesSearch =
      payment.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.txnId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = "₹" + filteredPayments
    .filter(p => p.status === "Success")
    .reduce((sum, p) => sum + parseInt(p.amount.replace(/[₹,]/g, '')), 0)
    .toLocaleString('en-IN');

  const getStatusColor = (status: string) => {
    if (status === "Success") return "bg-[#d1fae5] text-[#065f46]";
    if (status === "Pending") return "bg-[#fef3c7] text-[#92400e]";
    return "bg-[#fee2e2] text-[#991b1b]";
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Payments</h1>

      {/* Summary Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-4">
        <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Total Revenue (Selected Range)</div>
        <div className="text-[#2563eb]" style={{ fontSize: '32px', fontWeight: 600 }}>{totalRevenue}</div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={16} />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={16} />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={16} />
            <input
              type="text"
              placeholder="Search by agent or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {["all", "success", "pending", "failed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === filter
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
            <tr>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AGENT NAME</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AMOUNT</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>PLAN</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>GATEWAY</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TRANSACTION ID</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{payment.agent}</td>
                <td className="px-4 py-3 text-[#2563eb]" style={{ fontSize: '14px', fontWeight: 600 }}>{payment.amount}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.plan}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full ${getStatusColor(payment.status)}`} style={{ fontSize: '12px', fontWeight: 500 }}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.gateway}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontFamily: 'monospace' }}>{payment.txnId}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
