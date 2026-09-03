import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import { saFetch } from "../api";

interface AgentDetailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  agency: string;
  subdomain: string;
  joined: string;
  status: "Trial" | "Paid" | "Expired";
  trialEnd: string;
  planType: string;
  planExpiry: string;
}

export function AgentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showExtendTrialModal, setShowExtendTrialModal] = useState(false);
  const [showActivatePlanModal, setShowActivatePlanModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [agent, setAgent] = useState<AgentDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [extendDays, setExtendDays] = useState("7");
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (id) {
      loadAgentDetail();
    }
  }, [id]);

  async function loadAgentDetail() {
    setLoading(true);
    setError("");
    try {
      const res = await saFetch(`/api/sa/agents/${id}`);
      if (res.success) {
        setAgent(res.data);
      } else {
        setError(res.message || "Failed to load agent details");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while loading agent details");
    } finally {
      setLoading(false);
    }
  }

  const handleExtendTrial = async () => {
    if (!extendDays || isNaN(Number(extendDays))) return;
    setSubmitting(true);
    try {
      const res = await saFetch(`/api/sa/agents/${id}/extend-trial`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: parseInt(extendDays) })
      });
      if (res.success) {
        setShowExtendTrialModal(false);
        loadAgentDetail();
      } else {
        alert(res.message || "Failed to extend trial");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleActivatePlan = async () => {
    setSubmitting(true);
    try {
      const res = await saFetch(`/api/sa/agents/${id}/activate-plan`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan })
      });
      if (res.success) {
        setShowActivatePlanModal(false);
        loadAgentDetail();
      } else {
        alert(res.message || "Failed to activate plan");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async () => {
    setSubmitting(true);
    try {
      const res = await saFetch(`/api/sa/agents/${id}/deactivate`, {
        method: "PUT"
      });
      if (res.success) {
        setShowDeactivateModal(false);
        loadAgentDetail();
      } else {
        alert(res.message || "Failed to toggle agent status");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendNotification = async () => {
    if (!notificationMessage.trim()) return;
    setSubmitting(true);
    try {
      const res = await saFetch("/api/sa/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: id,
          type: "required_action",
          title: "Message from SuperAdmin",
          message: notificationMessage.trim()
        })
      });
      if (res.success) {
        setNotificationMessage("");
        setShowNotificationModal(false);
        alert("Notification sent successfully!");
      } else {
        alert(res.message || "Failed to send notification");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAgent = async () => {
    setSubmitting(true);
    try {
      const res = await saFetch(`/api/sa/agents/${id}`, {
        method: "DELETE"
      });
      if (res.success) {
        setShowDeleteModal(false);
        navigate("/agents");
      } else {
        alert(res.message || "Failed to delete agent");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="p-6 max-w-[1440px] mx-auto">
        <button
          onClick={() => navigate("/agents")}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#1e293b] mb-4"
          style={{ fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          Back to Agents
        </button>
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-6 max-w-md mx-auto text-center font-medium">
          {error || "Agent not found"}
        </div>
      </div>
    );
  }

  const payments = [
    { date: agent.joined, amount: agent.planType === "trial" ? "₹0" : "₹29,999", plan: agent.planType.toUpperCase(), status: "Active", gateway: "-", txnId: "-" },
  ];

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <button
        onClick={() => navigate("/agents")}
        className="flex items-center gap-2 text-[#64748b] hover:text-[#1e293b] mb-4"
        style={{ fontSize: '14px' }}
      >
        <ArrowLeft size={16} />
        Back to Agents
      </button>

      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Agent Details</h1>

      {/* Profile Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Profile Info */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-6">
          <h3 className="text-[#1e293b] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>Profile Information</h3>
          <div className="space-y-3">
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Name</div>
              <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.name}</div>
            </div>
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Email</div>
              <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.email}</div>
            </div>
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Phone</div>
              <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.phone}</div>
            </div>
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Agency Name</div>
              <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.agency}</div>
            </div>
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Subdomain</div>
              <div className="text-[#2563eb]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.subdomain}</div>
            </div>
            <div>
              <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Joined Date</div>
              <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.joined}</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-6">
          <h3 className="text-[#1e293b] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>Status</h3>
          <div className="space-y-3">
            <div>
              <div className="text-[#64748b] mb-2" style={{ fontSize: '12px' }}>Current Status</div>
              <span className={`inline-block px-3 py-1.5 rounded-full ${
                agent.status === "Trial" ? "bg-[#dbeafe] text-[#1e40af]" :
                agent.status === "Paid" ? "bg-[#d1fae5] text-[#065f46]" :
                "bg-[#fee2e2] text-[#991b1b]"
              }`} style={{ fontSize: '14px', fontWeight: 500 }}>
                {agent.status}
              </span>
            </div>
            {agent.planType === "trial" ? (
              <div>
                <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Trial End Date</div>
                <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.trialEnd}</div>
              </div>
            ) : (
              <div>
                <div className="text-[#64748b] mb-1" style={{ fontSize: '12px' }}>Plan Expiry Date</div>
                <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{agent.planExpiry}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 mb-6">
        <h3 className="text-[#1e293b] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowExtendTrialModal(true)}
            className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Extend Trial
          </button>
          <button
            onClick={() => setShowActivatePlanModal(true)}
            className="px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Activate Plan
          </button>
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="px-4 py-2 bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Toggle Active State
          </button>
          <button
            onClick={() => setShowNotificationModal(true)}
            className="px-4 py-2 border-2 border-[#2563eb] text-[#2563eb] rounded-lg hover:bg-[#eff6ff] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Send Notification
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 border-2 border-[#dc2626] text-[#dc2626] rounded-lg hover:bg-[#fef2f2] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Delete Agent
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg">
        <div className="p-4 border-b border-[#e2e8f0]">
          <h3 className="text-[#1e293b]" style={{ fontSize: '16px', fontWeight: 600 }}>Payment History</h3>
        </div>
        <table className="w-full">
          <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
            <tr>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DATE</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AMOUNT</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>PLAN</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>GATEWAY</th>
              <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TXN ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.date}</td>
                <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{payment.amount}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.plan}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#d1fae5] text-[#065f46]" style={{ fontSize: '12px', fontWeight: 500 }}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.gateway}</td>
                <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{payment.txnId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <Modal isOpen={showExtendTrialModal} onClose={() => setShowExtendTrialModal(false)} title="Extend Trial Period" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Extend trial by (days)
            </label>
            <input
              type="number"
              value={extendDays}
              onChange={(e) => setExtendDays(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExtendTrial}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-400 transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {submitting ? "Confirming..." : "Confirm"}
            </button>
            <button
              onClick={() => setShowExtendTrialModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showActivatePlanModal} onClose={() => setShowActivatePlanModal(false)} title="Activate Plan" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Select Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            >
              <option value="6_months">6 Months - ₹17,999</option>
              <option value="yearly">Yearly - ₹29,999</option>
              <option value="lifetime">Lifetime - ₹99,999</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleActivatePlan}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] disabled:bg-gray-400 transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {submitting ? "Activating..." : "Activate"}
            </button>
            <button
              onClick={() => setShowActivatePlanModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDeactivateModal} onClose={() => setShowDeactivateModal(false)} title="Deactivate Agent" size="sm">
        <div className="space-y-4">
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
            Are you sure you want to toggle {agent.name}'s active state? They will instantly lose or regain access to their dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDeactivate}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] disabled:bg-gray-400 transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {submitting ? "Updating..." : "Toggle State"}
            </button>
            <button
              onClick={() => setShowDeactivateModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showNotificationModal} onClose={() => setShowNotificationModal(false)} title="Send Notification" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Message
            </label>
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none"
              style={{ fontSize: '14px' }}
              disabled={submitting}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSendNotification}
              disabled={submitting || !notificationMessage.trim()}
              className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-400 transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {submitting ? "Sending..." : "Send"}
            </button>
            <button
              onClick={() => {
                setNotificationMessage("");
                setShowNotificationModal(false);
              }}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Agent" size="sm">
        <div className="space-y-4">
          <p className="text-[#dc2626]" style={{ fontSize: '14px', fontWeight: 500 }}>
            Warning: This action cannot be undone!
          </p>
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
            Are you sure you want to permanently delete {agent.name}? All their data will be lost.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteAgent}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] disabled:bg-gray-400 transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              {submitting ? "Deleting..." : "Delete Permanently"}
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
