import { useState, useEffect } from "react";
import { saFetch } from "../api";

interface Agent {
  _id: string;
  name: string;
  email: string;
  subdomain: string;
  businessName?: string;
}

interface NotificationHistoryItem {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
    subdomain: string;
  } | null;
  type: string;
  title: string;
  message: string;
  createdAt: string;
}

export function Notifications() {
  const [activeTab, setActiveTab] = useState("compose");
  const [notificationType, setNotificationType] = useState("offer");
  const [recipients, setRecipients] = useState("all");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [history, setHistory] = useState<NotificationHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch agents list for composer
  useEffect(() => {
    async function loadAgents() {
      try {
        const res = await saFetch("/api/sa/agents/list");
        if (res.success) {
          setAgents(res.data);
          if (res.data.length > 0) {
            setSelectedAgentId(res.data[0]._id);
          }
        }
      } catch (err: any) {
        console.error("Failed to load agents", err);
      }
    }
    loadAgents();
  }, []);

  // Fetch notification history when history tab is active
  useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);

  async function loadHistory() {
    setLoading(true);
    setError("");
    try {
      const res = await saFetch("/api/sa/notifications");
      if (res.success) {
        setHistory(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load notification history");
    } finally {
      setLoading(false);
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !message.trim()) {
      setError("Title and message are required.");
      return;
    }

    setSending(true);
    try {
      const body = {
        type: notificationType,
        title: title.trim(),
        message: message.trim(),
        agentId: recipients === "specific" ? selectedAgentId : null,
      };

      const res = await saFetch("/api/sa/notifications", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (res.success) {
        setSuccess("Notification sent successfully!");
        setTitle("");
        setMessage("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  const getTypeColor = (type: string) => {
    if (type === "offer") return "bg-[#dbeafe] text-[#1e40af]";
    if (type === "trial_ending") return "bg-[#fef3c7] text-[#92400e]";
    if (type === "new_lead") return "bg-[#d1fae5] text-[#065f46]";
    if (type === "support_resolution") return "bg-[#e0f2fe] text-[#0369a1]";
    return "bg-[#e0e7ff] text-[#3730a3]"; // required_action
  };

  const getTypeName = (type: string) => {
    if (type === "offer") return "Offer";
    if (type === "trial_ending") return "Trial Ending";
    if (type === "new_lead") return "New Lead";
    if (type === "support_resolution") return "Support resolution";
    return "Required Action";
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Notifications</h1>

      {/* Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg">
        <div className="border-b border-[#e2e8f0] px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("compose")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "compose"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Compose
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              History
            </button>
          </div>
        </div>

        {activeTab === "compose" ? (
          <div className="p-6">
            <form onSubmit={handleSend} className="max-w-2xl space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Notification Type
                </label>
                <select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                >
                  <option value="offer">Offer (Manual Promo)</option>
                  <option value="required_action">Required Action (Account warning / task)</option>
                  <option value="trial_ending">Trial Ending Warning</option>
                  <option value="support_resolution">Support Ticket Update</option>
                  <option value="new_lead">New Lead (System simulation)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Recipients
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="recipients"
                      value="all"
                      checked={recipients === "all"}
                      onChange={(e) => setRecipients(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-[#1e293b]" style={{ fontSize: '14px' }}>All Agents (Broadcast)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="recipients"
                      value="specific"
                      checked={recipients === "specific"}
                      onChange={(e) => setRecipients(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-[#1e293b]" style={{ fontSize: '14px' }}>Specific Agent</span>
                  </label>
                </div>
                
                {recipients === "specific" && (
                  <div className="mt-3">
                    <label className="block text-[#64748b] mb-1.5" style={{ fontSize: '12px', fontWeight: 500 }}>
                      Select Target Agent
                    </label>
                    {agents.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No active agents available</p>
                    ) : (
                      <select
                        value={selectedAgentId}
                        onChange={(e) => setSelectedAgentId(e.target.value)}
                        className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                        style={{ fontSize: '14px' }}
                      >
                        {agents.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name} ({agent.businessName || agent.subdomain})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title..."
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                  required
                />
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter notification message..."
                  rows={6}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none"
                  style={{ fontSize: '14px' }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-400 transition-colors"
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                {sending ? "Sending..." : "Send Notification"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading history...</div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No notifications sent yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
                    <tr>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TYPE</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TITLE</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>RECIPIENTS</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>MESSAGE</th>
                      <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr key={item._id} className="border-b border-[#e2e8f0] hover:bg-gray-50/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full ${getTypeColor(item.type)}`} style={{ fontSize: '11px', fontWeight: 500 }}>
                            {getTypeName(item.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#1e293b] font-medium" style={{ fontSize: '14px' }}>
                          {item.title}
                        </td>
                        <td className="px-4 py-3 text-[#64748b] whitespace-nowrap" style={{ fontSize: '13px' }}>
                          {item.agentId ? `${item.agentId.name} (${item.agentId.subdomain})` : "All Agents (Broadcast)"}
                        </td>
                        <td className="px-4 py-3 text-[#64748b] max-w-xs truncate" style={{ fontSize: '13px' }} title={item.message}>
                          {item.message}
                        </td>
                        <td className="px-4 py-3 text-[#64748b] whitespace-nowrap" style={{ fontSize: '13px' }}>
                          {new Date(item.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
