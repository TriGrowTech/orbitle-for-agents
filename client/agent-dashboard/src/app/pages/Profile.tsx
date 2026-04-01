import { useState } from 'react';
import { User, Shield, CreditCard, Clock, Activity, Settings, TrendingUp, Package, CheckCircle, FileText, UploadCloud } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function Profile() {
  const [activeTab, setActiveTab] = useState('Agent Details');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and view purchase history</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {['Agent Details', 'Purchase History', 'Verification & KYC'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'Agent Details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Profile Card */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                  RS
                </div>
                <h2 className="text-xl font-bold text-gray-900">Rahul Sharma</h2>
                <p className="text-sm text-gray-500 mb-4">rahul@orbitle.com</p>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-6">
                  <Shield className="w-3.5 h-3.5" /> Verified Agent
                </span>

                <div className="w-full border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">142</span>
                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Leads</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">12</span>
                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Packages</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Settings Form */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-xs text-gray-500">Update your account details</p>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <Input type="text" defaultValue="Rahul" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <Input type="text" defaultValue="Sharma" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <Input type="email" defaultValue="rahul@orbitle.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <Input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Security block moved outside the grid for full width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                  <p className="text-xs text-gray-500">Manage your password</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-auto" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <Input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-auto" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Purchase History' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
                  <Activity className="w-3.5 h-3.5" /> Active Subscription
                </span>
                <h2 className="text-3xl font-bold mb-1">Yearly Pro Plan</h2>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <Clock className="w-4 h-4" /> Next billing date: Jan 15, 2027
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-md min-w-[180px]">
                <p className="text-blue-100 text-xs font-semibold tracking-wide uppercase mb-1">Total Spent</p>
                <div className="text-3xl font-bold flex items-end gap-1">
                  <span className="text-xl opacity-80">₹</span>14,999
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                  <p className="text-xs text-gray-500 mt-1">View and download your invoices</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-4 h-4" /> Manage Billing
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">Invoice</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: '#INV-2026-001', date: 'Jan 15, 2026', amount: '₹14,999', plan: 'Yearly Pro Plan' },
                      { id: '#INV-2025-012', date: 'Jan 15, 2025', amount: '₹12,499', plan: 'Yearly Pro Plan' },
                      { id: '#INV-2024-045', date: 'Jan 15, 2024', amount: '₹9,999', plan: 'Yearly Starter' },
                    ].map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{inv.id}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{inv.plan}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{inv.amount}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 ring-1 ring-green-600/20">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Verification & KYC' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
                  <Shield className="w-3.5 h-3.5" /> Verified Global Agent
                </span>
                <h2 className="text-3xl font-bold mb-1">Your Account is Verified</h2>
                <div className="flex items-center gap-2 text-green-100 text-sm">
                  <CheckCircle className="w-4 h-4" /> This badge is displayed on your public travel website.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Status */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Verified Documents</h3>
                  <p className="text-xs text-gray-500 mt-1">Documents verified by the Orbitle Team</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { name: 'Business Registration / GST', verified: true, date: 'Oct 12, 2025' },
                    { name: 'Director PAN / Aadhaar', verified: true, date: 'Oct 12, 2025' },
                    { name: 'IATA / Travel Affiliation Certificate', verified: true, date: 'Oct 14, 2025' },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Verified on {doc.date}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KYC Update */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Update KYC</h3>
                  <p className="text-xs text-gray-500 mt-1">Upload new documents if they expire</p>
                </div>
                <div className="p-6">
                  <label className="flex flex-col items-center justify-center gap-3 w-full h-48 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-gray-900">Click to upload</span>
                      <span className="text-sm text-gray-500"> or drag and drop</span>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (max. 10MB)</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>

                  <div className="mt-6 space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Document Type</label>
                    <Select>
                      <SelectTrigger className="w-full h-[52px] bg-gray-50 border-gray-200 rounded-xl text-sm px-4">
                        <SelectValue placeholder="Select document type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gst">Business Registration / GST</SelectItem>
                        <SelectItem value="pan">Director PAN / Aadhaar</SelectItem>
                        <SelectItem value="affiliate">Other Affiliate Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <button className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                    Submit for Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
