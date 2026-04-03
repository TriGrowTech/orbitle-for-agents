import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { OnboardingWizard } from '../components/OnboardingWizard';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // If onboarding is already marked as complete in localStorage
    if (localStorage.getItem('orbitle_onboarding_complete') === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleStartOnboarding = () => {
    setShowWelcome(false);
    setShowWizard(true);
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('orbitle_onboarding_complete', 'true');
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <WelcomeScreen isOpen={showWelcome} onStart={handleStartOnboarding} />
      <OnboardingWizard isOpen={showWizard} onComplete={handleCompleteOnboarding} />
    </>
  );
}
