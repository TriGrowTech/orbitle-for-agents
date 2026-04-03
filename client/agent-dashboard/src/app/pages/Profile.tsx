import { useState, useEffect } from 'react';
import { User, Shield, CreditCard, Clock, Activity, Settings, TrendingUp, Package, CheckCircle, FileText, UploadCloud, Loader2 } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from 'sonner';
import { useGetMeQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } from '../api/authApi';

export function Profile() {
  const [activeTab, setActiveTab] = useState('Agent Details');

  // Fetch agent details
  const { data, isLoading } = useGetMeQuery();
  const agent = data?.agent;

  // Mutations
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Local state for forms
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  // Hydrate form when data arrives
  useEffect(() => {
    if (agent) {
      const nameParts = (agent.name || '').split(' ');
      setProfileForm({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: agent.email || '',
        whatsapp: agent.whatsapp || '',
      });
    }
  }, [agent]);

  // Handlers
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fullName = `${profileForm.firstName.trim()} ${profileForm.lastName.trim()}`.trim();
      if (!fullName || !profileForm.email) {
         toast.error("Name and Email are required");
         return;
      }
      await updateProfile({
        name: fullName,
        email: profileForm.email,
        whatsapp: profileForm.whatsapp,
      }).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile.');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      if (!otp) return toast.error("Please enter the 6-digit OTP sent to your email.");
      if (!passwordForm.newPassword) return toast.error("Please enter your new password.");
      
      try {
        const res = await resetPassword({ email: agent.email, otp, password: passwordForm.newPassword }).unwrap();
        toast.success(res.message || "Password updated successfully with OTP!");
        setPasswordForm({ currentPassword: '', newPassword: '' });
        setOtp("");
        setOtpSent(false);
      } catch (err: any) {
        toast.error(err.data?.message || 'Failed to verify OTP or reset password.');
      }
      return; // Stop execution here for OTP flow
    }

    try {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
         toast.error("Please provide both current and new password");
         return;
      }
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      toast.success('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update password.');
    }
  };

  // Loading state handling
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Error missing data handling
  if (!agent) {
    return <div className="p-6 text-center text-red-500 font-medium">Failed to load profile data. Please refresh.</div>;
  }

  const getInitials = () => {
    if (!agent?.name) return 'O';
    return agent.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  };

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
                  {getInitials()}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{agent.name || 'Agent Name'}</h2>
                <p className="text-sm text-gray-500 mb-4">{agent.email}</p>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-6">
                  <Shield className="w-3.5 h-3.5" /> Verified Agent
                </span>

                <div className="w-full border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{agent.leadsCount !== undefined ? agent.leadsCount : 0}</span>
                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Leads</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{agent.packagesCount !== undefined ? agent.packagesCount : 0}</span>
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
                <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <Input 
                        type="text" 
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <Input 
                        type="text" 
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <Input 
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <Input 
                        type="tel" 
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({...profileForm, whatsapp: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
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
              <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Current Password</label>
                      <button 
                        type="button" 
                        disabled={isForgotLoading || otpSent}
                        onClick={async () => {
                          try {
                            const res = await forgotPassword({ email: agent.email }).unwrap();
                            toast.success(res.message || `OTP sent to ${agent.email}`);
                            setOtpSent(true);
                          } catch (err: any) {
                            toast.error(err.data?.message || 'Failed to send OTP email');
                          }
                        }}
                        className={`text-xs font-medium transition-colors ${otpSent ? 'text-green-600' : 'text-blue-600 hover:text-blue-800 disabled:opacity-50'}`}
                      >
                        {isForgotLoading ? 'Sending...' : otpSent ? 'OTP Sent!' : 'Forgot password?'}
                      </button>
                    </div>
                    {otpSent ? (
                      <div>
                        <Input 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP" 
                          maxLength={6}
                          className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all h-auto placeholder:text-green-300 font-semibold" 
                        />
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Check your inbox for the OTP</p>
                      </div>
                    ) : (
                      <Input 
                        type="password" 
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-auto" 
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <Input 
                      type="password" 
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-auto" 
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword || isResettingPassword}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${otpSent ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {(isUpdatingPassword || isResettingPassword) ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {otpSent ? (isResettingPassword ? 'Verifying...' : 'Verify OTP & Reset') : (isUpdatingPassword ? 'Updating...' : 'Update Password')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'Purchase History' && (
          (() => {
            const isTrial = agent.planType === 'trial' || !agent.planType;
            let planName = isTrial ? 'Free Trial Plan' : 'Active Plan';
            if (agent.planType === '6_months') planName = '6 Months Pro Plan';
            if (agent.planType === 'yearly') planName = 'Yearly Pro Plan';
            if (agent.planType === 'lifetime') planName = 'Lifetime Super Plan';
            
            let expiryDate = agent.planExpiry;
            if (isTrial) expiryDate = agent.trialEndsAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
            
            const formattedExpiry = new Date(expiryDate || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
            const totalSpent = agent.totalSpent || 0;
            
            const invoices: any[] = isTrial && totalSpent === 0 ? [] : [
               // If there were real invoices they'd be populated here. Showing empty for trial.
            ];

            return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
                  <Activity className="w-3.5 h-3.5" /> {isTrial ? 'Trial Active' : 'Active Subscription'}
                </span>
                <h2 className="text-3xl font-bold mb-1">{planName}</h2>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <Clock className="w-4 h-4" /> {isTrial ? 'Trial ends on:' : 'Next billing date:'} {formattedExpiry}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-md min-w-[180px]">
                <p className="text-blue-100 text-xs font-semibold tracking-wide uppercase mb-1">Total Spent</p>
                <div className="text-3xl font-bold flex items-end gap-1">
                  <span className="text-xl opacity-80">₹</span>{totalSpent.toLocaleString('en-IN')}
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
                    {invoices.length > 0 ? invoices.map((inv: any) => (
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
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                           No billing history yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            );
          })()
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
