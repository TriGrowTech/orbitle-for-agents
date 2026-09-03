import { useState } from "react";
import { FileText, Download, CheckCircle, XCircle, Eye } from "lucide-react";
import { Modal } from "./Modal";

export function KYC() {
  const [activeCategory, setActiveCategory] = useState("agents");
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const agentDocuments = [
    {
      id: 1,
      name: "Rahul Travels",
      email: "rahul@example.com",
      submittedDate: "Apr 20, 2026",
      status: "Pending",
      documents: {
        pan: { uploaded: true, url: "#", fileName: "pan_card.pdf" },
        aadhar: { uploaded: true, url: "#", fileName: "aadhar.pdf" },
        gst: { uploaded: true, url: "#", fileName: "gst_certificate.pdf" },
        business: { uploaded: true, url: "#", fileName: "business_proof.pdf" }
      }
    },
    {
      id: 2,
      name: "Mumbai Tours Co",
      email: "contact@mumbai.com",
      submittedDate: "Mar 15, 2026",
      status: "Approved",
      documents: {
        pan: { uploaded: true, url: "#", fileName: "pan_card.pdf" },
        aadhar: { uploaded: true, url: "#", fileName: "aadhar.pdf" },
        gst: { uploaded: true, url: "#", fileName: "gst_certificate.pdf" },
        business: { uploaded: true, url: "#", fileName: "business_proof.pdf" }
      }
    },
    {
      id: 3,
      name: "Kerala Holidays",
      email: "info@kerala.com",
      submittedDate: "Feb 10, 2026",
      status: "Approved",
      documents: {
        pan: { uploaded: true, url: "#", fileName: "pan_card.pdf" },
        aadhar: { uploaded: true, url: "#", fileName: "aadhar.pdf" },
        gst: { uploaded: false, url: "", fileName: "" },
        business: { uploaded: true, url: "#", fileName: "business_proof.pdf" }
      }
    },
    {
      id: 4,
      name: "Delhi Explorers",
      email: "delhi@example.com",
      submittedDate: "Apr 18, 2026",
      status: "Rejected",
      documents: {
        pan: { uploaded: true, url: "#", fileName: "pan_card.pdf" },
        aadhar: { uploaded: true, url: "#", fileName: "aadhar.pdf" },
        gst: { uploaded: false, url: "", fileName: "" },
        business: { uploaded: false, url: "", fileName: "" }
      }
    },
  ];

  const operatorDocuments = [
    {
      id: 1,
      name: "Demo Operator 1",
      email: "demo1@example.com",
      submittedDate: "-",
      status: "Pending",
      documents: {
        pan: { uploaded: false, url: "", fileName: "" },
        aadhar: { uploaded: false, url: "", fileName: "" },
        gst: { uploaded: false, url: "", fileName: "" },
        business: { uploaded: false, url: "", fileName: "" }
      }
    },
  ];

  const currentData = activeCategory === "agents" ? agentDocuments : operatorDocuments;
  const selectedItem = currentData.find(d => d.id === selectedDocument);

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "bg-[#fef3c7] text-[#92400e]";
    if (status === "Approved") return "bg-[#d1fae5] text-[#065f46]";
    return "bg-[#fee2e2] text-[#991b1b]";
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>KYC Documents</h1>

      {/* Category Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg mb-4">
        <div className="border-b border-[#e2e8f0] px-4">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setActiveCategory("agents");
                setSelectedDocument(null);
              }}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeCategory === "agents"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Agents
            </button>
            <button
              onClick={() => {
                setActiveCategory("operators");
                setSelectedDocument(null);
              }}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeCategory === "operators"
                  ? "border-[#2563eb] text-[#2563eb]"
                  : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Operators
            </button>
          </div>
        </div>
      </div>

      {!selectedDocument ? (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f0f4fa] border-b border-[#e2e8f0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>NAME</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>EMAIL</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>SUBMITTED DATE</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>DOCUMENTS</th>
                <th className="text-left px-4 py-3 text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, idx) => {
                const uploadedCount = Object.values(item.documents).filter(d => d.uploaded).length;
                const totalDocs = Object.values(item.documents).length;

                return (
                  <tr key={item.id} className={idx % 2 === 1 ? 'bg-[#f0f4fa]' : ''}>
                    <td className="px-4 py-3 text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</td>
                    <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{item.email}</td>
                    <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>{item.submittedDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full ${getStatusColor(item.status)}`} style={{ fontSize: '12px', fontWeight: 500 }}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: '13px' }}>
                      {uploadedCount}/{totalDocs} uploaded
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedDocument(item.id)}
                        className="px-3 py-1.5 bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] transition-colors flex items-center gap-1"
                        style={{ fontSize: '13px' }}
                      >
                        <Eye size={14} />
                        View Documents
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-lg">
          <div className="p-6 border-b border-[#e2e8f0]">
            <button
              onClick={() => setSelectedDocument(null)}
              className="text-[#2563eb] hover:text-[#1d4ed8] mb-4"
              style={{ fontSize: '14px' }}
            >
              ← Back to List
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#1e293b] mb-1" style={{ fontSize: '20px', fontWeight: 600 }}>{selectedItem?.name}</h2>
                <p className="text-[#64748b]" style={{ fontSize: '14px' }}>{selectedItem?.email}</p>
              </div>
              <span className={`inline-block px-3 py-1.5 rounded-full ${getStatusColor(selectedItem?.status || "")}`} style={{ fontSize: '13px', fontWeight: 500 }}>
                {selectedItem?.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-[#1e293b] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>Submitted Documents</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <DocumentCard title="PAN Card" document={selectedItem?.documents.pan} />
              <DocumentCard title="Aadhar Card" document={selectedItem?.documents.aadhar} />
              <DocumentCard title="GST Certificate" document={selectedItem?.documents.gst} />
              <DocumentCard title="Business Proof" document={selectedItem?.documents.business} />
            </div>

            {selectedItem?.status === "Pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="px-6 py-2.5 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-2"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  <CheckCircle size={16} />
                  Approve KYC
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-6 py-2.5 border-2 border-[#dc2626] text-[#dc2626] rounded-lg hover:bg-[#fef2f2] transition-colors flex items-center gap-2"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  <XCircle size={16} />
                  Reject KYC
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={showApproveModal} onClose={() => setShowApproveModal(false)} title="Approve KYC" size="sm">
        <div className="space-y-4">
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
            Are you sure you want to approve KYC documents for {selectedItem?.name}?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`KYC approved for ${selectedItem?.name}`);
                setShowApproveModal(false);
                setSelectedDocument(null);
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

      <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject KYC" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Rejection Reason
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide a reason for rejection..."
              rows={4}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb] resize-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`KYC rejected for ${selectedItem?.name}\nReason: ${rejectReason}`);
                setRejectReason("");
                setShowRejectModal(false);
                setSelectedDocument(null);
              }}
              className="flex-1 px-4 py-2.5 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Reject
            </button>
            <button
              onClick={() => {
                setRejectReason("");
                setShowRejectModal(false);
              }}
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

function DocumentCard({ title, document }: { title: string; document?: { uploaded: boolean; url: string; fileName: string } }) {
  const handleDownload = () => {
    alert(`Downloading ${document?.fileName}...`);
  };

  return (
    <div className="border border-[#e2e8f0] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#64748b]" />
          <span className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>{title}</span>
        </div>
        {document?.uploaded ? (
          <CheckCircle size={18} className="text-[#16a34a]" />
        ) : (
          <XCircle size={18} className="text-[#dc2626]" />
        )}
      </div>
      {document?.uploaded ? (
        <div className="space-y-2">
          <div className="text-[#64748b] text-xs">{document.fileName}</div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-[#2563eb] hover:text-[#1d4ed8]"
            style={{ fontSize: '13px' }}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      ) : (
        <div className="text-[#64748b]" style={{ fontSize: '13px' }}>Not uploaded</div>
      )}
    </div>
  );
}
