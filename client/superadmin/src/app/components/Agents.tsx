import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, LogIn, Loader2 } from "lucide-react";
import { saFetch } from "../api";

export interface Agent {
  id: string;
  name: string;
  email: string;
  subdomain: string;
  status: "Trial" | "Paid" | "Expired";
  trialEnd: string;
  joined: string;
}

export function Agents() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    setLoading(true);
    setError("");
    try {
      const res = await saFetch("/api/sa/agents");
      if (res.success) {
        setAllAgents(res.data);
      } else {
        setError(res.message || "Failed to load agents");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching agents");
    } finally {
      setLoading(false);
    }
  }

  const filteredAgents = allAgents
    .filter(agent => {
      const matchesTab = activeTab === "all" || agent.status.toLowerCase() === activeTab;
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const agents = filteredAgents.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    if (status === "Trial") return "bg-[#dbeafe] text-[#1e40af]";
    if (status === "Paid") return "bg-[#d1fae5] text-[#065f46]";
    return "bg-[#fee2e2] text-[#991b1b]";
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleLoginAsAgent = (subdomain: string) => {
    alert(`Logging in as agent: ${subdomain}\n\nThis would typically open a new window with admin access to the agent's dashboard for error resolution.`);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Agents</h1>

      {/* Search and Filters */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" size={16} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {["all", "trial", "paid", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
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
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#64748b]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#2563eb]" />
                    <span>Loading agents...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-red-500 font-medium">
                  {error}
                </td>
              </tr>
            ) : agents.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#64748b]">
                  No agents found.
                </td>
              </tr>
            ) : (
              agents.map((agent, idx) => (
                <tr key={agent.id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                  <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.name}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{agent.email}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{agent.subdomain}.orbitle.com</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full ${getStatusColor(agent.status)}`} style={{ fontSize: '12px', fontWeight: 500 }}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{agent.trialEnd}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{agent.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/agents/${agent.id}`)}
                        className="px-3 py-1.5 bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] transition-colors"
                        style={{ fontSize: '13px' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleLoginAsAgent(agent.subdomain)}
                        className="px-3 py-1.5 border border-[#2563eb] text-[#2563eb] rounded hover:bg-[#eff6ff] transition-colors flex items-center gap-1"
                        style={{ fontSize: '13px' }}
                        title="Login as agent for error resolution"
                      >
                        <LogIn size={14} />
                        Login
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-[#64748b]" style={{ fontSize: '13px' }}>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAgents.length)} of {filteredAgents.length} agents
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-[#e2e8f0] rounded hover:bg-[#f0f4fa] text-[#64748b] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: '13px' }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded ${
                currentPage === page
                  ? "bg-[#2563eb] text-white"
                  : "border border-[#e2e8f0] hover:bg-[#f0f4fa] text-[#64748b]"
              }`}
              style={{ fontSize: '13px' }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-[#e2e8f0] rounded hover:bg-[#f0f4fa] text-[#64748b] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: '13px' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
