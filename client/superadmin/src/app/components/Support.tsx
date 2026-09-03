import { useState, useEffect } from "react";
import { saFetch } from "../api";

interface Ticket {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
    subdomain: string;
    businessName?: string;
    whatsapp?: string;
  };
  type: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  attachments: string[];
  replies: {
    message: string;
    from: "agent" | "superadmin";
    createdAt: string;
    _id: string;
  }[];
  createdAt: string;
}

interface CallRequest {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
    subdomain: string;
    businessName?: string;
    whatsapp?: string;
  };
  reason: string;
  phone: string;
  preferredTime: string;
  status: "pending" | "scheduled" | "completed";
  createdAt: string;
}

export function Support() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [activeFilter, setActiveFilter] = useState("all");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load tickets / calls on mount & when filter/tab changes
  useEffect(() => {
    if (activeTab === "tickets") {
      loadTickets();
    } else {
      loadCallRequests();
    }
  }, [activeTab, activeFilter]);

  // Load ticket details when a ticket is selected
  useEffect(() => {
    if (selectedTicketId) {
      loadTicketDetail(selectedTicketId);
    } else {
      setSelectedTicket(null);
    }
  }, [selectedTicketId]);

  async function loadTickets() {
    setLoading(true);
    setError("");
    try {
      const statusParam = activeFilter === "all" ? "" : `?status=${activeFilter}`;
      const res = await saFetch(`/api/sa/support${statusParam}`);
      if (res.success) {
        setTickets(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load support tickets");
    } finally {
      setLoading(false);
    }
  }

  async function loadCallRequests() {
    setLoading(true);
    setError("");
    try {
      const res = await saFetch("/api/sa/support/calls");
      if (res.success) {
        setCallRequests(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load call requests");
    } finally {
      setLoading(false);
    }
  }

  async function loadTicketDetail(id: string) {
    setDetailLoading(true);
    setError("");
    try {
      const res = await saFetch(`/api/sa/support/${id}`);
      if (res.success) {
        setSelectedTicket(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load ticket details");
    } finally {
      setDetailLoading(false);
    }
  }

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketId) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await saFetch(`/api/sa/support/${selectedTicketId}/reply`, {
        method: "POST",
        body: JSON.stringify({ message: replyMessage.trim() }),
      });
      if (res.success) {
        setReplyMessage("");
        setSelectedTicket(res.data); // update detail view with new reply
        loadTickets(); // refresh list in background
      }
    } catch (err: any) {
      setError(err.message || "Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolveTicket = async () => {
    if (!selectedTicketId) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await saFetch(`/api/sa/support/${selectedTicketId}/resolve`, {
        method: "PUT",
      });
      if (res.success) {
        setSelectedTicket(res.data);
        loadTickets();
      }
    } catch (err: any) {
      setError(err.message || "Failed to resolve ticket");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCallStatus = async (id: string, newStatus: "scheduled" | "completed") => {
    setError("");
    try {
      const res = await saFetch(`/api/sa/support/calls/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.success) {
        loadCallRequests();
      }
    } catch (err: any) {
      setError(err.message || "Failed to update call status");
    }
  };

  const getTopicLabel = (type: string) => {
    if (type === "billing") return "💳 Billing & Payments";
    if (type === "technical") return "🔧 Technical Issue";
    if (type === "feature") return "✨ Feature Request";
    return "💬 General Enquiry";
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Support</h1>

      {/* Main Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg mb-4">
        <div className="border-b border-[#e2e8f0] px-4">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setActiveTab("tickets");
                setSelectedTicketId(null);
              }}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "tickets"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Support Tickets
            </button>
            <button
              onClick={() => {
                setActiveTab("calls");
                setSelectedTicketId(null);
              }}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "calls"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Requested Calls
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {activeTab === "calls" ? (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading call requests...</div>
          ) : callRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No call requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AGENT NAME</th>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>PHONE</th>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>REASON</th>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>PREFERRED TIME</th>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                    <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {callRequests.map((request, idx) => (
                    <tr key={request._id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                      <td className="px-4 py-3">
                        <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>
                          {request.agentId?.name || "Unknown Agent"}
                        </div>
                        <div className="text-[#64748b]" style={{ fontSize: '12px' }}>
                          {request.agentId?.email || ""}
                          {request.agentId?.businessName ? ` (${request.agentId.businessName})` : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{request.phone}</td>
                      <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{request.reason}</td>
                      <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{request.preferredTime}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full ${
                          request.status === 'pending' ? 'bg-[#fef3c7] text-[#92400e]' :
                          request.status === 'scheduled' ? 'bg-[#dbeafe] text-[#1e40af]' :
                          'bg-[#d1fae5] text-[#065f46]'
                        }`} style={{ fontSize: '12px', fontWeight: 500 }}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {request.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateCallStatus(request._id, "scheduled")}
                              className="px-3 py-1.5 bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] transition-colors"
                              style={{ fontSize: '13px' }}
                            >
                              Schedule
                            </button>
                          )}
                          {request.status === 'scheduled' && (
                            <button
                              onClick={() => handleUpdateCallStatus(request._id, "completed")}
                              className="px-3 py-1.5 bg-[#16a34a] text-white rounded hover:bg-[#15803d] transition-colors"
                              style={{ fontSize: '13px' }}
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : !selectedTicketId ? (
        <>
          {/* Filters */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-4">
            <div className="flex gap-2">
              {["all", "open", "in_progress", "resolved"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeFilter === filter
                      ? "bg-[#2563eb] text-white"
                      : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
                  }`}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {filter === "in_progress" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading tickets...</div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No tickets found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
                    <tr>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AGENT NAME</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TOPIC</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>SUBJECT</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DATE</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, idx) => (
                      <tr key={ticket._id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                        <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>
                          {ticket.agentId?.name || "Unknown Agent"}
                          {ticket.agentId?.businessName ? ` (${ticket.agentId.businessName})` : ""}
                        </td>
                        <td className="px-4 py-3 text-[#64748b] whitespace-nowrap" style={{ fontSize: '13px' }}>
                          {getTopicLabel(ticket.type)}
                        </td>
                        <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{ticket.subject}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full ${
                            ticket.status === 'open' ? 'bg-[#fef3c7] text-[#92400e]' :
                            ticket.status === 'in_progress' ? 'bg-[#dbeafe] text-[#1e40af]' :
                            'bg-[#d1fae5] text-[#065f46]'
                          }`} style={{ fontSize: '11px', fontWeight: 500 }}>
                            {ticket.status === 'in_progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#64748b] whitespace-nowrap" style={{ fontSize: '13px' }}>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedTicketId(ticket._id)}
                            className="px-3 py-1.5 bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] transition-colors"
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
            )}
          </div>
        </>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-lg">
          {/* Header */}
          <div className="p-6 border-b border-[#e2e8f0]">
            <button
              onClick={() => setSelectedTicketId(null)}
              className="text-[#2563eb] hover:text-[#1d4ed8] mb-4 flex items-center gap-1"
              style={{ fontSize: '14px' }}
            >
              ← Back to Tickets
            </button>
            
            {detailLoading ? (
              <div className="text-gray-500">Loading ticket details...</div>
            ) : !selectedTicket ? (
              <div className="text-red-500">Ticket not found or failed to load.</div>
            ) : (
              <>
                <h2 className="text-[#1e293b] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>{selectedTicket.subject}</h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[#64748b]" style={{ fontSize: '14px' }}>
                    Agent: <strong className="text-gray-900">{selectedTicket.agentId?.name}</strong> 
                    {selectedTicket.agentId?.businessName ? ` (${selectedTicket.agentId.businessName})` : ""}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[#64748b]" style={{ fontSize: '14px' }}>
                    Email: <a href={`mailto:${selectedTicket.agentId?.email}`} className="text-blue-600 hover:underline">{selectedTicket.agentId?.email}</a>
                  </span>
                  {selectedTicket.agentId?.whatsapp && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-[#64748b]" style={{ fontSize: '14px' }}>
                        WhatsApp: <a href={`https://wa.me/${selectedTicket.agentId.whatsapp}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">{selectedTicket.agentId.whatsapp}</a>
                      </span>
                    </>
                  )}
                  <span className="text-gray-300">|</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full ${
                    selectedTicket.status === 'open' ? 'bg-[#fef3c7] text-[#92400e]' :
                    selectedTicket.status === 'in_progress' ? 'bg-[#dbeafe] text-[#1e40af]' :
                    'bg-[#d1fae5] text-[#065f46]'
                  }`} style={{ fontSize: '11px', fontWeight: 500 }}>
                    {selectedTicket.status === 'in_progress' ? 'In Progress' : selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[#64748b]" style={{ fontSize: '13px' }}>
                    Opened: {new Date(selectedTicket.createdAt).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>

          {selectedTicket && (
            <>
              {/* Message & Replies Conversation Thread */}
              <div className="p-6 border-b border-[#e2e8f0] bg-gray-50/50 max-h-[450px] overflow-y-auto space-y-4">
                
                {/* Agent Original Message */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-xs shrink-0">
                    AG
                  </div>
                  <div className="bg-white border border-[#e2e8f0] rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">
                      {selectedTicket.agentId?.name || "Agent"} (Original Message)
                    </p>
                    <p className="text-[#1e293b]" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                      {selectedTicket.message}
                    </p>
                  </div>
                </div>

                {/* Replies */}
                {selectedTicket.replies && selectedTicket.replies.map((reply) => {
                  const isSA = reply.from === "superadmin";
                  return (
                    <div 
                      key={reply._id} 
                      className={`flex items-start gap-3 max-w-[85%] ${isSA ? "ml-auto flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSA ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {isSA ? "SA" : "AG"}
                      </div>
                      <div className={`p-4 shadow-sm border rounded-2xl ${
                        isSA 
                          ? "bg-blue-600 text-white border-blue-700 rounded-tr-none" 
                          : "bg-white text-[#1e293b] border-[#e2e8f0] rounded-tl-none"
                      }`}>
                        <p className={`text-[10px] mb-1 font-semibold ${isSA ? "text-blue-100" : "text-gray-500"}`}>
                          {isSA ? "SuperAdmin" : (selectedTicket.agentId?.name || "Agent")}
                        </p>
                        <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{reply.message}</p>
                        <p className={`text-[9px] mt-1 text-right ${isSA ? "text-blue-200" : "text-gray-400"}`}>
                          {new Date(reply.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Section */}
              <div className="p-6">
                <form onSubmit={handleSendReply}>
                  <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Type Reply
                  </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none mb-4"
                    style={{ fontSize: '14px' }}
                    required
                    disabled={submitting || selectedTicket.status === "resolved"}
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting || !replyMessage.trim() || selectedTicket.status === "resolved"}
                      className="px-6 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-400 transition-colors"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      {submitting ? "Sending..." : "Send Reply"}
                    </button>
                    {selectedTicket.status !== "resolved" && (
                      <button
                        type="button"
                        onClick={handleResolveTicket}
                        disabled={submitting}
                        className="px-6 py-2.5 border-2 border-[#64748b] text-[#64748b] rounded-lg hover:bg-gray-50 transition-colors"
                        style={{ fontSize: '14px', fontWeight: 500 }}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
