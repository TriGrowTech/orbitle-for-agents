import { useState } from "react";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Modal } from "./Modal";

export function PricingPlans() {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const [planName, setPlanName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planFeatures, setPlanFeatures] = useState("");

  const activePlans = [
   
    {
      id: 1,
      name: "Monthly",
      duration: "1 Month",
      price: "₹499",
      features: ["Unlimited bookings", "Priority support", "Custom branding", "Advanced analytics"],
      isActive: true,
      createdDate: "Jan 1, 2026"
    },
    {
      id: 2,
      name: "Half-Yearly",
      duration: "6 Months",
      price: "₹3,999",
      features: ["All Monthly features", "10% discount", "Free website setup"],
      isActive: true,
      createdDate: "Jan 1, 2026"
    },
    {
      id: 3,
      name: "Annual",
      duration: "12 Months",
      price: "₹9,999",
      features: ["All Quarterly features", "20% discount", "Dedicated account manager", "API access"],
      isActive: true,
      createdDate: "Jan 1, 2026"
    },
    {
      id: 4,
      name: "Lifetime",
      duration: "Lifetime",
      price: "₹14,999",
      features: ["All Quarterly features", "20% discount", "Dedicated account manager", "API access"],
      isActive: true,
      createdDate: "Jan 1, 2026"
    },
  ];

  const customRequests = [
    {
      id: 1,
      agent: "Mumbai Tours Co",
      email: "contact@mumbai.com",
      requestedPlan: "6 Months",
      requestedPrice: "₹15,999",
      features: "All standard features + Custom integrations",
      requestDate: "Apr 25, 2026",
      status: "Pending"
    },
    {
      id: 2,
      agent: "Kerala Holidays",
      email: "info@kerala.com",
      requestedPlan: "Enterprise - 12 Months",
      requestedPrice: "₹49,999",
      features: "White label solution + Multiple subdomains + Priority development",
      requestDate: "Apr 24, 2026",
      status: "Pending"
    },
    {
      id: 3,
      agent: "Delhi Explorers",
      email: "delhi@example.com",
      requestedPlan: "2 Months",
      requestedPrice: "₹5,499",
      features: "Standard monthly features for 2 months",
      requestDate: "Apr 20, 2026",
      status: "Approved"
    },
  ];

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#1e293b]" style={{ fontSize: '24px', fontWeight: 600 }}>Pricing Plans</h1>
        <button
          onClick={() => setShowCreatePlanModal(true)}
          className="px-4 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          style={{ fontSize: '14px', fontWeight: 500 }}
        >
          Create New Plan
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg mb-4">
        <div className="border-b border-[#e2e8f0] px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "active"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Active Plans
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "requests"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Custom Requests
              <span className="ml-2 px-2 py-0.5 bg-[#fef3c7] text-[#92400e] rounded-full" style={{ fontSize: '11px' }}>
                {customRequests.filter(r => r.status === "Pending").length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === "active" ? (
        <div className="grid grid-cols-4 gap-4">
          {activePlans.map((plan) => (
            <div key={plan.id} className="bg-white border border-[#e2e8f0] rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#1e293b] mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>{plan.name}</h3>
                  <div className="text-[#64748b]" style={{ fontSize: '12px' }}>{plan.duration}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Edit plan: ${plan.name}`)}
                    className="text-[#64748b] hover:text-[#2563eb]"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete plan: ${plan.name}?`)) {
                        alert(`${plan.name} plan deleted`);
                      }
                    }}
                    className="text-[#64748b] hover:text-[#dc2626]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[#2563eb]" style={{ fontSize: '32px', fontWeight: 600 }}>{plan.price}</div>
              </div>

              <div className="border-t border-[#e2e8f0] pt-4 mb-4">
                <div className="text-[#64748b] mb-2" style={{ fontSize: '12px', fontWeight: 500 }}>FEATURES</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#16a34a] mt-0.5 flex-shrink-0" />
                      <span className="text-[#1e293b]" style={{ fontSize: '13px' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#e2e8f0] pt-3">
                <div className="text-[#64748b]" style={{ fontSize: '11px' }}>Created: {plan.createdDate}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>AGENT</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>REQUESTED PLAN</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>PRICE</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>FEATURES</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DATE</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {customRequests.map((request, idx) => (
                <tr key={request.id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                  <td className="px-4 py-3">
                    <div className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{request.agent}</div>
                    <div className="text-[#64748b]" style={{ fontSize: '12px' }}>{request.email}</div>
                  </td>
                  <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '13px', fontWeight: 500 }}>{request.requestedPlan}</td>
                  <td className="px-4 py-3 text-[#2563eb]" style={{ fontSize: '14px', fontWeight: 600 }}>{request.requestedPrice}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', maxWidth: '200px' }}>{request.features}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{request.requestDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full ${
                      request.status === 'Pending' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#d1fae5] text-[#065f46]'
                    }`} style={{ fontSize: '12px', fontWeight: 500 }}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {request.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowApproveModal(true);
                          }}
                          className="p-1.5 bg-[#16a34a] text-white rounded hover:bg-[#15803d] transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRejectModal(true);
                          }}
                          className="p-1.5 bg-[#dc2626] text-white rounded hover:bg-[#b91c1c] transition-colors"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={showCreatePlanModal} onClose={() => setShowCreatePlanModal(false)} title="Create New Plan" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Plan Name
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g., Premium"
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
              <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Duration
              </label>
              <input
                type="text"
                value={planDuration}
                onChange={(e) => setPlanDuration(e.target.value)}
                placeholder="e.g., 6 Months"
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Price
            </label>
            <input
              type="text"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
              placeholder="e.g., ₹14,999"
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Features (one per line)
            </label>
            <textarea
              value={planFeatures}
              onChange={(e) => setPlanFeatures(e.target.value)}
              placeholder="All standard features&#10;Priority support&#10;Custom integrations"
              rows={5}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`Plan created: ${planName}`);
                setPlanName("");
                setPlanDuration("");
                setPlanPrice("");
                setPlanFeatures("");
                setShowCreatePlanModal(false);
              }}
              className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Create Plan
            </button>
            <button
              onClick={() => setShowCreatePlanModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showApproveModal} onClose={() => setShowApproveModal(false)} title="Approve Custom Plan" size="sm">
        <div className="space-y-4">
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
            Approve custom plan request from {selectedRequest?.agent}?
          </p>
          <div className="bg-[#f0f4fa] rounded-lg p-4">
            <div className="mb-2">
              <span className="text-[#64748b]" style={{ fontSize: '12px' }}>Plan:</span>
              <span className="text-[#1e293b] ml-2" style={{ fontSize: '14px', fontWeight: 500 }}>{selectedRequest?.requestedPlan}</span>
            </div>
            <div>
              <span className="text-[#64748b]" style={{ fontSize: '12px' }}>Price:</span>
              <span className="text-[#2563eb] ml-2" style={{ fontSize: '14px', fontWeight: 600 }}>{selectedRequest?.requestedPrice}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`Custom plan approved for ${selectedRequest?.agent}`);
                setShowApproveModal(false);
              }}
              className="flex-1 px-4 py-2.5 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Approve
            </button>
            <button
              onClick={() => setShowApproveModal(false)}
              className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject Custom Plan" size="sm">
        <div className="space-y-4">
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
            Reject custom plan request from {selectedRequest?.agent}?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`Custom plan rejected for ${selectedRequest?.agent}`);
                setShowRejectModal(false);
              }}
              className="flex-1 px-4 py-2.5 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Reject
            </button>
            <button
              onClick={() => setShowRejectModal(false)}
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
