import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useGetMeQuery } from '../api/authApi';
import { setUser, clearAuth } from '../features/auth/authSlice';

interface ProtectedRouteProps {
  requireOnboarding?: boolean;
}

// Full screen loading indicator for session verification
function AuthLoadingScreen() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid #e2e8f0', borderTopColor: '#2563eb',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 500, margin: 0 }}>Verifying your session...</p>
      </div>
    </div>
  );
}

export function ProtectedRoute({ requireOnboarding = true }: ProtectedRouteProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch user data from server on load to verify cookie session
  const { data, isLoading, isError } = useGetMeQuery();

  // Sync server data with redux store when received
  useEffect(() => {
    if (data?.success && data.agent) {
      const freshData = {
        id: data.agent._id,
        name: data.agent.name,
        email: data.agent.email,
        businessName: data.agent.businessName,
        isOnboarded: data.agent.isOnboarded,
      };
      // Prevent unnecessary state updates if data is same
      if (JSON.stringify(user) !== JSON.stringify(freshData)) {
        dispatch(setUser(freshData));
      }
    }
  }, [data, dispatch, user]);

  // Handle unauthorized or expired sessions
  useEffect(() => {
    if (isError) {
      dispatch(clearAuth());
    }
  }, [isError, dispatch]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // Combine store user with server response for the route check
  const currentUser = user ?? (data?.success && data.agent
    ? {
      id: data.agent._id,
      name: data.agent.name,
      email: data.agent.email,
      businessName: data.agent.businessName,
      isOnboarded: data.agent.isOnboarded,
    }
    : null);

  // Redirect to login if user is not authenticated
  if (!currentUser) {
    const landingUrl = (import.meta as any).env.VITE_LANDING_PAGE_URL || 'http://localhost:3000';
    window.location.href = `${landingUrl}/login`;
    return null;
  }

  // Redirect to onboarding if not completed
  if (requireOnboarding && !currentUser.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect already onboarded users away from onboarding page
  if (!requireOnboarding && currentUser.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
