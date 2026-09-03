export function Operators() {
  const stats = [
    { label: "Total Operators", value: "0" },
    { label: "Active Trials", value: "0" },
    { label: "Paid Operators", value: "0" },
  ];

  const demoOperators = [
    { id: 1, name: "Demo Operator 1", email: "demo1@example.com", subdomain: "demo1", status: "Trial", trialEnd: "-", joined: "-" },
    { id: 2, name: "Demo Operator 2", email: "demo2@example.com", subdomain: "demo2", status: "Paid", trialEnd: "-", joined: "-" },
    { id: 3, name: "Demo Operator 3", email: "demo3@example.com", subdomain: "demo3", status: "Expired", trialEnd: "-", joined: "-" },
  ];

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Operators</h1>

      {/* Coming Soon Banner */}
      <div className="bg-[#2563eb] text-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Operators Module — Coming Soon</h2>
            <p className="mt-2 opacity-90" style={{ fontSize: '14px' }}>Expected Launch: June 2026</p>
          </div>
          <div className="bg-white/20 rounded-lg px-6 py-3">
            <div className="text-white/80" style={{ fontSize: '12px' }}>Launch Date</div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>June 2026</div>
          </div>
        </div>
      </div>

      {/* Disabled Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 opacity-40 pointer-events-none">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e2e8f0] rounded-lg p-4">
            <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>{stat.label}</div>
            <div className="text-[#1e293b]" style={{ fontSize: '24px', fontWeight: 600 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Disabled Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden opacity-40 pointer-events-none">
        <table className="w-full">
          <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
            <tr>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>NAME</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>EMAIL</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>SUBDOMAIN</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TRIAL END</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>JOINED</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {demoOperators.map((operator, idx) => (
              <tr key={operator.id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{operator.name}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{operator.email}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{operator.subdomain}.orbitle.com</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full ${
                    operator.status === "Trial" ? "bg-[#dbeafe] text-[#1e40af]" :
                    operator.status === "Paid" ? "bg-[#d1fae5] text-[#065f46]" :
                    "bg-[#fee2e2] text-[#991b1b]"
                  }`} style={{ fontSize: '12px', fontWeight: 500 }}>
                    {operator.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{operator.trialEnd}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{operator.joined}</td>
                <td className="px-4 py-3">
                  <button
                    disabled
                    className="px-3 py-1.5 bg-[#e2e8f0] text-[#94a3b8] rounded cursor-not-allowed"
                    style={{ fontSize: '13px' }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
