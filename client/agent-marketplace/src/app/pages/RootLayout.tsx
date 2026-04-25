import { Outlet } from 'react-router';
import { ThemeProvider } from '../context/ThemeContext';
import { AgentProvider, useAgent } from '../context/AgentContext';
import AgentThemeSync from '../components/AgentThemeSync';

function RootContent() {
  const { isTenantMode, isLoading, subdomain } = useAgent();

  // Full page loading spinner while fetching agent data
  if (isTenantMode && isLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#f8fafc',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, border: '4px solid #e2e8f0',
            borderTopColor: '#7c3aed', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
          }} />
          <p style={{ color: '#64748b', fontSize: 15 }}>
            Loading <strong>{subdomain}</strong>'s marketplace...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Syncs agent's theme color into ThemeContext when in tenant mode */}
      <AgentThemeSync />
      {/* Always render the same beautiful marketplace template */}
      <Outlet />
    </>
  );
}

export default function RootLayout() {
  return (
    <AgentProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </AgentProvider>
  );
}
