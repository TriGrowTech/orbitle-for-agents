import { useState } from "react";
import { useNavigate } from "react-router";

import logoImg from "figma:asset/orbitle-logo.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email === "admin@orbitle.com" && password === "orbitle-superadmin-2026") {
      localStorage.setItem("sa_key", password);
      navigate("/");
    } else {
      setError("Invalid email or password. Use admin@orbitle.com / orbitle-superadmin-2026");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2e] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <img
              src={logoImg}
              alt="Orbitle Logo"
              className="h-10 w-auto"
            />
          </div>
          <p className="text-[#64748b]" style={{ fontSize: '14px' }}>SuperAdmin Panel</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              placeholder="admin@orbitle.com"
              required
              style={{ fontSize: '14px' }}
            />
          </div>

          <div>
            <label className="block text-[#1e293b] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#2563eb]"
              placeholder="Enter your password"
              required
              style={{ fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563eb] text-white py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
