import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { OnboardingWizard } from '../components/OnboardingWizard';
import { useCompleteOnboardingMutation } from '../api/authApi';
import { updateOnboardingStatus } from '../features/auth/authSlice';
import { toast } from 'sonner';

export function OnboardingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [completeOnboarding, { isLoading: isSubmitting }] = useCompleteOnboardingMutation();

  const [showWelcome, setShowWelcome] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    if (!user) {
      const landingUrl = (import.meta as any).env.VITE_LANDING_PAGE_URL || 'http://localhost:3000';
      window.location.href = `${landingUrl}/login`;
      return;
    }

    if (user.isOnboarded) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, user]);

  const handleStartOnboarding = () => {
    setShowWelcome(false);
    setShowWizard(true);
  };

  const handleCompleteOnboarding = async (brandData: any) => {
    try {
      // Build form data to include file upload and text fields
      const formData = new FormData();
      if (brandData?.name) formData.append('businessName', brandData.name);
      if (brandData?.tagline) formData.append('tagline', brandData.tagline);
      if (brandData?.theme) formData.append('theme', brandData.theme);
      if (brandData?.whatsapp) formData.append('whatsapp', brandData.whatsapp);
      if (brandData?.subdomain) formData.append('subdomain', brandData.subdomain);
      
      if (brandData?.logoFile) {
        formData.append('logo', brandData.logoFile);
      }

      const res = await completeOnboarding(formData).unwrap();
      if (res.success) {
        dispatch(updateOnboardingStatus(true));
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      console.error('Failed to complete onboarding:', error);
      toast.error(error?.data?.message || 'Failed to complete setup. Please try again.');
    }
  };

  return (
    <>
      <WelcomeScreen isOpen={showWelcome} onStart={handleStartOnboarding} />
      <OnboardingWizard isOpen={showWizard} onComplete={handleCompleteOnboarding} isSubmitting={isSubmitting} />
    </>
  );
}
