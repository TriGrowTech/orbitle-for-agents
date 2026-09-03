import { useState } from "react";
import { Tag, Calendar } from "lucide-react";

export function Offers() {
  const [activeTab, setActiveTab] = useState("create");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [specificAgent, setSpecificAgent] = useState("");
  const [description, setDescription] = useState("");

  const activeOffers = [
    {
      id: 1,
      title: "Summer Special 2026",
      code: "SUMMER2026",
      discount: "20% Off",
      validFrom: "Apr 1, 2026",
      validUntil: "Jun 30, 2026",
      targetAudience: "All Agents",
      usedBy: 45,
      status: "Active"
    },
    {
      id: 2,
      title: "Annual Plan Discount",
      code: "ANNUAL500",
      discount: "₹500 Off",
      validFrom: "Apr 15, 2026",
      validUntil: "May 15, 2026",
      targetAudience: "All Agents",
      usedBy: 12,
      status: "Active"
    },
    {
      id: 3,
      title: "Exclusive for Mumbai Tours",
      code: "MUMBAI15",
      discount: "15% Off",
      validFrom: "Apr 20, 2026",
      validUntil: "May 20, 2026",
      targetAudience: "Mumbai Tours Co",
      usedBy: 1,
      status: "Active"
    },
  ];

  const expiredOffers = [
    {
      id: 4,
      title: "New Year Offer",
      code: "NEWYEAR2026",
      discount: "25% Off",
      validFrom: "Jan 1, 2026",
      validUntil: "Jan 31, 2026",
      targetAudience: "All Agents",
      usedBy: 89,
      status: "Expired"
    },
  ];

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Offers & Discounts</h1>

      {/* Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg mb-4">
        <div className="border-b border-[#e2e8f0] px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "create"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Create Offer
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "active"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Active Offers
            </button>
            <button
              onClick={() => setActiveTab("expired")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === "expired"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Expired Offers
            </button>
          </div>
        </div>
      </div>

      {activeTab === "create" ? (
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-6">
          <div className="max-w-3xl">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Offer Title
                </label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  placeholder="e.g., Summer Special 2026"
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Offer Code
                </label>
                <input
                  type="text"
                  value={offerCode}
                  onChange={(e) => setOfferCode(e.target.value)}
                  placeholder="e.g., SUMMER2026"
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Discount Value
                </label>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "percentage" ? "e.g., 20" : "e.g., 500"}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Valid From
                </label>
                <input
                  type="date"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <div>
                <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Valid Until
                </label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Target Audience
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="audience"
                    value="all"
                    checked={targetAudience === "all"}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-[#1e293b]" style={{ fontSize: '14px' }}>All Agents</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="audience"
                    value="specific"
                    checked={targetAudience === "specific"}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-[#1e293b]" style={{ fontSize: '14px' }}>Specific Agent</span>
                </label>
              </div>
              {targetAudience === "specific" && (
                <input
                  type="text"
                  value={specificAgent}
                  onChange={(e) => setSpecificAgent(e.target.value)}
                  placeholder="Enter agent email or subdomain..."
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] mt-2"
                  style={{ fontSize: '14px' }}
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any additional details about this offer..."
                rows={4}
                className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none"
                style={{ fontSize: '14px' }}
              />
            </div>

            <button
              onClick={() => {
                alert(`Offer created: ${offerTitle}\nCode: ${offerCode}`);
                setOfferTitle("");
                setOfferCode("");
                setDiscountValue("");
                setValidFrom("");
                setValidUntil("");
                setDescription("");
              }}
              className="px-6 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center gap-2"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              <Tag size={16} />
              Create Offer
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TITLE</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>CODE</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DISCOUNT</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>VALID FROM</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>VALID UNTIL</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>TARGET</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>USED BY</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "active" ? activeOffers : expiredOffers).map((offer, idx) => (
                <tr key={offer.id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                  <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{offer.title}</td>
                  <td className="px-4 py-3">
                    <code className="px-2 py-1 bg-[#f0f4fa] text-[#2563eb] rounded" style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                      {offer.code}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-[#16a34a]" style={{ fontSize: '14px', fontWeight: 600 }}>{offer.discount}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{offer.validFrom}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{offer.validUntil}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{offer.targetAudience}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{offer.usedBy} agents</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Edit offer: ${offer.title}`)}
                        className="px-3 py-1.5 border border-[#e2e8f0] text-[#64748b] rounded hover:bg-[#f0f4fa] transition-colors"
                        style={{ fontSize: '13px' }}
                      >
                        Edit
                      </button>
                      {activeTab === "active" && (
                        <button
                          onClick={() => {
                            if (confirm(`Deactivate offer: ${offer.title}?`)) {
                              alert(`${offer.title} has been deactivated`);
                            }
                          }}
                          className="px-3 py-1.5 border border-[#dc2626] text-[#dc2626] rounded hover:bg-[#fef2f2] transition-colors"
                          style={{ fontSize: '13px' }}
                        >
                          Deactivate
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
  );
}
